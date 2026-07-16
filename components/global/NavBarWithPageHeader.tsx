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
                <div className="flex items-center justify-center bg-muted pt-20 pb-10 md:pb-16 md:pt-32">
                    <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center md:px-8 w-full">
                        <P className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary/70">
                            {sectionTag}
                        </P>
                        <H2 className="font-semibold leading-[0.95] tracking-tight text-zinc-900 dark:text-white text-[clamp(1.8rem,7vw,5.5rem)]">
                            {mainHeading}
                            <Span className="ml-2 text-primary">
                                {subHeading}
                            </Span>
                        </H2>
                        <div className="mt-8 h-px w-full max-w-4xl bg-linear-to-r from-transparent via-zinc-300 dark:via-white/20 to-transparent" />
                    </div>
                </div>
                {children}
            </section>
            <Footer />
        </>
    );
};

export default NavBarWithPageHeader;
