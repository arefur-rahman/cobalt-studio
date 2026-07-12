import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import OutlineAccordion from "./OutlineAccordion";

const CourseBluePrint = () => {
    return (
        <SectionSeparator className="bg-background relative">
            <GradientTopBorder />
            <SectionHeader
                subtitle="the blueprint"
                title="choose your"
                titlePrimary="mission"
            />
            <OutlineAccordion />
        </SectionSeparator>
    );
};

export default CourseBluePrint;
