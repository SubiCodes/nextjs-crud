import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "./user.actions";
import { Prisma } from "@/generated/prisma";

export async function getParts(searchTerm?: string) {
    try {
        const currentUser = await getCurrentUserId();
        if (!currentUser) {
            return;
        }
        const whereClause: any = {
            userId: currentUser
        }
        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: "insensitive",
            };
        }

        const userParts = await prisma.parts.findMany({
            where: whereClause,
        });

        return { success: true, userParts };
    } catch (error) {
        console.error("Actual error:", error)
        throw new Error("Failed to fetch user parts.")
    }
}

export async function getPart(itemId: string) {
    try {
        const currentUser = await getCurrentUserId();
        if (!currentUser) {
            return;
        }
        const whereClause: any = {
            userId: currentUser,
            id: itemId
        }
        const userPart = await prisma.parts.findUnique({
            where: whereClause
        })
        return { success: true, userPart };
    } catch (error) {
        console.error("Actual error:", error)
        throw new Error("Failed to fetch part data.")
    }
}

export async function createPart(data: Prisma.PartsCreateInput) {
    try {
        const currentUser = await getCurrentUserId();
        if (!currentUser) {
            return;
        }
        const newPart = await prisma.parts.create({
            data: {
                ...data,
                userId: currentUser
            }
        })
        return newPart;
    } catch (error) {
        console.error("Actual error:", error)
        throw new Error("Failed to create part.")
    }
}