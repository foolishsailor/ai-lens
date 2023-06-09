import { AgentInterface } from './agent';

export type Point = {
  x: number;
  y: number;
};

export type Size = { width: number; height: number };

export type Line = {
  start: Point;
  end: Point;
  steps: number;
};

export type Connection = {
  startAgent: AgentInterface;
  endAgent: AgentInterface;
  steps: number;
};
