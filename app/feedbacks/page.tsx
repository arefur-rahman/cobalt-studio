import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import { STUDENT_REVIEWS } from "@/lib/studentReviews";

const page = () => {
    return (
        <NavBarWithPageHeader
            sectionTag="our students"
            mainHeading="Reviews and"
            subHeading="Showcase"
        >
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {STUDENT_REVIEWS.map((review, i) => (
                        <div
                            key={i}
                            className="flex flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
                        >
                            <p className="font-bengali text-base leading-relaxed text-foreground sm:text-lg mb-8">
                                &quot;{review.review}&quot;
                            </p>
                            <div className="mt-auto flex items-center gap-4 pt-3 border-t border-border/40">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">
                                        {review.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        <span className="font-medium text-foreground/80">
                                            {review.batch}
                                        </span>{" "}
                                        • {review.platform}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </NavBarWithPageHeader>
    );
};

export default page;
