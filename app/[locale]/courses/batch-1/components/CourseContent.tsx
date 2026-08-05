"use client";

import OutlineAccordion from "@/components/global/OutlineAccordion";
import CourseSectionHeader from "./CourseSectionHeader";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const CourseContent = () => {
    const t = useTranslations("Batch1");
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-16"
        >
            <CourseSectionHeader
                badgeText={t("courseContent")}
                sectionTitle={t("title1")}
                sectionSubtitle={t("titlePrimary1")}
                sectionDescription={t("description1")}
            />
            <div className="mx-auto mt-12 w-full max-w-7xl px-6 md:mt-16 md:px-8">
                <OutlineAccordion />
            </div>
        </motion.section>
    );
};

export default CourseContent;
