const toTitleCase = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export default toTitleCase;