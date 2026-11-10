export interface Classroom {
  id: number;
  code: string;
  building: string;
  capacity: number;
  status: boolean;
}

export type CreateClassroomRequest = Omit<Classroom, 'id'>;

export type UpdateClassroomRequest = Omit<Classroom, 'id'>;
