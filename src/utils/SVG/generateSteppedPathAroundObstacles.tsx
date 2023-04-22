import { Agent } from '../../types/agent';
import { Connection, Point } from '../../types/draw';
import { generateRandomColor } from '../draw';
import { createSVGElement } from './createSVGelement';

const calculateStartAndEndPoints = (
  startAgent: Agent,
  endAgent: Agent
): { startPoint: Point; endPoint: Point } => {
  const startCenter: Point = {
    x: startAgent.position.x + startAgent.size.width / 2,
    y: startAgent.position.y + startAgent.size.height / 2
  };
  const endCenter: Point = {
    x: endAgent.position.x + endAgent.size.width / 2,
    y: endAgent.position.y + endAgent.size.height / 2
  };

  const getMiddlePoint = (
    agent: Agent,
    side: 'left' | 'right' | 'top' | 'bottom'
  ): Point => {
    switch (side) {
      case 'left':
        return {
          x: agent.position.x,
          y: agent.position.y + agent.size.height / 2
        };
      case 'right':
        return {
          x: agent.position.x + agent.size.width,
          y: agent.position.y + agent.size.height / 2
        };
      case 'top':
        return {
          x: agent.position.x + agent.size.width / 2,
          y: agent.position.y
        };
      case 'bottom':
        return {
          x: agent.position.x + agent.size.width / 2,
          y: agent.position.y + agent.size.height
        };
    }
  };

  const dx = endCenter.x - startCenter.x;
  const dy = endCenter.y - startCenter.y;

  const startPoint =
    Math.abs(dx) > Math.abs(dy)
      ? getMiddlePoint(startAgent, dx > 0 ? 'right' : 'left')
      : getMiddlePoint(startAgent, dy > 0 ? 'bottom' : 'top');

  const endPoint =
    Math.abs(dx) > Math.abs(dy)
      ? getMiddlePoint(endAgent, dx > 0 ? 'left' : 'right')
      : getMiddlePoint(endAgent, dy > 0 ? 'top' : 'bottom');

  return { startPoint, endPoint };
};

const isSegmentAllowed = (
  start: Point,
  end: Point,
  agents: Agent[],
  startAgent: Agent,
  gap: number
): boolean => {
  for (const agent of agents) {
    if (agent === startAgent) {
      continue;
    }

    const { position, size } = agent;
    const paddedRect = {
      x: position.x - gap,
      y: position.y - gap,
      width: size.width + 2 * gap,
      height: size.height + 2 * gap
    };

    if (
      (start.x >= paddedRect.x && start.x <= paddedRect.x + paddedRect.width) ||
      (end.x >= paddedRect.x && end.x <= paddedRect.x + paddedRect.width)
    ) {
      if (
        (start.y >= paddedRect.y &&
          start.y <= paddedRect.y + paddedRect.height) ||
        (end.y >= paddedRect.y && end.y <= paddedRect.y + paddedRect.height)
      ) {
        return false;
      }
    }
  }
  return true;
};

const findPath = (
  start: Point,
  end: Point,
  steps: number,
  agents: Agent[],
  startAgent: Agent,
  gap: number,
  path: string[]
): boolean => {
  if (steps === 0) {
    return start.x === end.x && start.y === end.y;
  }

  const directions = [
    { dx: end.x - start.x, dy: 0 },
    { dx: 0, dy: end.y - start.y }
  ];

  for (const { dx, dy } of directions) {
    const nextPoint = { x: start.x + dx, y: start.y + dy };

    if (isSegmentAllowed(start, nextPoint, agents, startAgent, gap)) {
      path.push(` L${nextPoint.x},${nextPoint.y}`);
      if (findPath(nextPoint, end, steps - 1, agents, startAgent, gap, path)) {
        return true;
      }
      path.pop();
    }
  }

  return false;
};

const generatePath = (
  start: Point,
  end: Point,
  steps: number,
  agents: Agent[],
  startAgent: Agent,
  gap: number
): string => {
  const path = [`M${start.x},${start.y}`];
  findPath(start, end, steps, agents, startAgent, gap, path);
  return path.join('');
};

export const drawSteppedSVGLineAroundObstacles = (
  connection: Connection,
  agents: Agent[],
  gap: number,
  svgElement: SVGSVGElement,
  arrowSize?: number
): void => {
  const startAgent = agents.find(
    (agent: Agent) => agent.id === connection.startAgent
  );
  const endAgent = agents.find(
    (agent: Agent) => agent.id === connection.endAgent
  );

  if (!startAgent || !endAgent) return;

  const { startPoint, endPoint } = calculateStartAndEndPoints(
    startAgent,
    endAgent
  );

  console.log(
    'startPoint',
    startPoint,
    'endPoint',
    endPoint,
    'steps',
    connection.steps,
    'agents',
    agents,
    'startAgent',
    startAgent,
    'gap',
    gap,
    ''
  );
  const pathData = generatePath(
    startPoint,
    endPoint,
    connection.steps,
    agents,
    startAgent,
    gap
  );

  const color = generateRandomColor();

  const path = createSVGElement('path', {
    d: pathData,
    stroke: color,
    'stroke-width': '3',
    fill: 'none',
    'marker-end': 'url(#arrow)'
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
      fill: color
    });

    marker.appendChild(arrowPath);

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.appendChild(marker);

    svgElement.appendChild(defs);
  }

  svgElement.appendChild(path);
};
