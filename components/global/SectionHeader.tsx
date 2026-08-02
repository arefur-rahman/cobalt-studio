import { H2, H3, Span, isBengali } from "./Texts";

const SectionHeader = ({
    subtitle,
    title,
    titlePrimary,
}: {
    subtitle?: string;
    title: string;
    titlePrimary?: string;
}) => {
    const fullText = `${subtitle || ""} ${title || ""} ${titlePrimary || ""}`;
    const hasBn = isBengali(fullText);

    return (
        <div className="max-w-2xl mb-12">
            {subtitle && (
                <H3
                    className={`text-xs font-bold text-primary leading-tight opacity-90 ${
                        hasBn
                            ? "tracking-normal text-xs sm:text-sm font-semibold mb-2"
                            : "tracking-[0.35rem] uppercase text-xs opacity-80 mb-3"
                    }`}
                >
                    {subtitle}
                </H3>
            )}
            {title && (
                <H2
                    className={`text-[clamp(32px,5vw,52px)] font-semibold text-foreground dark:text-white ${
                        hasBn
                            ? "leading-tight tracking-normal"
                            : "capitalize leading-tight tracking-tight"
                    }`}
                >
                    {title}{" "}
                    {titlePrimary && (
                        <Span className="text-primary">{titlePrimary}</Span>
                    )}
                </H2>
            )}
        </div>
    );
};

export default SectionHeader;
