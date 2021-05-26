export interface ISubmission {
  uuid: string;
  batch: string;
  week: string;
  surveyUuid: string;
  responses: Map<string, string>;
}
