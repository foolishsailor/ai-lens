import { AgentContainer } from '../../types/agent';
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

export const addGlowToLine = (svgElement: SVGSVGElement) => {
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  const filter = createSVGElement('filter', {
    id: 'glow'
  });

  const feGaussianBlur = createSVGElement('fegaussianblur', {
    class: 'blur',
    result: 'coloredBlur',
    stddeviation: '5'
  });

  const feMerge = createSVGElement('femerge', {});
  const feMergeNode = createSVGElement('femergenode', { in: 'coloredBlur' });
  const feMergeNode1 = createSVGElement('femergenode', { id: 'SourceGraphic' });

  feMerge.appendChild(feMergeNode);
  feMerge.appendChild(feMergeNode);
  feMerge.appendChild(feMergeNode);
  feMerge.appendChild(feMergeNode1);

  filter.appendChild(feGaussianBlur);
  filter.appendChild(feMerge);

  defs.appendChild(filter);

  svgElement.appendChild(defs);
};

export const drawSteppedSVGLine = (
  startAgent: AgentContainer,
  endAgent: AgentContainer,
  steps: number,
  svgElement: SVGSVGElement
): void => {
  const { startPoint, endPoint } = calculateStartAndEndPoints(
    startAgent,
    endAgent,
    10
  );

  if (!startAgent.commsLineColor) return;

  const pathData = generateSteppedPath(startPoint, endPoint, steps);
  const path = createSVGElement('path', {
    d: pathData,
    stroke: startAgent.commsLineColor,
    'stroke-width': '4',
    fill: 'none'
    // filter: 'url(#glow)'
  });

  svgElement.appendChild(path);
};
