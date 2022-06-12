import BooleanQuestion from "./BooleanQuestion";
import MultiQuestion from "./MultiQuestion";

export default interface Questions {
  multiQuestions: MultiQuestion[];
  booleanQuestions: BooleanQuestion[];
}