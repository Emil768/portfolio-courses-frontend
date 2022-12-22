import { useContext, useRef } from "react";
import styles from "./AddTestMain.module.scss";

import { TestContext } from "@pages";
import { AddTestContextType, CategoryOption } from "@proptypes";
import Select from "react-select";

import { categoryOptions } from "@internals";
import axios from "@axios";

export const AddTestMain = () => {
  const { data, onGetMainProps } = useContext(
    TestContext
  ) as AddTestContextType;

  const isEmpty = Object.values(data.category).every((value) => Boolean(value));

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files;
      const formData = new FormData();
      formData.append("picture", file![0]);

      const newAvatarUrl = await axios.post("/uploads", formData);
      const { secure_url, public_id } = newAvatarUrl.data;

      onGetMainProps({
        ...data,
        bgImage: { public_id, url: secure_url },
      });
    } catch (err) {
      console.log(err);
      window.alert("Не удалось загрузить картинку");
    }
  };

  const onClickInput = () => {
    inputFileRef.current!.click();
  };

  console.log(data);

  return (
    <div className={styles.AddTestMain} data-testid="AddTestMain">
      <div className={styles.inputField__imageBlock}>
        <button
          className={styles.inputField__button}
          type="button"
          onClick={onClickInput}
        >
          Выберите изображение
        </button>
        <input
          type="file"
          name="picture"
          ref={inputFileRef}
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={onUploadImage}
          className={[styles.inputField__field, styles.inputField__file].join(
            " "
          )}
          placeholder="Изображение"
          required={data.bgImage.url ? false : true}
        />

        {data.bgImage.url && (
          <img
            className={styles.inputField__image}
            src={`${data.bgImage.url}`}
            alt="preview field"
          />
        )}
      </div>
      <div className={styles.inputField}>
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

      <div className={styles.inputField}>
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
