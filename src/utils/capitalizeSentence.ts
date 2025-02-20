export const capitalizeSentence = (str: string): string => {
  return str
    .split("-") // Split at hyphens (if any)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join words with a space
};
