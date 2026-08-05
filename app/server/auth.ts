"use server";

import { prisma } from "@/lib/prisma";

const syncUserCreationWithDb = async (
    email: string,
    phoneNumber: string | null | undefined,
    name: string,
    firebaseUid: string,
) => {
    const formattedPhone = phoneNumber?.trim() || null;

    try {
        // Check if user exists by firebaseUid or email
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ firebaseUid }, ...(email ? [{ email }] : [])],
            },
        });

        if (existingUser) {
            const updateData: {
                name?: string;
                email?: string;
                firebaseUid?: string;
                phoneNumber?: string;
            } = {
                firebaseUid,
            };

            if (name) updateData.name = name;
            if (email) updateData.email = email;
            if (formattedPhone) updateData.phoneNumber = formattedPhone;

            const user = await prisma.user.update({
                where: { id: existingUser.id },
                data: updateData,
            });
            return user;
        }

        const user = await prisma.user.create({
            data: {
                email,
                name: name || "User",
                firebaseUid,
                ...(formattedPhone ? { phoneNumber: formattedPhone } : {}),
            },
        });
        return user;
    } catch (error) {
        console.error("Error in syncUserCreationWithDb:", error);
        throw error;
    }
};

const getUserInfo = async (firebaseUid: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                firebaseUid,
            },
        });
        return user;
    } catch (error) {
        console.error("Error in getUserInfo:", error);
        return null;
    }
};

export { getUserInfo, syncUserCreationWithDb };
