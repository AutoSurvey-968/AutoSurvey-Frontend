export interface ISubmission {
  uuid: string;
  batch: string;
  date: string;
  surveyUuid: string;
  responses: Map<string, string>;
}
