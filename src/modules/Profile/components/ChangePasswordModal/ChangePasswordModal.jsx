import { Formik } from 'formik';
import { Modal, ModalLayout } from '../../../../UI';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';
import { changePasswordSchema } from '../../utils/validation.helper';

const ChangePasswordModal = ({ showModal, setShowModal }) => {
  const initialState = {
    old_password: '',
    new_password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={onSubmit}
      validationSchema={changePasswordSchema}
    >
      {({ isSubmitting, handleSubmit, handleReset }) => (
        <Modal
          active={showModal}
          setActive={setShowModal}
          handleClose={handleReset}
        >
          <ModalLayout
            title="Изменить пароль"
            content={
              // eslint-disable-next-line
              <ChangePasswordForm
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
              />
            }
          />
        </Modal>
      )}
    </Formik>
  );
};

export default ChangePasswordModal;
