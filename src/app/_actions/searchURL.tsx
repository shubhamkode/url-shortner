"use server";

import prisma from "@/utils/prisma";
import { Url } from "@prisma/client";

export async function searchURL(id: string) {
  const baseUrl = await prisma.url.findUnique({ where: { id } });
  await prisma.url.update({
    where: { id: id },
    data: { visits: { increment: 1 } },
  });

  return baseUrl;
}

export async function searchURLByText(searchTxt: string) {
  return await prisma.url.findMany({
    where: { url: { contains: searchTxt } },
    orderBy: { visits: "desc" },
  });
}
