import IPoll from "./IPoll";

export default interface IPollReponse {
  id: number;
  title: string;
  vote: number;
  pollId: number;
  poll: IPoll;
}
export interface IPollReponseCreateDto {
  title: string;
}
export interface IPollReponseEditDto {
  id: number;
  title?: string;
  vote?: number;
  pollId?: number;
}
