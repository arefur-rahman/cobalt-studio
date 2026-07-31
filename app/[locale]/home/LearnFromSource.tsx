"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import MentorDetails from "@/components/global/MentorDetails";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";

const LearnFromSource = () => {
    return (
        <SectionSeparator className="bg-accent relative">
            <GradientTopBorder />
            <SectionHeader
                title="learn from the"
                titlePrimary="source"
                subtitle="arefur rahman"
            />
            <MentorDetails />
        </SectionSeparator>
    );
};

export default LearnFromSource;
