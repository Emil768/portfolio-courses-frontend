import { TestProps } from "@proptypes";

export type QuizProps = {
  quiz: TestProps;
  currentQuesIndex: number;
  score: number;
  showScore: boolean;
  status: "loading" | "loaded" | "error";
};

export type CommentPropsCreate = {
  testId: string;
  text: string;
};

export type CommentPropsEdit = {
  text: string;
  testId: string;
  id: string;
};

export type CommentPropsRemove = {
  testId: string;
  id: string;
};

export type NextQuestionProps = {
  id: number;
  correct: boolean;
};
