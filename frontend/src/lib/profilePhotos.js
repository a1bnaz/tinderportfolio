const imageModules = import.meta.glob('../profilephotos/*.{JPG,JPEG,PNG,WEBP,SVG,jpg,jpeg,png,webp,svg}', {
  eager: true,
});

export const profilePhotos = Object.keys(imageModules)
  .sort()
  .map((key) => imageModules[key]?.default ?? imageModules[key])
  .filter(Boolean);

export const profilePhoto1 = profilePhotos[0] || '';
