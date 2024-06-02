import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const profileSchema = Yup.object({
  name: Yup.string().trim().required('Обязательное поле'),
  last_name: Yup.string().trim().required('Обязательное поле'),
  email: Yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный email'),
});
