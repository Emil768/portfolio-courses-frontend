import styles from './CommentSwitch.module.scss';

interface CommentSwitchProps { }

export const CommentSwitch = ({ }: CommentSwitchProps) => (
  <div className={styles.CommentSwitch} data-testid="CommentSwitch">
    CommentSwitch Component
  </div>
);
