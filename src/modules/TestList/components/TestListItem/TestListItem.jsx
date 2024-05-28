import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { setSelectedTest } from '../../slice/testsSlice';
import { useDeleteTestMutation } from '../../api/testApiSlice';
import { convertDate } from '../../../../utils/helpers';
import styles from './TestListItem.module.css';

const TestListItem = ({ test, toggleModal }) => {
  const [deleteTest] = useDeleteTestMutation();

  const dispatch = useDispatch();

  const onSelectTest = (id) => () => {
    dispatch(setSelectedTest(id));
    toggleModal();
  };

  const onDelete = (id) => async () => {
    const toastId = toast.loading('Удаление теста...');

    try {
      await deleteTest(id).unwrap();

      toast.update(toastId, {
        render: 'Тест удален',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: 'Произошла ошибка при удалении теста',
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

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
            onClick={onSelectTest(test.id)}
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
            className={styles.close}
            type="button"
            aria-label="Удалить тест"
            onClick={onDelete(test.id)}
          >
            <XCircleIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestListItem;
