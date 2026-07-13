import OutlineAccordion from "@/components/global/OutlineAccordion";
import CourseSectionHeader from "./CourseSectionHeader";

const CourseContent = () => {
    return (
        <section className="py-16">
            <CourseSectionHeader
                badgeText="course content"
                sectionTitle="৬টি মডিউল,"
                sectionSubtitle="২৬টি লাইভ ক্লাস"
                sectionDescription="শুরু থেকে প্রফেশনাল লেভেল পর্যন্ত — সম্পূর্ণ জার্নি।"
            />
            <div className="mx-auto mt-12 w-full max-w-7xl px-6 md:mt-16 md:px-8">
                <OutlineAccordion />
            </div>
        </section>
    );
};

export default CourseContent;
