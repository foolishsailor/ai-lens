export const createSVGElement = (
  tagName: string,
  attributes: Record<string, string>
): SVGElement => {
  const element = document.createElementNS(
    'http://www.w3.org/2000/svg',
    tagName
  );

  for (const attrName in attributes) {
    element.setAttribute(attrName, attributes[attrName]);
  }

  return element;
};
