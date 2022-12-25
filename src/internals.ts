import { CategoryOption } from "@proptypes";

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
    value: "offers",
    label: "Тесты / Предложения",
    // isDisabled: true,
  },
];

export const categoryNames = [
  {
    title: "Тесты",
    link: "tests",
  },
];
