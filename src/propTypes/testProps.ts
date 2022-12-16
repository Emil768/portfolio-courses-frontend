import { UserProps } from "./userProps";

export type ImageUrlProps = { public_id: string; url: string };

export interface QuesProps {
  _id: string;
  title: string;
  imageURL?: ImageUrlProps;
  answers: AnswersProps[];
}

export interface AnswersProps {
  _id: string;
  answer: string;
  correct: boolean;
}

export type CurrentAnswerProps = {
  id: number;
} & AnswersProps;

export interface CommentProps {
  text: string;
  postedBy: UserProps;
  createdAt: string;
  testId: string;
  _id: string;
}

export interface TestProps {
  _id: string;
  title: string;
  text: string;
  category: string;
  backgroundImage: string;
  viewsCount: number;
  createdAt: string;
  ques: QuesProps[];
  user: UserProps;
  likes: [{ likeBy: UserProps; _id: string }];
  comments: CommentProps[];
}

export interface AllUserActionProps {
  allComments: TestProps[];
  allLikes: TestProps[];
  allPublish: TestProps[];
  allScore: TestProps[];
}

export interface AnswerBlockProps extends AnswersProps {
  setAnswer: (index: number) => void;
  keyIndex: number;
}

//Add test props

export type AnswerLessProps = Omit<AnswersProps, "_id">;

export interface QuesLessProps {
  title: string;
  imageURL?: ImageUrlProps;
  answers: AnswerLessProps[];
}

export type MainAddTestProps = {
  title: string;
  category: string;
  text: string;
  bgImage: string;
  questions: QuesLessProps[];
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
