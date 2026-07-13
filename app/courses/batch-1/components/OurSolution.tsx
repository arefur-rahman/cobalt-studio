"use client";

import CourseSectionHeader from "./CourseSectionHeader";
import WhyUsGrid from "./WhyUsGrid";

const OurSolution = () => {
    return (
        <section className="bg-muted py-16 md:py-24">
            <CourseSectionHeader
                badgeText="OUR SOLUTION"
                sectionTitle="এই কোর্সটি কেন"
                sectionSubtitle="আলাদা?"
                sectionDescription="শুধু সফটওয়্যার টুলস শেখানো নয়, আমরা আপনাকে একজন প্রফেশনাল ভিডিও এডিটর হিসেবে মার্কেটপ্লেসের জন্য তৈরি করি।"
            />
            <WhyUsGrid />
        </section>
    );
};

export default OurSolution;
