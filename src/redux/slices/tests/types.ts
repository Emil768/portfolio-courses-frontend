import { TestProps } from "../../../propTypes";

export type TestState = {
  tests: TestProps[];
  status: "loading" | "loaded" | "error";
};
