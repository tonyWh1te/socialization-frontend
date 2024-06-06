import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../../Auth';
import { setSelectedTest } from '../../slice/testsSlice';
import { ROLES } from '../../../../utils/constants';
import { defaultGameIcon } from '../../../../assets';
import styles from './GameListItem.module.scss';

// TODO: доделать верстку и функционал

const GametListItem = ({ game, toggleModal }) => {
  const { role } = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const onSelectGame = (id) => () => {
    dispatch(setSelectedTest(id));
    toggleModal();
  };

  const onArchive = (id) => async () => {
    // TODO: реализовать перемещение игры в архив, полное удаление возможно только оттуда
  };

  const renderGameButtons = (userRole) => {
    switch (userRole) {
      case ROLES.Admin:
        return (
          <>
            <Link
              className={styles.button}
              to={`/games/${game.id}/play`}
            >
              Запустить
            </Link>
            <button
              className={styles.button}
              type="button"
              onClick={onSelectGame(game.id)}
            >
              Назначить
            </button>
            <button
              className={styles.button}
              type="button"
              onClick={onArchive(game.id)}
            >
              В архив
            </button>
          </>
        );
      case ROLES.Tutor:
        return (
          <>
            <Link
              className={styles.button}
              to={`/games/${game.id}/play`}
            >
              Запустить
            </Link>
            <button
              className={styles.button}
              type="button"
              onClick={onSelectGame(game.id)}
            >
              Назначить
            </button>
          </>
        );
      case ROLES.Observed:
        return (
          <Link
            className={styles.button}
            to={`/games/${game.id}/play`}
          >
            Запустить
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <img
            src={game.icon === undefined ? defaultGameIcon : game.icon}
            alt="default game icon"
          />
          <div className={styles.gameTextInfo}>
            <h3 className={styles.title}>{game.title}</h3>
            <p className={styles.description}>{game.description}</p>
          </div>
        </div>
        <div className={styles.buttons}>{renderGameButtons(role)}</div>
      </div>
    </div>
  );
};

export default GametListItem;
