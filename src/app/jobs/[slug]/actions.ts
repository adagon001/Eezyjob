"use server";

import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createJobSchema, createResponseSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

export async function createJobResponse(formData: FormData, jobId: number) {
  const values = Object.fromEntries(formData.entries());

  const {
    name,
    email,
    photosList,
    phoneNumber,
    description
  } = createResponseSchema.parse(values);

  const slug = `${toSlug(name)}-${nanoid(10)}`;

  let photo: string | undefined = undefined;

  if (photosList) {
    const blob = await put(
      `company_logos/${slug}${path.extname(photosList.name)}`,
      photosList,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    photo = blob.url;
  }

  await prisma.response.create({
    data: {
      name,
      email,
      phoneNumber,
      description,
      photosList: photo,
      jobId
    },
  });

  redirect("/job-submitted");
}
