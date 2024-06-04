import * as Yup from 'yup';

export const profileSchema = Yup.object({
  name: Yup.string().trim().required('Обязательное поле'),
  last_name: Yup.string().trim().required('Обязательное поле'),
  email: Yup.string().matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный email'),
});

export const changePasswordSchema = Yup.object({
  old_password: Yup.string().trim().required('Обязательное поле'),
  new_password: Yup.string().trim().required('Обязательное поле'),
});
