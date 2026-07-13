import enToBnNumber from "@/lib/numberEn2Bn";

const getStartDateStr = () => {
    const date = new Date();
    const currentDay = date.getDay();
    // Offsets to the closest Monday (0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday)
    const offsets = [1, 0, -1, -2, -3, 3, 2];
    date.setDate(date.getDate() + offsets[currentDay]);

    const day = date.getDate();
    const month = date.getMonth();

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
