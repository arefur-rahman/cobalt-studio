"use client";

import { motion } from "motion/react";
import CourseSectionHeader from "./CourseSectionHeader";
import WhyUsGrid from "./WhyUsGrid";

const OurSolution = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-muted py-16 md:py-24"
        >
            <CourseSectionHeader
                badgeText="OUR SOLUTION"
                sectionTitle="এই কোর্সটি কেন"
                sectionSubtitle="আলাদা?"
                sectionDescription="শুধু সফটওয়্যার টুলস শেখানো নয়, আমরা আপনাকে একজন প্রফেশনাল ভিডিও এডিটর হিসেবে মার্কেটপ্লেসের জন্য তৈরি করি।"
            />
            <WhyUsGrid />
        </motion.section>
    );
};

export default OurSolution;
