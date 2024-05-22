import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteTestMutation } from '../../api/testApiSlice';
import { convertDate } from '../../../../utils/helpers';
import styles from './TestListItem.module.css';

const TestListItem = ({ test, toggleModal }) => {
  const [deleteTest, { isLoading: isDeleting }] = useDeleteTestMutation();

  const onDelete = (id) => async () => {
    try {
      await deleteTest(id).unwrap();
    } catch (error) {
      toast.error('Произошла ошибка при удалении теста');
    }
  };

  const deleteBtnText = isDeleting ? 'Удаление...' : 'Удалить';

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{`${test.title} (${convertDate(test.created_at)})`}</h3>
          <p className={styles.description}>{test.description}</p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            type="button"
            onClick={toggleModal}
          >
            Назначить
          </button>
          <Link
            className={styles.button}
            to={`/tests/${test.id}/edit`}
          >
            Редактировать
          </Link>
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
