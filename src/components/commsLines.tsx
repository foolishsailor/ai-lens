import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';
import { createConnectionList } from '../utils/createConnectionList';
import { AgentInterface } from '../types/agent';

import { Connection } from '../types/draw';
import {
  addGlowToLine,
  drawSteppedSVGLine
} from '../utils/SVG/generateSteppedPath';

type CommsLinesProps = {
  message: Message;
  agents: AgentInterface[];
};

const CommsLines = ({ message, agents }: CommsLinesProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    if (!svgRef.current) return;

    while (svgRef.current.lastChild) {
      svgRef.current.removeChild(svgRef.current.lastChild);
    }

    const connections: Connection[] = createConnectionList(message, agents, 4);

    connections.forEach((connection) => {
      if (svgRef.current)
        drawSteppedSVGLine(
          connection.startAgent,
          connection.endAgent,
          10,
          svgRef.current
        );
    });

    addGlowToLine(svgRef.current);
  }, [agents, message]);

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [svgRef]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default CommsLines;
