import { useDeleteTestMutation } from '../../api/testApiSlice';
import styles from './TestListItem.module.css';

const TestListItem = ({ test }) => {
  const [deleteTest, { isLoading: isDeleting }] = useDeleteTestMutation();

  const onDelete = (id) => () => {
    deleteTest(id);
  };

  const deleteBtnText = isDeleting ? 'Удаление...' : 'Удалить';

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{test.title}</h3>
          <p className={styles.description}>{test.description}</p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
          >
            Редактировать
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={onDelete(test.id)}
          >
            {deleteBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestListItem;
