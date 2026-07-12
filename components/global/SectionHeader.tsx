import { H2, H3, Span } from "./Texts";

const SectionHeader = ({
    subtitle,
    title,
    titlePrimary,
}: {
    subtitle?: string;
    title: string;
    titlePrimary?: string;
}) => {
    return (
        <div className="max-w-2xl space-y-4 mb-12">
            {subtitle && (
                <H3 className="text-xs font-bold text-primary tracking-[0.4rem] leading-tight uppercase mb-3 opacity-80">
                    {subtitle}
                </H3>
            )}
            {title && (
                <H2 className="text-[clamp(32px,5vw,52px)] font-semibold text-foreground dark:text-white capitalize leading-none tracking-tighter">
                    {title} <Span className="text-primary">{titlePrimary}</Span>
                </H2>
            )}
        </div>
    );
};

export default SectionHeader;
