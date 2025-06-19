import type { BlogPost } from "./getAllPosts";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

function svgBufferToPngBuffer(svg: string) {
  // Note: this is a simplified example
  return Buffer.from(svg);
}

export async function generateOgImageForPost(post: BlogPost) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}
