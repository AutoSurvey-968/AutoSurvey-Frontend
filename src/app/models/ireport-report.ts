export interface IReport {
  
  surveyId: string;
  weekEnum: string;
  batchString: string;
  averages: Map<string, reportData>;
  percentages: Map<string, Map<string, reportData>>;
}
export interface reportData{
  datum: number;
  delta: number
}