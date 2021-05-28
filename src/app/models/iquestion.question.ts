export interface IQuestion {
  questionType: string;
  title: string;
  helptText: String;
  isrequired: boolean;
  choices: string[];
  hasotherOption: boolean;
}
