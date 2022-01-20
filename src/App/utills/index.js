export const findDirection = (x1, y1, x2, y2) => {
  if (x1 < x2 && y1 < y2) {
    return [1, 1];
  }
  if (x1 > x2 && y1 < y2) {
    return [-1, 1];
  }
  if (x1 > x2 && y1 > y2) {
    return [-1, -1];
  }
  if (x1 < x2 && y1 > y2) {
    return [1, -1];
  }
  return [0, 0];
};

export const formatTitle = (title) => {
  title = title.slice(1);
  if (title.length === 0) return "Home";
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};
