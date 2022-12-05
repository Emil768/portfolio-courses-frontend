import { useState, useContext } from "react";
import { InputField } from "@components";
import styles from "./AddTestMain.module.scss";

import { TestContext } from "@pages";
import { AddTestContextType } from "@proptypes";

interface AddTestMainProps {}

export const AddTestMain = ({}: AddTestMainProps) => {
  const { data, onGetMainProps } = useContext(
    TestContext
  ) as AddTestContextType;

  return (
    <div className={styles.AddTestMain} data-testid="AddTestMain">
      <div className={styles.inputField} data-testid="InputField">
        <label className={styles.inputField__title}>Название теста</label>
        <input
          type="text"
          className={styles.inputField__field}
          placeholder="Введите название"
          onChange={(e) => onGetMainProps({ ...data, title: e.target.value })}
          required
        />
      </div>

      <div className={styles.inputField} data-testid="InputField">
        <label className={styles.inputField__title}>Категория</label>
        <input
          type="text"
          className={styles.inputField__field}
          placeholder="Введите категорию"
          onChange={(e) =>
            onGetMainProps({ ...data, category: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.inputField} data-testid="InputField">
        <label className={styles.inputField__title}>
          Ссылка на изображение
        </label>
        <input
          type="text"
          className={styles.inputField__field}
          placeholder="Введите ссылку"
          onChange={(e) => onGetMainProps({ ...data, bgImage: e.target.value })}
          required
        />
      </div>

      <textarea
        className={styles.addNote__text}
        onChange={(e) => onGetMainProps({ ...data, text: e.target.value })}
        placeholder="Описание"
        name="message"
        cols={30}
        rows={3}
        required
      ></textarea>
    </div>
  );
};
