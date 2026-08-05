"use client";

import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/TopNavBar";
import { Button } from "@/components/ui/button";
import getStartDateStr from "@/lib/getClosestMondayStr";
import { IconSparkles } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Bonus from "./components/Bonus";
import CountdownTimer from "./components/CountdownTimer";
import CourseContent from "./components/CourseContent";
import CourseSectionHeader from "./components/CourseSectionHeader";
import Faq from "./components/Faq";
import MeetYourMentor from "./components/MeetYourMentor";
import NightOwlOffer from "./components/NightOwlOffer";
import OurSolution from "./components/OurSolution";

const Page = () => {
    const locale = useLocale();
    const t = useTranslations("Batch1");
    const endDate = getStartDateStr(locale);
    return (
        <>
            <TopNavBar />
            <div>
                <div className="pt-24 md:pt-28">
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center gap-10 pb-14 md:gap-8 md:pb-20"
                    >
                        <CourseSectionHeader
                            badgeText={t("badge", { date: endDate })}
                            sectionTitle={t("title")}
                            sectionSubtitle={t("subtitle", { date: endDate })}
                            singleLineHeader={false}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: "easeOut",
                            }}
                        >
                            <CountdownTimer />
                        </motion.div>
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
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.4,
                                ease: "easeOut",
                            }}
                        >
                            <Button className="hover-bounce-btn mt-3 cursor-pointer rounded-full px-6 py-3 text-lg">
                                <IconSparkles stroke={1.5} />
                                {t("enrollNow")}
                            </Button>
                        </motion.div>
                    </motion.section>
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

export default Page;
