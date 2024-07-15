"use server";

import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLink(id: string) {
  await prisma.url.delete({ where: { id: id } });
  revalidatePath("/search")
}
