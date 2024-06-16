import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useAddUserMutation } from '../../api/usersApiSlice';

import NewUserFormStage1 from '../NewUserFormStage1/NewUserFormStage1';
import NewUserFormStage2 from '../NewUserFormStage2/NewUserFormStage2';
import { ROLES } from '../../../../utils/constants';
import { userSchema } from '../../utils/validation.helper';
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
  const [stage, setStage] = useState(1);
  const [addUser] = useAddUserMutation();

  const initialValues = {
    name: '',
    second_name: '',
    patronymic: '',
    photo: null,
    dob: '',
    email: '',
    role: ROLES.tutor.code,
    tutor: 'tutor1',
    login: '',
    password: '',
  };

  const selectRoles = Object.keys(ROLES).reduce((acc, role) => {
    if (ROLES[role].code !== ROLES.administrator.code) {
      return [
        ...acc,
        {
          value: ROLES[role].code,
          label: ROLES[role].label,
        },
      ];
    }

    return acc;
  }, []);

  const selectTutor = [
    {
      value: 'tutor1',
      label: 'Сидорчук Сергей',
    },
    {
      value: 'tutor2',
      label: 'Антонов Антон',
    },
  ];

  const onSubmit = (values, { setSubmitting }) => {
    if (stage === 1) {
      setStage(2);

      setSubmitting(false);
    } else {
      console.log('values', values);
    }
  };

  const onGoBack = () => {
    setStage(1);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema}
    >
      {({ isSubmitting, values }) => (
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
                  formValues={values}
                  selectTutor={selectTutor}
                  isSubmitting={isSubmitting}
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
                  isSubmitting={isSubmitting}
                  onGoBack={onGoBack}
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
