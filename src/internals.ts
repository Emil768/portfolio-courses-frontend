import { PopupItems } from "@proptypes";

export const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour24: true,
} as const;

export const sortNames: PopupItems[] = [
  { name: "Дате добавления", link: "date" },
  { name: "По лайкам", link: "like" },
  { name: "По дизлайкам", link: "dislike" },
];

export const categoryNames = [
  {
    title: "Тесты",
    link: "Тесты",
  },
];
