import { XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import styles from './Modal.module.css';

const Modal = ({ children, active, setActive }) => {
  const onClose = () => {
    setActive(false);
  };

  const onClickContent = (event) => {
    event.stopPropagation();
  };

  const modalClasses = clsx(styles.modal, {
    [styles.modalActive]: active,
  });

  return (
    <div
      className={modalClasses}
      onClick={onClose}
      role="presentation"
    >
      {/* eslint-disable */}
      <div
        className={styles.content}
        onClick={onClickContent}
      >
        <button
          type="button"
          onClick={onClose}
        >
          <XMarkIcon className={styles.closeIcon} />
        </button>
        {children}
      </div>
      {/* eslint-enable */}
    </div>
  );
};

export default Modal;
