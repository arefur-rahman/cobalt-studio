import { H1, P } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const CourseContent = () => {
    return (
        <>
            <div className="flex justify-center items-center gap-4 max-w-7xl mx-auto py-16 px-6 lg:px-8 mb-8 md:mb-16 bg-background">
                <div className="relative group max-w-lg w-full">
                    <IconSearch
                        stroke={2}
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary"
                    />
                    <Input
                        placeholder="Search courses..."
                        className="w-full h-12 text-sm px-6 pl-11 rounded-xl border border-border bg-card dark:bg-card/80 dark:border-border/60 text-foreground placeholder:text-muted-foreground shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 focus-visible:border-primary dark:focus-visible:border-primary dark:shadow-[0_0_0_1px_oklch(0.5607_0.2181_266.5346/0.15)] dark:focus-visible:shadow-[0_0_16px_oklch(0.5607_0.2181_266.5346/0.20)]"
                    />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                    <P>Showing 1-1 of 1 courses</P>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="group flex flex-col h-full bg-card dark:bg-zinc-900 border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 pt-0">
                        <div className="overflow-hidden">
                            <Image
                                src={"/batch-1.webp"}
                                alt="batch 1 banner"
                                width={400}
                                height={300}
                                loading="lazy"
                                className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <CardContent>
                            <CardHeader>
                                <CardTitle>
                                    <H1 className="text-lg sm:text-xl font-bold leading-tight text-foreground group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
                                        Frame Forward — AI Video Editing (Batch
                                        01)
                                    </H1>
                                </CardTitle>
                            </CardHeader>
                            <CardDescription>
                                <P className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                    Master the art of visual storytelling with
                                    Bangladesh’s top creators. Master aesthetic
                                    video editing and motion graphics, guided
                                    directly by the Voice of Dhaka.
                                </P>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="mt-auto flex items-center gap-3 px-6 pb-6">
                            <Button className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:bg-primary/90 dark:shadow-primary/30 transition-colors">
                                Enroll now
                            </Button>
                            <Link href={"/courses/batch-1"}>
                                <Button
                                    variant="secondary"
                                    className="flex-1 h-11 rounded-xl font-semibold bg-muted text-foreground hover:bg-muted/70 dark:bg-white/5 dark:text-primary dark:border dark:border-white/10 dark:hover:bg-white/10 transition-colors"
                                >
                                    Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CourseContent;
