"use client";

import { motion } from "motion/react";
import CourseSectionHeader from "./CourseSectionHeader";
import WhyUsGrid from "./WhyUsGrid";
import { useTranslations } from "next-intl";

const OurSolution = () => {
    const t = useTranslations("Batch1");
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-muted py-16 md:py-24"
        >
            <CourseSectionHeader
                badgeText={t("ourSolution")}
                sectionTitle={t("whyThisCourse")}
                sectionSubtitle={t("different")}
                sectionDescription={t("valueProposition")}
            />
            <WhyUsGrid />
        </motion.section>
    );
};

export default OurSolution;
