"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import MentorDetails from "@/components/global/MentorDetails";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { useTranslations } from "next-intl";

const LearnFromSource = () => {
    const t = useTranslations("Home.learnFromSource");
    return (
        <SectionSeparator className="bg-accent relative">
            <GradientTopBorder />
            <SectionHeader
                title={t("title")}
                titlePrimary={t("titlePrimary")}
                subtitle={t("subtitle")}
            />
            <MentorDetails />
        </SectionSeparator>
    );
};

export default LearnFromSource;
