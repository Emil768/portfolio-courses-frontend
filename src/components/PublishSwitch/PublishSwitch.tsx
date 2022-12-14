import styles from './PublishSwitch.module.scss';

interface PublishSwitchProps { }

export const PublishSwitch = ({ }: PublishSwitchProps) => (
  <div className={styles.PublishSwitch} data-testid="PublishSwitch">
    PublishSwitch Component
  </div>
);
