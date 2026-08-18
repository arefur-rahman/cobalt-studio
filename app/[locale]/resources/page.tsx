import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import { getTranslations } from "next-intl/server";
import { getAllArticles, getCategories } from "./articles";
import ResourcesClient from "./ResourcesClient";

export const revalidate = 60; // ISR revalidation every 60 seconds

export async function generateMetadata() {
    return {
        title: "Resources & Articles | Cobalt Studio",
        description:
            "Explore our collection of articles, development guides, and tech insights crafted to level up your engineering skills.",
    };
}

export default async function ResourcesPage() {
    const t = await getTranslations("Resources");

    const [articles, categories] = await Promise.all([
        getAllArticles(),
        getCategories(),
    ]);

    return (
        <NavBarWithPageHeader
            sectionTag={t("sectionTag")}
            mainHeading={t("mainHeading")}
            subHeading={t("subHeading")}
        >
            <ResourcesClient articles={articles} categories={categories} />
        </NavBarWithPageHeader>
    );
}
