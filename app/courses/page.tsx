import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import CourseContent from "./components/CourseContent";

const page = () => {
    return (
        <NavBarWithPageHeader
            sectionTag="STRUCTURED LEARNING PATHS"
            mainHeading="Explore Our"
            subHeading="Courses"
        >
            <CourseContent />
        </NavBarWithPageHeader>
    );
};

export default page;
