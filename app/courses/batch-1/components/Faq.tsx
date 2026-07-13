import CourseSectionHeader from "./CourseSectionHeader";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
    type FaqItem = {
        question: string;
        answer: string;
    };

    const FAQS: FaqItem[] = [
        {
            question: "আমি একদম beginner — এই কোর্স কি আমার জন্য?",
            answer: "হ্যাঁ, একদম। কোর্সটি beginner থেকে advanced পর্যন্ত সবার জন্য ডিজাইন করা। প্রথম ৩টি ক্লাসেই সফটওয়্যার install থেকে শুরু হবে।",
        },
        {
            question: "লাইভ ক্লাস মিস হলে কি পাব?",
            answer: "সব লাইভ ক্লাসের রেকর্ডিং পাবেন। যেকোনো সময় দেখতে পারবেন।",
        },
        {
            question: "কোন software লাগবে? দাম কত?",
            answer: "Adobe Premiere Pro ও After Effects লাগবে। Adobe Creative Cloud-এ ৭ দিনের free trial আছে। Class 1-এ সব setup করা শেখানো হবে।",
        },
        {
            question: "পেমেন্ট কীভাবে করব?",
            answer: "bKash, Nagad, Rocket, ব্যাংক ট্রান্সফার এবং card সব মাধ্যমে পেমেন্ট করা যাবে। EMI সুবিধাও আছে।",
        },
        {
            question: "ফ্রিল্যান্সিং শুরু করতে কতদিন লাগবে?",
            answer: "কোর্স শেষে সরাসরি portfolio দিয়ে কাজ শুরু করতে পারবেন। অনেক স্টুডেন্ট কোর্স চলাকালীনই প্রথম অর্ডার পেয়েছেন।",
        },
        {
            question: "মানি-ব্যাক গ্যারান্টি কীভাবে কাজ করে?",
            answer: "এনরোলের ৭ দিনের মধ্যে সন্তুষ্ট না হলে সম্পূর্ণ টাকা ফেরত দেওয়া হবে। কোনো প্রশ্ন করা হবে না।",
        },
    ];

    return (
        <section className="px-24 py-28 space-y-16">
            <CourseSectionHeader
                badgeText="FAQ"
                sectionTitle="সাধারণ"
                sectionSubtitle="প্রশ্ন"
                sectionDescription="কোর্স সম্পর্কে সবচেয়ে সাধারণ প্রশ্নগুলোর উত্তর এখানে দেওয়া হলো।"
            />
            <div className="w-full">
                <div className="mx-auto max-w-3xl px-6">
                    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-1"
                            className="w-full"
                        >
                            {FAQS.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="border-border/60 px-2"
                                >
                                    <AccordionTrigger className="px-4 py-6 hover:no-underline sm:px-6">
                                        <span className="font-bengali text-base font-bold text-foreground hover:text-primary transition-all duration-200 sm:text-lg">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="font-bengali px-4 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
