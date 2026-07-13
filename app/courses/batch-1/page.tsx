import CountdownTimer from "@/app/courses/batch-1/components/CountdownTimer";
import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/Header";
import { Button } from "@/components/ui/button";
import getStartDateStr from "@/lib/getClosestMondayStr";
import { IconSparkles } from "@tabler/icons-react";
import CourseSectionHeader from "./components/CourseSectionHeader";
import OurSolution from "./components/OurSolution";

const page = () => {
    const endDate = getStartDateStr();
    return (
        <>
            <TopNavBar />
            <div>
                <section className="py-14 md:py-28">
                    <div className="flex flex-col items-center gap-10 md:gap-8 pb-14 md:pb-20">
                        <CourseSectionHeader
                            badgeText={`${endDate} পর্যন্ত`}
                            sectionTitle="নাইট আউল অফার চলছে"
                            sectionSubtitle={`${endDate} পর্যন্ত`}
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
                    </div>
                    <OurSolution />
                </section>
                <Footer />
            </div>
        </>
    );
};

export default page;
