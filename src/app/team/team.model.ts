export interface Team {
  id: number;
  name: string;
  vcpu: number;
  ram: number;
  space: number;
  courseName: string;
  maxVMsActive: number;
  maxVMs: number;
  enabled: boolean;
  creator: string;
}
