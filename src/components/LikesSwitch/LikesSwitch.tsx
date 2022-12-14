import styles from './LikesSwitch.module.scss';

interface LikesSwitchProps { }

export const LikesSwitch = ({ }: LikesSwitchProps) => (
  <div className={styles.LikesSwitch} data-testid="LikesSwitch">
    LikesSwitch Component
  </div>
);
