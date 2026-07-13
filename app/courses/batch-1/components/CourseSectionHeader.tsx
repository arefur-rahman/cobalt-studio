import PillBadge from "@/components/global/PillBadge";
import { H2, P, Span } from "@/components/global/Texts";

const CourseSectionHeader = ({
    badgeText,
    sectionTitle,
    sectionSubtitle,
    sectionDescription,
}: {
    badgeText: string;
    sectionTitle: string;
    sectionSubtitle: string;
    sectionDescription?: string;
}) => {
    return (
        <div className="flex flex-col items-center gap-4 md:gap-6">
            <PillBadge>{badgeText}</PillBadge>
            <H2 className="text-center font-bold text-[clamp(30px,5vw,48px)] max-w-[560px] flex flex-col items-center gap-2">
                <Span>{sectionTitle}</Span>
                <Span className="text-primary">{sectionSubtitle}</Span>
            </H2>
            <P>{sectionDescription}</P>
        </div>
    );
};

export default CourseSectionHeader;
