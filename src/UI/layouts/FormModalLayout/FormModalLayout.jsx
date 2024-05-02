import styles from './FormModalLayout.module.css';

const FormModalLayout = ({ title, form }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{form}</div>
    </div>
  </div>
);

export default FormModalLayout;
