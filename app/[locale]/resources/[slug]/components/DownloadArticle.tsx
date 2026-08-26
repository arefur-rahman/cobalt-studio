"use client";

import { IconFileTypePdf, IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import { Article } from "../../articles";
import { formatDate } from "../../components/utils";

interface DownloadArticleProps {
    article?: Article;
    title?: string;
}

const DownloadArticle = ({ article, title }: DownloadArticleProps) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadPdf = async () => {
        if (typeof window === "undefined" || isGenerating) return;

        const targetEl = document.querySelector(
            ".markdown-content",
        ) as HTMLElement;
        if (!targetEl) return;

        setIsGenerating(true);

        try {
            const html2canvasPro = (await import("html2canvas-pro")).default;
            const { jsPDF } = await import("jspdf");

            const articleTitle = article?.title || title || "Article";
            const formattedSlug = articleTitle
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            const filename = `${formattedSlug || "article"}.pdf`;

            // Dedicated container for PDF export
            const pdfContainer = document.createElement("div");
            pdfContainer.className = "pdf-export-container";
            pdfContainer.style.position = "absolute";
            pdfContainer.style.left = "-9999px";
            pdfContainer.style.top = "0";
            pdfContainer.style.width = "680px";
            pdfContainer.style.backgroundColor = "#ffffff";
            pdfContainer.style.color = "#18181b";
            pdfContainer.style.fontFamily = "sans-serif";
            pdfContainer.style.padding = "24px";
            pdfContainer.style.boxSizing = "border-box";

            // 1. Build Title & Metadata Header
            const headerDiv = document.createElement("div");
            headerDiv.className = "pdf-block";
            headerDiv.style.borderBottom = "2px solid #e4e4e7";
            headerDiv.style.paddingBottom = "16px";
            headerDiv.style.marginBottom = "24px";

            const metaDiv = document.createElement("div");
            metaDiv.style.display = "flex";
            metaDiv.style.alignItems = "center";
            metaDiv.style.gap = "10px";
            metaDiv.style.marginBottom = "12px";
            metaDiv.style.fontSize = "12px";
            metaDiv.style.color = "#71717a";

            if (article?.category) {
                const badge = document.createElement("span");
                badge.style.backgroundColor = "#f4f4f5";
                badge.style.color = "#09090b";
                badge.style.border = "1px solid #e4e4e7";
                badge.style.padding = "3px 10px";
                badge.style.borderRadius = "6px";
                badge.style.fontWeight = "700";
                badge.style.textTransform = "uppercase";
                badge.style.fontSize = "10px";
                badge.textContent = article.category;
                metaDiv.appendChild(badge);
            }

            if (article?.readTime) {
                const readTimeSpan = document.createElement("span");
                readTimeSpan.textContent = `• ${article.readTime} min read`;
                metaDiv.appendChild(readTimeSpan);
            }

            if (article?.publishDate) {
                const dateSpan = document.createElement("span");
                dateSpan.textContent = `• ${formatDate(article.publishDate)}`;
                metaDiv.appendChild(dateSpan);
            }

            headerDiv.appendChild(metaDiv);

            const titleEl = document.createElement("h1");
            titleEl.style.fontSize = "26px";
            titleEl.style.fontWeight = "800";
            titleEl.style.color = "#09090b";
            titleEl.style.lineHeight = "1.3";
            titleEl.style.margin = "0 0 10px 0";
            titleEl.textContent = articleTitle;
            headerDiv.appendChild(titleEl);

            if (article?.excerpt) {
                const excerptEl = document.createElement("p");
                excerptEl.style.fontSize = "14px";
                excerptEl.style.color = "#52525b";
                excerptEl.style.lineHeight = "1.5";
                excerptEl.style.margin = "0";
                excerptEl.textContent = article.excerpt;
                headerDiv.appendChild(excerptEl);
            }

            pdfContainer.appendChild(headerDiv);

            // 2. Clone markdown content and mark top-level blocks
            const contentClone = targetEl.cloneNode(true) as HTMLElement;
            contentClone
                .querySelectorAll(".copy-code-btn, .mobile-toc-trigger")
                .forEach((el) => el.remove());

            Array.from(contentClone.children).forEach((child) => {
                child.classList.add("pdf-block");
            });

            // Clean light-theme CSS overrides
            const style = document.createElement("style");
            style.textContent = `
                .pdf-export-container, .pdf-export-container * {
                    color: #18181b !important;
                    background-color: transparent !important;
                    border-color: #e4e4e7 !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                }
                .pdf-export-container {
                    background-color: #ffffff !important;
                }
                .pdf-export-container h1, .pdf-export-container h2, .pdf-export-container h3 {
                    color: #09090b !important;
                    font-weight: 700 !important;
                    margin-top: 20px !important;
                    margin-bottom: 10px !important;
                }
                .pdf-export-container p, .pdf-export-container li {
                    color: #27272a !important;
                    line-height: 1.65 !important;
                    margin-bottom: 12px !important;
                }
                .pdf-export-container code {
                    background-color: #f4f4f5 !important;
                    color: #0284c7 !important;
                    padding: 2px 5px !important;
                    border-radius: 4px !important;
                    font-family: monospace !important;
                }
                .pdf-export-container .code-block-wrapper {
                    background-color: #f8fafc !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 12px !important;
                    margin: 16px 0 !important;
                }
                .pdf-export-container .code-header {
                    background-color: #f1f5f9 !important;
                    border-bottom: 1px solid #e2e8f0 !important;
                    color: #475569 !important;
                    padding: 8px 16px !important;
                }
                .pdf-export-container pre code {
                    background-color: transparent !important;
                    color: #0f172a !important;
                    padding: 0 !important;
                }
                .pdf-export-container a {
                    color: #0284c7 !important;
                    text-decoration: underline !important;
                }
                .pdf-export-container blockquote {
                    background-color: #f0f9ff !important;
                    border-left: 4px solid #0284c7 !important;
                    color: #0369a1 !important;
                    padding: 10px 16px !important;
                    border-radius: 0 8px 8px 0 !important;
                    margin: 16px 0 !important;
                }
            `;
            pdfContainer.appendChild(style);
            pdfContainer.appendChild(contentClone);

            document.body.appendChild(pdfContainer);

            // 3. Render canvas using html2canvas-pro (supports lab(), oklch(), Tailwind 4)
            const scale = 2;
            const canvas = await html2canvasPro(pdfContainer, {
                scale: scale,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            // 4. Calculate page breaks based on element positions to prevent text cutoff
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
            const margin = 15; // 15mm margins on all sides
            const contentWidth = pdfWidth - margin * 2; // 180mm
            const contentHeight = pdfHeight - margin * 2; // 267mm

            const pxToMm = contentWidth / canvas.width;
            const maxPageHeightCanvasPx = contentHeight / pxToMm;

            const blockEls = Array.from(
                pdfContainer.querySelectorAll(".pdf-block"),
            ) as HTMLElement[];
            const containerTop = pdfContainer.getBoundingClientRect().top;

            const pageBreakYCanvasPx: number[] = [0];
            let currentPageStartPx = 0;

            blockEls.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const elTopPx = (rect.top - containerTop) * scale;
                const elBottomPx = (rect.bottom - containerTop) * scale;

                if (elBottomPx - currentPageStartPx > maxPageHeightCanvasPx) {
                    if (elTopPx > currentPageStartPx) {
                        pageBreakYCanvasPx.push(elTopPx);
                        currentPageStartPx = elTopPx;
                    }
                }
            });

            pageBreakYCanvasPx.push(canvas.height);

            document.body.removeChild(pdfContainer);

            // 5. Slice canvas at clean element boundaries and add pages to jsPDF
            for (let i = 0; i < pageBreakYCanvasPx.length - 1; i++) {
                const sliceStartY = pageBreakYCanvasPx[i];
                const sliceEndY = pageBreakYCanvasPx[i + 1];
                const sliceHeight = sliceEndY - sliceStartY;

                if (sliceHeight <= 0) continue;

                const pageCanvas = document.createElement("canvas");
                pageCanvas.width = canvas.width;
                pageCanvas.height = sliceHeight;
                const ctx = pageCanvas.getContext("2d");

                if (ctx) {
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
                    ctx.drawImage(
                        canvas,
                        0,
                        sliceStartY,
                        canvas.width,
                        sliceHeight,
                        0,
                        0,
                        canvas.width,
                        sliceHeight,
                    );
                }

                const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
                const renderHeightMm = sliceHeight * pxToMm;

                if (i > 0) {
                    pdf.addPage();
                }

                pdf.addImage(
                    pageImgData,
                    "JPEG",
                    margin,
                    margin,
                    contentWidth,
                    renderHeightMm,
                );
            }

            pdf.save(filename);
        } catch (err) {
            console.error("Failed to download PDF:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="flex items-center gap-3 w-full px-4 py-2 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer disabled:opacity-50"
        >
            {isGenerating ? (
                <>
                    <IconLoader2 className="h-4 w-4 text-red-500 animate-spin" />
                    <span>Downloading PDF...</span>
                </>
            ) : (
                <>
                    <IconFileTypePdf className="h-4 w-4 text-red-500" />
                    <span>Download PDF</span>
                </>
            )}
        </button>
    );
};

export default DownloadArticle;
