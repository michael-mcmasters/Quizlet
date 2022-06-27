import BooleanQuestion from "./BooleanQuestion";
import MultiQuestion from "./MultiQuestion";
import CheckboxQuestions from "./CheckboxQuestion";

export default interface Questions {
  multiQuestions: MultiQuestion[];
  booleanQuestions: BooleanQuestion[];
  checkboxQuestions: CheckboxQuestions[];
}