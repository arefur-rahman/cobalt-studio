import { H1, P } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const CourseContent = () => {
    const t = useTranslations("Courses");
    return (
        <>
            {/* Search */}
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-12 md:py-14">
                <div className="mx-auto max-w-lg relative group">
                    <IconSearch
                        stroke={2}
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary"
                    />

                    <Input
                        placeholder={t("searchPlaceholder")}
                        className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm shadow-sm transition-all duration-200 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 dark:bg-card/80 dark:border-border/60 dark:focus-visible:shadow-[0_0_16px_oklch(0.5607_0.2181_266.5346/0.20)]"
                    />
                </div>
            </div>

            {/* Courses */}
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 pb-16">
                <div className="mb-8 flex items-center justify-between">
                    <P className="text-sm text-muted-foreground">
                        {t("showingCourses")}
                    </P>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 dark:bg-zinc-900">
                        {/* Image */}
                        <div className="aspect-16/10 overflow-hidden">
                            <Image
                                src="/batch-1.webp"
                                alt="Batch 1 banner"
                                width={400}
                                height={250}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <CardContent className="flex flex-1 flex-col p-6">
                            <CardTitle>
                                <H1 className="text-xl font-bold leading-tight text-foreground transition-colors line-clamp-2 group-hover:text-primary">
                                    MTTB - MERN Top 2 Bottom
                                </H1>
                            </CardTitle>

                            <CardDescription className="mt-4">
                                <P className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                    MongoDB, Express.js, React এবং Node.js দিয়ে
                                    আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি ও ডিপ্লয় করুন।
                                    প্রোডাকশন-গ্রেড রিয়েল-ওয়ার্ল্ড প্রজেক্টের
                                    মাধ্যমে শিখুন পেশাদার ফুল-স্ট্যাক
                                    ডেভেলপমেন্ট।
                                </P>
                            </CardDescription>
                        </CardContent>

                        {/* Footer */}
                        <CardFooter className="mt-auto flex flex-col gap-3 px-6 pb-6 sm:flex-row">
                            <Button className="h-11 w-full rounded-xl font-semibold shadow-md shadow-primary/20 transition-colors hover:bg-primary/90 sm:flex-1">
                                {t("enrollNow")}
                            </Button>

                            <Button
                                asChild
                                variant="secondary"
                                className="h-11 w-full rounded-xl font-semibold transition-colors hover:bg-muted/70 dark:border dark:border-white/10 dark:bg-white/5 dark:text-primary dark:hover:bg-white/10 sm:flex-1"
                            >
                                <Link href="/courses/batch-1">
                                    {t("details")}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CourseContent;
