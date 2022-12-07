import { UserProps } from "./userProps";

export type QuesProps = {
  title: string;
  answers: AnswersProps[];
};

export type AnswersProps = {
  answer: string;
  correct: boolean;
};

export type CurrentAnswerProps = {
  id: number;
} & AnswersProps;

export interface TestProps {
  _id: string;
  title: string;
  text: string;
  category: string;
  backgroundImage: string;
  viewsCount: number;
  createdAt?: string;
  ques: QuesProps[];
  user: UserProps;
}

export type MainAddTestProps = {
  title: string;
  category: string;
  text: string;
  bgImage: string;
  questions: QuesProps[];
};

export type AddTestContextType = {
  data: MainAddTestProps;
  onGetMainProps: ({
    title,
    category,
    text,
    bgImage,
  }: MainAddTestProps) => void;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
};
