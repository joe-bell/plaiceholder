export const extractImagePath = (plaiceholderClass: string) =>
  plaiceholderClass.replace("plaiceholder-[", "").replace("]", "");
