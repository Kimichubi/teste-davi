export default interface IPoll {
  id: number;
  title: string;
  dateToInit: Date;
  dateToEnd: Date;
}
export interface IPollCreateDto {
  title: string;
  dateToInit: Date;
  dateToEnd: Date;
}
export interface IPollEditDto {
  title?: string;
  dateToInit?: Date;
  dateToEnd?: Date;
}
