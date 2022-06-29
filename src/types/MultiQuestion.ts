export default interface MultiQuestion {
  uuid: string;
  question: string;
  answer: string;
  wrongAnswers: string[];
  tags: string[];
}