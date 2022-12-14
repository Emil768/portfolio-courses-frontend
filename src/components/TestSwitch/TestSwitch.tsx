import styles from "./TestSwitch.module.scss";

interface TestSwitchProps {}

export const TestSwitch = ({}: TestSwitchProps) => (
  <div className={styles.user__info}>
    <div className={styles.user__infoBlock}>
      {/* <img
      className={styles.user__infoImage}
      src={user?.avatarUrl.url}
      alt="avatar"
    /> */}
      <div className={styles.user__infoText}>
        {/* {user?.fullName} прошел тест{" "}
      <Link to={"/tests"}>
        <b>такой то тест</b> {user?.fullName}
      </Link>{" "}
      на 20% */}
      </div>
    </div>
    <div className={styles.user__infoBlock}>
      {/* <img
      className={styles.user__infoImage}
      src={user?.avatarUrl.url}
      alt="avatar"
    /> */}
      <div className={styles.user__infoText}>
        {/* {user?.fullName} прошел тест{" "}
      <Link to={"/tests"}>
        <b>такой то тест</b> {user?.fullName}
      </Link>{" "} */}
        на 20% на 20% на 20% на 20% на 20% на 20% на 20% на 20% на 20% на 20% на
        20% на 20% на 20% на 20% на 20% на 20% на 20%
      </div>
    </div>
  </div>
);
