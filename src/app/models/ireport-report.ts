export interface IReport {
  
  surveyId: string;
  weekEnum: string;
  batchString: string;
  averages: Map<string, data>;
  percentages: Map<string, Map<string, data>>;
}
interface data{
  datum: number;
  delta: number
}