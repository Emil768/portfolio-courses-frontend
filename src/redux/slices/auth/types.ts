import { UserProps } from "@proptypes";

export type AuthState = {
  data: UserProps | null;
  status: "loading" | "loaded" | "error";
};
