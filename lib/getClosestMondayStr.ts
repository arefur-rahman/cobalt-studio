import enToBnNumber from "@/lib/numberEn2Bn";

const getStartDateStr = (locale: string = "bn") => {
    const date = new Date();
    const currentDay = date.getDay();
    // Calculate days to add to get to the upcoming Monday (0 = Sunday, 1 = Monday, 2 = Tuesday, etc.)
    const daysToAdd = (1 - currentDay + 7) % 7;
    date.setDate(date.getDate() + daysToAdd);

    const day = date.getDate();
    const month = date.getMonth();

    if (locale === "en") {
        const englishMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return `${day} ${englishMonths[month]}`;
    }

    const banglaMonths = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];

    return `${enToBnNumber(day)} ${banglaMonths[month]}`;
};

export default getStartDateStr;
