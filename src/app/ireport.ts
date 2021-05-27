export interface IReport {
  surveyId: string;
  weekEnum: string;
  batchString: string;
  averages: Map<string, number>;
  percentages: Map<string, Map<string, data>>;
}
interface data{
  datum: number;
  delta: number
}