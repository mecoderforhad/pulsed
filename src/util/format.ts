export const truncateText = (text: string, maxLength = 100) => {
  if (typeof text !== "string") return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
