export interface AgentContainer {
  id: string;
  name?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  commsLineColor?: string;
}
