"use server";

import { prisma } from "@/lib/prisma";

const syncUserWithDb = async (
    email: string,
    phoneNumber: string,
    name: string,
    firebaseUid: string,
) => {
    const user = await prisma.user.upsert({
        where: {
            firebaseUid,
        },
        update: {
            email,
            phoneNumber,
            name,
        },
        create: {
            email,
            phoneNumber,
            name,
            firebaseUid,
        },
    });
    return user;
};

export { syncUserWithDb };
