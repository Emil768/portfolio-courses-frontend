export interface UserProps {
  fullName: string;
  email?: string;
  passwordHash?: string;
  avatarUrl: {
    public_id?: string;
    url: string;
  };
}
