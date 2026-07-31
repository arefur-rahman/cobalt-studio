import OutlineAccordion from "@/components/global/OutlineAccordion";
import CourseSectionHeader from "./CourseSectionHeader";
import { motion } from "motion/react";

const CourseContent = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-16"
        >
            <CourseSectionHeader
                badgeText="course content"
                sectionTitle="৬টি মডিউল,"
                sectionSubtitle="২৬টি লাইভ ক্লাস"
                sectionDescription="শুরু থেকে প্রফেশনাল লেভেল পর্যন্ত — সম্পূর্ণ জার্নি।"
            />
            <div className="mx-auto mt-12 w-full max-w-7xl px-6 md:mt-16 md:px-8">
                <OutlineAccordion />
            </div>
        </motion.section>
    );
};

export default CourseContent;
