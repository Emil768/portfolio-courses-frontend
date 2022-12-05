import styles from "./InputField.module.scss";

interface InputFieldProps {
  title: string;
  placeHolder: string;
}

export const InputField = ({ title, placeHolder }: InputFieldProps) => (
  <div className={styles.inputField} data-testid="InputField">
    <label className={styles.inputField__title}>{title}</label>
    <input
      type="text"
      className={styles.inputField__field}
      placeholder={placeHolder}
      required
    />
  </div>
);
