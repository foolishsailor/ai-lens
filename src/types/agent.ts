export interface AgentInterface {
  id: string;
  name?: string;
  role?: string;
  goal?: string;
  tasks?: string[];
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  commsLineColor?: string;
}
