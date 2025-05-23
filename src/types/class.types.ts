export interface IClass {
  classId: number;
  courseName: string;
  teacherId: number;
  semester: Semester;
  year: number;
  students: number[];
  seats: number;
}

export enum Semester {
  SPRING = 'Spring',
  SUMMER = 'Summer',
  FALL = 'Fall',
  WINTER = 'Winter',
}
