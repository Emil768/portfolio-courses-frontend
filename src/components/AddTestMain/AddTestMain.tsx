import { useContext } from "react";
import styles from "./AddTestMain.module.scss";

import { TestContext } from "@pages";
import { AddTestContextType, CategoryOption } from "@proptypes";
import Select from "react-select";

import { categoryOptions } from "@internals";

export const AddTestMain = () => {
  const { data, onGetMainProps } = useContext(
    TestContext
  ) as AddTestContextType;

  const isEmpty = Object.values(data.category).every((value) => Boolean(value));

  return (
    <div className={styles.AddTestMain} data-testid="AddTestMain">
      <div className={styles.inputField} data-testid="InputField">
        <label className={styles.inputField__title}>Название теста</label>
        <input
          type="text"
          className={styles.inputField__field}
          placeholder="Введите название"
          onChange={(e) => onGetMainProps({ ...data, title: e.target.value })}
          defaultValue={data.title}
          required
        />
      </div>

      <div className={styles.inputField} data-testid="InputField">
        <label className={styles.inputField__title}>Категория</label>
        <Select
          closeMenuOnSelect={false}
          options={categoryOptions}
          onChange={(option: CategoryOption | null) =>
            onGetMainProps({ ...data, category: option! })
          }
          value={isEmpty ? data.category : null}
          placeholder={"Выберите категорию"}
          required
          isClearable
          isSearchable
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
          defaultValue={data.bgImage}
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
        defaultValue={data.text}
        required
      ></textarea>
    </div>
  );
};
