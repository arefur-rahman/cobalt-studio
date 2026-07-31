"use server";

import { prisma } from "@/lib/prisma";

const syncUserCreationWithDb = async (
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

const getUserInfo = async (firebaseUid: string) => {
    const user = await prisma.user.findUnique({
        where: {
            firebaseUid,
        },
    });
    return user;
};

export { syncUserCreationWithDb, getUserInfo };
