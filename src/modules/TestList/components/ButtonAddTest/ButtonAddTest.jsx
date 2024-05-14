import { DocumentPlusIcon } from '@heroicons/react/24/solid';
import styles from './ButtonAddTest.module.css';

const ButtonAddTest = ({ onClick }) => (
  <button
    className={`group ${styles.button}`}
    onClick={onClick}
    type="button"
  >
    <DocumentPlusIcon className={`group-hover:fill-white ${styles.icon}`} />
    Создать тест
  </button>
);

export default ButtonAddTest;
