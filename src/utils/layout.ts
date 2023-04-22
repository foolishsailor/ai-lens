export const getDivPosition = (div: HTMLDivElement) => {
  const rect = div.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
};

export const getCenterPoint = (div: HTMLDivElement) => {
  var rect = div.getBoundingClientRect();
  var centerX = rect.left + rect.width / 2;
  var centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
};
