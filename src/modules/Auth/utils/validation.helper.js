import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const authSchema = Yup.object({
  login: Yup.string().trim().required('Обязательное поле'),
  password: Yup.string().trim().required('Обязательное поле'),
});
