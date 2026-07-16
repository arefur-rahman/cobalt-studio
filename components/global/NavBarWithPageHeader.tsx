import { H2, P, Span } from "@/components/global/Texts";
import Footer from "./Footer";
import TopNavBar from "./TopNavBar";

const NavBarWithPageHeader = ({
    sectionTag,
    mainHeading,
    subHeading,
    children,
}: {
    sectionTag: string;
    mainHeading: string;
    subHeading: string;
    children?: React.ReactNode;
}) => {
    return (
        <>
            <TopNavBar />
            <section>
                <div className="h-[40vh] flex justify-center items-center bg-muted">
                    <div className="flex flex-col items-center justify-center">
                        <P className="text-primary tracking-[0.3em] text-[10px] md:text-sm uppercase mb-4 opacity-70">
                            {sectionTag}
                        </P>
                        <H2 className="text-4xl md:text-7xl font-semibold text-zinc-900 dark:text-white leading-[0.9] tracking-tight pb-6">
                            {mainHeading}
                            <Span className="text-primary ml-2.5">
                                {subHeading}
                            </Span>
                        </H2>
                        <div className="h-0.5 w-full bg-linear-to-r max-w-5xl from-zinc-900/10 via-transparent to-zinc-900/10 dark:from-white/20 dark:to-white/20" />
                    </div>
                </div>
                {children}
            </section>
            <Footer />
        </>
    );
};

export default NavBarWithPageHeader;
