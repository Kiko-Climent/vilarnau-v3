import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";

export async function getBlurData(imagePath) {
  const absolutePath = path.join(process.cwd(), "public", imagePath);

  const buffer = fs.readFileSync(absolutePath);
  const { base64 } = await getPlaiceholder(buffer);

  return base64;
}
