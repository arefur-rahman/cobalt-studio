import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Batch1 from "./home/Batch1";
import CourseBluePrint from "./home/CourseBluePrint";
import CurriculumTopics from "./home/CurriculumTopics";
import Hero from "./home/Hero";
import LearnFromSource from "./home/LearnFromSource";
import TeachingApproach from "./home/TeachingApproach";

export default function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Batch1 />
            <CourseBluePrint />
            <TeachingApproach />
            <CurriculumTopics />
            <LearnFromSource />
            {/* <CursorMashroom /> */}
            <Footer />
        </div>
    );
}
