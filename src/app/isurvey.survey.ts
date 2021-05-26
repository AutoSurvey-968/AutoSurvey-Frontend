import { IQuestion } from "./iquestion";

export interface ISurvey {
  uuid: string;
  createdOn: string;
  title: string;
  description: string;
  confirmation: string;
  version: string;
  questions: IQuestion[];
}
