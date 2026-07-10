import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { Clapperboard, Sparkles } from "lucide-react";

const CurriculumTopics = () => {
    const premiereProTopics = [
        "Interface Setup",
        "Timeline Workflow",
        "Basic Cutting",
        "Layers",
        "Keyframes",
        "Text Animation",
        "Motion Graphics",
        "B-roll Editing",
        "Speed Ramping",
        "Transitions",
        "Audio Mixing",
        "Sound Design",
        "Color Theory",
        "Color Grading",
        "Cinematic Editing",
        "Storytelling",
        "Script Writing",
        "Export Settings",
        "YouTube Workflow",
        "Thumbnail Design",
    ];

    const afterEffectsTopics = [
        "Animation Basics",
        "Shape Layers",
        "Graph Editor",
        "Masking",
        "Track Mattes",
        "Typography",
        "Null Objects",
        "Motion Workflow",
        "3D Space",
        "Camera Animation",
        "Lighting",
        "Parallax Effect",
        "Motion Posters",
        "Roto Brush",
        "Puppet Tool",
        "Motion Tracking",
        "Expressions",
        "Kinetic Typography",
        "Geo Layers",
        "Map Animation",
        "AI Workflow",
        "Creative Compositing",
    ];

    return (
        <SectionSeparator className="bg-background py-20 md:py-28 relative">
            <GradientTopBorder />
            <div className="max-w-7xl mx-auto space-y-12">
                <SectionHeader
                    title="know the course flow"
                    subtitle="curriculum topics"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Premiere Pro Card */}
                    <div className="relative overflow-hidden bg-linear-to-br from-primary/4 to-transparent dark:from-primary/2 border border-primary/10 dark:border-primary/5 rounded-3xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary hover:scale-95 hover:-rotate-3 transition-all">
                                <Clapperboard className="size-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-foreground">
                                    Adobe Premiere Pro
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Core editing workflow built for fast, clean,
                                    professional cuts.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 md:gap-3">
                            {premiereProTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 cursor-default hover:scale-[1.03]"
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* After Effects Card */}
                    <div className="relative overflow-hidden bg-linear-to-br from-violet-500/4 to-transparent dark:from-violet-500/2 border border-violet-500/10 dark:border-violet-500/5 rounded-3xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center shrink-0 text-violet-500 hover:scale-95 hover:-rotate-3 transition-all">
                                <Sparkles className="size-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-foreground">
                                    After Effects
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                    Motion design, compositing, and advanced
                                    visual storytelling tools.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 md:gap-3">
                            {afterEffectsTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300 cursor-default hover:scale-[1.03]"
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionSeparator>
    );
};

export default CurriculumTopics;
