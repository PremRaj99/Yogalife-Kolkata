import { createHash } from "node:crypto";

const folder = "yogalife/notices";
export const maxImageBytes = 4 * 1024 * 1024;

// Signed upload through Cloudinary's REST API; returns the https URL of the stored image.
export async function uploadImage(file: File) {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) throw new Error("Cloudinary is not configured.");
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > maxImageBytes) throw new Error("Image must be under 4 MB.");

  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${secret}`)
    .digest("hex");
  const body = new FormData();
  body.append("file", file);
  body.append("api_key", key);
  body.append("timestamp", timestamp);
  body.append("folder", folder);
  body.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    body,
  });
  if (!response.ok) throw new Error("Image upload failed.");
  const { secure_url } = (await response.json()) as { secure_url: string };
  return secure_url;
}
