import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../../Auth';
import { setSelectedTest } from '../../slice/testsSlice';
import { ItemListWrapper } from '../../../../UI';
import { ROLES } from '../../../../utils/constants';
import { defaultGameIcon } from '../../../../assets';
import styles from './GameListItem.module.scss';

// TODO: доделать функционал

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
      case ROLES.administrator.code:
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
      case ROLES.tutor.code:
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
      case ROLES.observed.code:
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
    <ItemListWrapper>
      <div className={styles.info}>
        <img
          src={game.icon === undefined ? defaultGameIcon : game.icon}
          alt="default game icon"
        />
        <div className={styles.gameTextInfo}>
          <h3 className={styles.title}>{game.name}</h3>
          <p className={styles.description}>{game.description}</p>
        </div>
      </div>
      <div className={styles.buttons}>{renderGameButtons(role)}</div>
    </ItemListWrapper>
  );
};

export default GametListItem;
