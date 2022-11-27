export interface PopupProps {
  items: PopupItems[];
  active: Boolean;
}

export type PopupItems = {
  name: String;
  link: String;
  onClickPopup?: () => void;
};
