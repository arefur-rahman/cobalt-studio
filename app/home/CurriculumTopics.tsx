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
                    title="know the course"
                    titlePrimary="flow"
                    subtitle="curriculum topics"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Premiere Pro Card */}
                    <div className="relative overflow-hidden bg-linear-to-br from-blue-100/80 via-indigo-50/60 to-white dark:from-blue-950/80 dark:via-indigo-900/30 dark:to-transparent border border-blue-200/70 dark:border-blue-700/40 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_-12px_rgba(99,102,241,0.2)] dark:shadow-[0_0_40px_-12px_rgba(99,102,241,0.25)]">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 hover:scale-95 hover:-rotate-3 transition-all">
                                <Clapperboard className="size-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-foreground">
                                    Adobe Premiere Pro
                                </h3>
                                <p className="text-xs md:text-sm text-blue-600/70 dark:text-blue-200/60">
                                    Core editing workflow built for fast, clean,
                                    professional cuts.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 md:gap-3">
                            {premiereProTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/50 text-xs md:text-sm text-blue-700 dark:text-blue-100 font-medium px-2 py-1.5 rounded-xl shadow-[0_2px_8px_-3px_rgba(99,102,241,0.1)] hover:shadow-[0_0_14px_-4px_rgba(99,102,241,0.35)] dark:hover:shadow-[0_0_14px_-4px_rgba(99,102,241,0.45)] hover:border-blue-400/60 dark:hover:border-blue-400/60 transition-all duration-300 cursor-default hover:scale-[1.03]"
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* After Effects Card */}
                    <div className="relative overflow-hidden bg-linear-to-br from-violet-100/80 via-purple-50/60 to-white dark:from-violet-950/80 dark:via-purple-900/30 dark:to-transparent border border-violet-200/70 dark:border-violet-700/40 rounded-3xl p-6 md:p-8 shadow-[0_0_40px_-12px_rgba(139,92,246,0.2)] dark:shadow-[0_0_40px_-12px_rgba(139,92,246,0.25)]">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center shrink-0 text-violet-600 dark:text-violet-400 hover:scale-95 hover:-rotate-3 transition-all">
                                <Sparkles className="size-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-foreground">
                                    After Effects
                                </h3>
                                <p className="text-xs md:text-sm text-violet-600/70 dark:text-violet-200/60">
                                    Motion design, compositing, and advanced
                                    visual storytelling tools.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2.5 md:gap-3">
                            {afterEffectsTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-800/50 text-xs md:text-sm text-violet-700 dark:text-violet-100 font-medium px-2 py-1.5 rounded-xl shadow-[0_2px_8px_-3px_rgba(139,92,246,0.1)] hover:shadow-[0_0_14px_-4px_rgba(139,92,246,0.35)] dark:hover:shadow-[0_0_14px_-4px_rgba(139,92,246,0.45)] hover:border-violet-400/60 dark:hover:border-violet-400/60 transition-all duration-300 cursor-default hover:scale-[1.03]"
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
