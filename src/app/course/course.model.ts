
export interface Course {
  readonly name: string;
  readonly acronym: string;
  readonly max: number;
  readonly min: number;
  readonly enabled: boolean;
  readonly virtualMachineModel: VMmodel;
}

export interface VMmodel {
  id: number;
  name: string;
  url: string;
}
