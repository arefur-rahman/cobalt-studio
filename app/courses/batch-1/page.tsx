import CountdownTimer from "@/app/courses/batch-1/components/CountdownTimer";
import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/Header";
import { Button } from "@/components/ui/button";
import getStartDateStr from "@/lib/getClosestMondayStr";
import { IconSparkles } from "@tabler/icons-react";
import Bonus from "./components/Bonus";
import CourseContent from "./components/CourseContent";
import CourseSectionHeader from "./components/CourseSectionHeader";
import MeetYourMentor from "./components/MeetYourMentor";
import NightOwlOffer from "./components/NightOwlOffer";
import OurSolution from "./components/OurSolution";
import Faq from "./components/Faq";

const page = () => {
    const endDate = getStartDateStr();
    return (
        <>
            <TopNavBar />
            <div>
                <div className="pt-14 md:pt-28">
                    <section className="flex flex-col items-center gap-10 md:gap-8 pb-14 md:pb-20">
                        <CourseSectionHeader
                            badgeText={`${endDate} পর্যন্ত`}
                            sectionTitle="নাইট আউল অফার চলছে"
                            sectionSubtitle={`${endDate} পর্যন্ত`}
                            singleLineHeader={false}
                        />
                        <CountdownTimer />
                        <style>{`
                            .hover-bounce-btn {
                                transform: scale(1);
                                transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
                            }
                            .hover-bounce-btn:hover {
                                transform: scale(1.05);
                                transition: transform 0.4s cubic-bezier(0.6, -1.2, 0.4, 1.8);
                            }
                        `}</style>
                        <Button className="hover-bounce-btn rounded-full text-lg px-6 py-3 mt-3 cursor-pointer">
                            <IconSparkles stroke={1.5} />
                            এখনই এনরোল করুন
                        </Button>
                    </section>
                    <OurSolution />
                    <CourseContent />
                    <MeetYourMentor />
                    <Bonus />
                    <NightOwlOffer />
                    <Faq />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default page;
