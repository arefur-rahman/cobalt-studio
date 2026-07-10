import { H3, Span } from "@/components/global/Texts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, PlayCircle } from "lucide-react";

const OutlineAccordion = () => {
    const outlineInformation = [
        {
            id: "01",
            title: "Adobe Premiere Pro Foundations",
            subtitle:
                "Master the timeline, interface, and core tools for professional video editing.",
            contents: [
                "Premiere Pro Interface and Project Setup",
                "Basic Editing Tools and Timeline Workflow",
                "Layers, Keyframes, Text, and Graphics",
                "Advanced Editing Techniques",
                "30-Second B-roll Project",
                "1-Minute Premiere Pro Final Project",
            ],
        },
        {
            id: "02",
            title: "Storytelling, Audio, and Color",
            subtitle:
                "The art of pacing, script writing, sound mixing, and cinematic color grading.",
            contents: [
                "Storytelling and Script Writing",
                "Music, Sound Effects, and Audio Mixing",
                "Color Theory and Basic Color Grading",
            ],
        },
        {
            id: "03",
            title: "After Effects Foundations",
            subtitle:
                "Motion graphics basics, masking, 3D space, and advanced animation workflows.",
            contents: [
                "After Effects Interface and Animation Basics",
                "Shape Layers and Graph Editor",
                "Masking, Mattes, Parenting, and Typography",
                "Null Objects and Motion Workflow",
                "3D Space, Camera, Lights, and Parallax",
                "Motion Poster Project Inspired by Vox",
                "Roto Brush, Puppet Tool, Tracking, and Expressions",
                "Creative Motion Graphics Project",
            ],
        },
        {
            id: "04",
            title: "Map Animation and Geo Layers",
            subtitle:
                "Professional map motion graphics using Geo Layers and manual animation techniques.",
            contents: [
                "Geo Layers Fundamentals",
                "Advanced Map Motion Graphics",
                "Manual Map Animation Without Geo Layers",
            ],
        },
        {
            id: "05",
            title: "Advanced 3D and AI Workflow",
            subtitle:
                "Integrating 3D models and AI-powered tools into your production pipeline.",
            contents: [
                "Advanced 3D Camera System",
                "3D Models, Lighting, and Magic Realism",
                "AI-Powered Video Production",
            ],
        },
        {
            id: "06",
            title: "Professional Editing and YouTube Growth",
            subtitle:
                "Mastering facecam editing, live projects, and YouTube SEO strategies.",
            contents: [
                "A-roll / Facecam Editing",
                "VOD Live Project",
                "YouTube Growth, SEO, and Thumbnail Design",
            ],
        },
    ];
    return (
        <div>
            <Accordion type="single" collapsible className="space-y-4">
                {outlineInformation.map((outline) => (
                    <AccordionItem
                        key={outline?.id}
                        value={outline?.id}
                        className="border-none"
                    >
                        <AccordionTrigger className="w-full border border-muted-foreground/30 hover:border-primary/80 rounded-xl px-5 md:px-8 py-5 transition-all duration-300 data-[state=open]:border-primary data-[state=open]:rounded-b-none">
                            <div className="flex items-center w-full gap-4">
                                <Span className="text-2xl md:text-3xl font-semibold transition-colors duration-300 text-muted-foreground dark:text-muted-foreground group-hover/accordion-trigger:text-primary/80 group-aria-expanded/accordion-trigger:text-primary">
                                    {outline?.id}
                                </Span>
                                <H3 className="text-xl md:text-2xl font-semibold transition-colors duration-300 text-foreground dark:text-white">
                                    {outline?.title}
                                </H3>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="border-x border-b border-muted-foreground/30 rounded-b-xl px-5 md:px-8 pt-6 pb-6 bg-background">
                            <p className="text-sm md:text-base text-muted-foreground mb-6">
                                {outline?.subtitle}
                            </p>
                            <div className="space-y-3 mb-6">
                                {outline?.contents.map((content, index) => (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-between border border-muted-foreground/20 bg-slate-50/50 dark:bg-zinc-900/50 p-4 rounded-xl hover:border-primary/40 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <PlayCircle className="size-5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-300" />
                                            <Span className="text-sm font-medium text-foreground">
                                                Class {index + 1}: {content}
                                            </Span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                                            <span>Live Session</span>
                                            <FileText className="size-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-semibold text-primary">
                                • Total {outline?.contents.length} Lessons in
                                this module
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default OutlineAccordion;
