"use server";

import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function createURL(e: FormData) {
  let baseUrl = e.get("baseUrl") as string;
  const tags = e.get("tags") as string;

  if (!baseUrl.startsWith("https://")) {
    baseUrl = `https://${baseUrl}`;
  }

  const db_url = await prisma.url.findFirst({
    where: {
      url: baseUrl,
    },
  });

  if (db_url != null) {
    return db_url.id;
  }

  const shortUrl = await prisma.url.create({
    data: {
      url: baseUrl,
      tags: tags,
    },
  });
  return shortUrl.id;
}
