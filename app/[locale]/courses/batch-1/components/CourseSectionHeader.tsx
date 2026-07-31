import PillBadge from "@/components/global/PillBadge";
import { H2, P, Span } from "@/components/global/Texts";

const CourseSectionHeader = ({
    badgeText,
    sectionTitle,
    sectionSubtitle,
    sectionDescription,
    singleLineHeader = true,
}: {
    badgeText: string;
    sectionTitle: string;
    sectionSubtitle: string;
    sectionDescription?: string;
    singleLineHeader?: boolean;
}) => {
    return (
        <div className="flex flex-col items-center gap-3 px-6">
            <PillBadge>{badgeText}</PillBadge>
            {singleLineHeader ? (
                /* flex বাদ দিয়ে text-center রাখা হয়েছে এবং স্পেসিং এর জন্য mr-3.5 ব্যবহার করা হয়েছে */
                <H2 className="text-center font-bold text-[clamp(30px,5vw,48px)]">
                    <Span className="mr-3.5">{sectionTitle}</Span>
                    <Span className="text-primary">{sectionSubtitle}</Span>
                </H2>
            ) : (
                <div className="flex flex-col items-center">
                    <H2 className="text-center font-bold text-[clamp(30px,5vw,48px)] flex flex-col items-center gap-2">
                        <Span>{sectionTitle}</Span>
                        <Span className="text-primary">{sectionSubtitle}</Span>
                    </H2>
                </div>
            )}
            <P className="-mt-2">{sectionDescription}</P>
        </div>
    );
};

export default CourseSectionHeader;
