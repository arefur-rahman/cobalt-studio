import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import OutlineAccordion from "./components/OutlineAccordion";

const CourseBluePrint = () => {
    return (
        <SectionSeparator className="bg-background">
            <SectionHeader
                subtitle="the blueprint"
                title="choose your mission"
            />
            <OutlineAccordion />
        </SectionSeparator>
    );
};

export default CourseBluePrint;
