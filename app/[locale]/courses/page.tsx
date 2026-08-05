import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import CourseContent from "./components/CourseContent";
import { useTranslations } from "next-intl";

const Page = () => {
    const t = useTranslations("Courses");
    return (
        <NavBarWithPageHeader
            sectionTag={t("subtitle")}
            mainHeading={t("title")}
            subHeading={t("titlePrimary")}
        >
            <CourseContent />
        </NavBarWithPageHeader>
    );
};

export default Page;
