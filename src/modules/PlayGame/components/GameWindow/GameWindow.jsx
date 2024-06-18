import { useGetGameQuery } from '../../../../app/api/common/gameApiSlice';
import { usePassGameMutation } from '../../api/passGameApiSlice';

import { SpinnerBig, ErrorMessage } from '../../../../UI';

import styles from './GameWindow.module.scss';

const GameWindow = ({ gameId, userId }) => {
  const { data: game, isLoading: isGameLoading, isError: isErrorGetGame } = useGetGameQuery(gameId);

  // const [passGame, { isLoading: isLoadingPassGame }] = usePassGameMutation();

  if (isGameLoading) {
    return <SpinnerBig className="mt-10" />;
  }

  if (isErrorGetGame) {
    return (
      <ErrorMessage
        message="Ошибка загрузки игры"
        className="mt-10"
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.content}
        title="GameWindow"
        src={game.link}
      />
    </div>
  );
};

export default GameWindow;
