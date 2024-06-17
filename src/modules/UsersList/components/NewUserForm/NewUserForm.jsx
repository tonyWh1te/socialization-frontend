import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { useAddUserMutation } from '../../api/usersApiSlice';
import { useLazyGetTutorsQuery } from '../../../../app/api/common/usersApiSlice';
import { useUploadPhoto } from '../../../../hooks';

import NewUserFormStage1 from '../NewUserFormStage1/NewUserFormStage1';
import NewUserFormStage2 from '../NewUserFormStage2/NewUserFormStage2';
import { ROLES } from '../../../../utils/constants';
import { userSchema } from '../../utils/validation.helper';
import { transformRolesToSelectOptions } from '../../utils/data.helper';
import { uploadedFileSchema } from '../../../../utils/helpers';
import styles from './NewUserForm.module.css';

const variants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === 1 ? '-100%' : '100%',
  }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  exit: (direction) => ({
    opacity: 0,
    x: direction === 1 ? '100%' : '-100%',
    transition: { duration: 0.25 },
  }),
};

const NewUserForm = () => {
  const fileRef = useRef(null);
  const [stage, setStage] = useState(1);
  const [addUser] = useAddUserMutation();

  const { preview, onUpload } = useUploadPhoto('photo');

  const [getTutors, { isLoading: isLoadingTutors, isFetching: isFetchingTutors, data: tutors }] =
    useLazyGetTutorsQuery();

  const initialValues = {
    name: '',
    second_name: '',
    patronymic: '',
    photo: '',
    birthday: '',
    email: '',
    role: {
      code: ROLES.tutor.code,
      organization_id: 1,
      tutor_id: '',
    },
    login: '',
    password: '',
  };

  const validationSchema = stage === 1 ? userSchema : uploadedFileSchema(fileRef);

  const selectRoles = transformRolesToSelectOptions(ROLES);

  const onSubmit = async (values, { setSubmitting }) => {
    if (stage === 1) {
      setStage(2);

      setSubmitting(false);
    } else {
      try {
        const res = await addUser(values);
      } catch (error) {
        toast.error(error?.data?.detail || error.message || 'Что-то пошло не так');
      }
    }
  };

  const onGoBack = () => {
    setStage(1);
  };

  const onRoleSelect = async (e) => {
    const { value } = e.target;

    if (value === ROLES.observed.code) {
      await getTutors();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form className={styles.form}>
          <AnimatePresence
            initial={false}
            mode="wait"
          >
            {stage === 1 && (
              <m.div
                className={styles.inner}
                key="stage1"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <NewUserFormStage1
                  selectRoles={selectRoles}
                  onRoleSelect={onRoleSelect}
                  isLoadingTutors={isLoadingTutors || isFetchingTutors}
                  tutors={tutors}
                  formValues={formikProps.values}
                  isSubmitting={formikProps.isSubmitting}
                />
              </m.div>
            )}

            {stage === 2 && (
              <m.div
                className={styles.inner}
                key="stage2"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <NewUserFormStage2
                  formikProps={formikProps}
                  onGoBack={onGoBack}
                  fileRef={fileRef}
                  preview={preview}
                  onUpload={onUpload}
                />
              </m.div>
            )}
          </AnimatePresence>
        </Form>
      )}
    </Formik>
  );
};

export default NewUserForm;
