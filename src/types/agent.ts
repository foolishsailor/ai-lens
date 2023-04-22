export interface Agent {
  id: string;
  name?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  commsLineColor?: string;
}
