import getCourseBluePrint from "@/app/server/getCourseBluePrint";
import GradientTopBorder from "@/components/global/GradientTopBorder";
import OutlineAccordion from "@/components/global/OutlineAccordion";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { getTranslations } from "next-intl/server";

const CourseBluePrint = async () => {
    const translation = await getTranslations("Home.bluePrint");
    const outlines = await getCourseBluePrint();

    return (
        <SectionSeparator className="bg-background relative">
            <GradientTopBorder />
            <SectionHeader
                subtitle={translation("subTitle")}
                title={translation("title")}
                titlePrimary={translation("titlePrimary")}
            />
            <OutlineAccordion outlines={outlines} />
        </SectionSeparator>
    );
};

export default CourseBluePrint;
