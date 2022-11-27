export type AvatarProps = {
  public_id: string;
  url: string;
};

export interface UserProps {
  fullName: string;
  email?: string;
  token?: string;
  password?: string;
  avatarUrl: AvatarProps;
}
