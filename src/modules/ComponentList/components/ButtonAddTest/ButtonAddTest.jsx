import styles from './ButtonAddTest.module.scss';
import AddFileIcon from '../../../../assets/icons/add-file-icon.svg';

const ButtonAddTest = ({ onClick }) => (
  <button
    className={`group ${styles.button}`}
    onClick={onClick}
    type="button"
  >
    {/* <DocumentPlusIcon className={`group-hover:fill-white ${styles.icon}`} /> */}
    <img
      className={`group-hover:fill-white ${styles.icon}`}
      src={AddFileIcon}
      alt="user"
    />
    Создать тест
  </button>
);

export default ButtonAddTest;
