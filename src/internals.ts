import { CategoryOption, PopupItems } from "@proptypes";

export const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour24: true,
} as const;

export const categoryOptions: CategoryOption[] = [
  { value: "tests", label: "Тесты" },
  {
    value: "words",
    label: "Подстановка слов",
    isDisabled: true,
  },
];

export const categoryNames = [
  {
    title: "Тесты",
    link: "Тесты",
  },
];
