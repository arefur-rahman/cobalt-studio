import MentorDetails from "@/components/global/MentorDetails";
import CourseSectionHeader from "./CourseSectionHeader";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const MeetYourMentor = () => {
    const t = useTranslations("Batch1");
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-muted py-24"
        >
            <CourseSectionHeader
                badgeText={t("meetMentor")}
                sectionTitle={t("title2")}
                sectionSubtitle={t("titlePrimary2")}
                sectionDescription={t("description2")}
            />
            <div className="pt-10 px-7 md:pt-20 md:px-30">
                <MentorDetails />
            </div>
        </motion.section>
    );
};

export default MeetYourMentor;
