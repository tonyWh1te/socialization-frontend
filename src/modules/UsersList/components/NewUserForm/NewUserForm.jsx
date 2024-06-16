import { Formik } from 'formik';
import { useAddUserMutation } from '../../api/usersApiSlice';
import NewUserFormLayout from '../NewUserFormLayout/NewUserFormLayout';
import { ROLES } from '../../../../utils/constants';
import { userSchema } from '../../utils/validation.helper';

const NewUserForm = () => {
  const [addUser] = useAddUserMutation();

  const initialValues = {
    name: '',
    second_name: '',
    patronymic: '',
    photo: '',
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

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={userSchema}
    >
      {({ isSubmitting, handleSubmit, handleReset, values }) => (
        <NewUserFormLayout
          selectTutor={selectTutor}
          selectRoles={selectRoles}
          formValues={values}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      )}
    </Formik>
  );
};

export default NewUserForm;
