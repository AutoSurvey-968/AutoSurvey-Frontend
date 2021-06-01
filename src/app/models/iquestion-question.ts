export interface IQuestion {
  questionType: string;
  title: string;
  helpText: string;
  isRequired: boolean;
  choices: string[];
  hasOtherOption: boolean;
}
