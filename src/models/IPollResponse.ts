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
  vote: number;
  pollId: number;
}
export interface IPollReponseEditDto {
  title?: string;
  vote?: number;
  pollId?: number;
}
