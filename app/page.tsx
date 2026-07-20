"use client";

// import CursorMashroom from "@/components/global/CursorMashroom";
import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/TopNavBar";
import AreYouTheRightFit from "./home/AreYouTheRightFit";
import Batch1 from "./home/Batch1";
import CourseBluePrint from "./home/CourseBluePrint";
import CurriculumTopics from "./home/CurriculumTopics";
import Hero from "./home/Hero";
import JoinTheLab from "./home/JoinTheStudio";
import LearnFromSource from "./home/LearnFromSource";
import TeachingApproach from "./home/TeachingApproach";

export default function Home() {
    return (
        <div>
            <TopNavBar />
            <Hero />
            <Batch1 />
            <CourseBluePrint />
            <TeachingApproach />
            <CurriculumTopics />
            <LearnFromSource />
            <JoinTheLab />
            <AreYouTheRightFit />
            <Footer />
            {/* <CursorMashroom /> */}
        </div>
    );
}
