import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/Header";
import CourseContent from "./components/CourseContent";
import CoursesHeader from "./components/CoursesHeader";

const page = () => {
    return (
        <>
            <TopNavBar />
            <div>
                <section className="py-16">
                    {/* header */}
                    <CoursesHeader />
                    {/* courses content */}
                    <CourseContent />
                </section>
                <Footer />
            </div>
        </>
    );
};

export default page;
