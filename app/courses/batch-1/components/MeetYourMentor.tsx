import MentorDetails from "@/components/global/MentorDetails";
import CourseSectionHeader from "./CourseSectionHeader";
import { motion } from "motion/react";

const MeetYourMentor = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-muted py-24"
        >
            <CourseSectionHeader
                badgeText="Meet Your Mentor"
                sectionTitle="Meet Your"
                sectionSubtitle="mentor"
                sectionDescription="এই কোর্সের মেন্টর হলেন বাংলাদেশের শীর্ষস্থানীয় ইনফোটেইনমেন্ট চ্যানেল Voice of Dhaka-র ফাউন্ডার ও প্রধান ভিডিও এডিটর। তার কাছ থেকে শেখার সুযোগ পেয়ে আপনি নিজেকে ভাগ্যবান মনে করবেন।"
            />
            <div className="pt-20 px-30">
                <MentorDetails />
            </div>
        </motion.section>
    );
};

export default MeetYourMentor;
