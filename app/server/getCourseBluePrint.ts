"use server";

import { prisma } from "@/lib/prisma";
import { getLocale } from "next-intl/server";

const getCourseBluePrint = async () => {
    const local = await getLocale();

    const bluePrint =
        local === "bn"
            ? await prisma.bluePrintBn.findMany({
                  orderBy: { moduleNo: "asc" },
              })
            : await prisma.bluePrintEn.findMany({
                  orderBy: { moduleNo: "asc" },
              });
    return bluePrint;
};

export default getCourseBluePrint;
