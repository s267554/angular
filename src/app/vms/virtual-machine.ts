export interface VirtualMachine {
  id: number;
  url: string;
  vcpu: number;
  space: number;
  ram: number;
  active: boolean;
}
