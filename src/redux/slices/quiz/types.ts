import { TestProps } from "@proptypes";

export type QuizProps = {
  quiz: TestProps | null;
  currentQuesIndex: number;
  score: number;
  showScore: boolean;
  status: "loading" | "loaded" | "error";
};

export type NextQuestionProps = {
  id: number;
  correct: boolean;
};
