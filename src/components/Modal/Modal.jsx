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
        {children}
      </div>
      {/* eslint-enable */}
    </div>
  );
};

export default Modal;
