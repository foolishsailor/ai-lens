import { Agent } from '../../types/agent';
import { Point } from '../../types/draw';

import { createSVGElement } from './createSVGelement';
import { calculateStartAndEndPoints } from './createStartEndConnectionPoints';

export const generateSteppedPath = (
  start: Point,
  end: Point,
  steps: number
): string => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const stepX = dx / (steps / 2);
  const stepY = dy / (steps / 2);

  let path = `M${start.x},${start.y}`;
  let { x } = start;
  let { y } = start;

  for (let i = 1; i <= steps; i++) {
    if (i % 2 === 1) {
      x += stepX;
    } else {
      y += stepY;
    }
    path += ` L${x},${y}`;
  }

  return path;
};

export const drawSteppedSVGLine = (
  startAgent: Agent,
  endAgent: Agent,
  steps: number,
  svgElement: SVGSVGElement,
  arrowSize?: number
): void => {
  const { startPoint, endPoint } = calculateStartAndEndPoints(
    startAgent,
    endAgent
  );

  const pathData = generateSteppedPath(startPoint, endPoint, steps);

  const path = createSVGElement('path', {
    d: pathData,
    stroke: startAgent.commsLineColor,
    'stroke-width': '3',
    fill: 'none',
    'marker-end': 'url(#arrow)',
    filter: 'url(#glow)'
  });

  if (arrowSize) {
    const marker = createSVGElement('marker', {
      id: 'arrow',
      refX: `${arrowSize}`,
      refY: `${arrowSize / 2}`,
      markerWidth: `${arrowSize}`,
      markerHeight: `${arrowSize}`,
      viewBox: `0 0 ${arrowSize} ${arrowSize}`,
      orient: 'auto'
    });

    const arrowPath = createSVGElement('path', {
      d: `M0,0 L0,${arrowSize} L${arrowSize},${arrowSize / 2} Z`,
      fill: startAgent.commsLineColor
    });

    marker.appendChild(arrowPath);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.appendChild(marker);

    svgElement.appendChild(defs);
  }

  svgElement.appendChild(path);
};
