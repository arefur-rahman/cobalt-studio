import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/Header";
import AreYouTheRightFit from "./home/AreYouTheRightFit";
import Batch1 from "./home/Batch1";
import CourseBluePrint from "./home/CourseBluePrint";
import CurriculumTopics from "./home/CurriculumTopics";
import Hero from "./home/Hero";
import JoinTheLab from "./home/JoinTheStudio";
import LearnFromSource from "./home/LearnFromSource";
import TeachingApproach from "./home/TeachingApproach";
import ScrollToTop from "@/components/global/ScrollToTop";

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
            <ScrollToTop />
            {/* <CursorMashroom /> */}
        </div>
    );
}
