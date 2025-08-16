import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "./user.actions";

export async function getParts(searchTerm?: string) {
    try {
        const currentUser = await getCurrentUserId();
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