import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "./user.actions";
import { revalidatePath } from "next/cache";

export async function getParts(searchTerm: String ) {
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

        const userParts = await prisma.part.findMany({
            where: whereClause,
        });

        revalidatePath("/");
        return { success: true, data: userParts };
    } catch (error) {
        throw new Error("Failed to fetch user parts.")
    }
}