import styles from './ButtonAddComponent.module.scss';
import AddFileIcon from '../../../../assets/icons/add-file-icon.svg';

const ButtonAddComponent = ({ onClick, type }) => (
  <button
    className={`group ${styles.button}`}
    onClick={onClick}
    type="button"
  >
    <img
      className={`group-hover:fill-white ${styles.icon}`}
      src={AddFileIcon}
      alt="user"
    />
    {type === 'tests' ? 'Создать тест' : 'Добавить игру'}
  </button>
);

export default ButtonAddComponent;
