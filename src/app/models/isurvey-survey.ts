import { IQuestion } from "./iquestion.question";

export interface ISurvey {
  uuid: string;
  createdOn: string;
  title: string;
  description: string;
  confirmation: string;
  version: string;
  questions: IQuestion[];
}
