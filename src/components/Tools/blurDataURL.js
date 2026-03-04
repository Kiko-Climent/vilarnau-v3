// Un helper reutilizable — puedes ponerlo en /utils/blurPlaceholder.js
export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#e5e5e5"/>
</svg>`;

export const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);