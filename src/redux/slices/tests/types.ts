import { TestProps } from "../../../propTypes";

export type TestState = {
  tests: TestProps[];
  quiz: TestProps | null;
  status: String;
};
