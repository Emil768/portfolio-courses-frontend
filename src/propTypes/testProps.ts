import { UserProps } from "./userProps";

export type QuesProps = {
  title: string;
  answers: AnswersProps[];
};

export type AnswersProps = {
  answer: string;
  correct: boolean;
};

export interface TestProps {
  _id: number;
  title: string;
  text: string;
  category: string;
  backgroundImage: string;
  viewsCount: number;
  createdAt?: string;
  ques: QuesProps[];
  user: UserProps;
}
