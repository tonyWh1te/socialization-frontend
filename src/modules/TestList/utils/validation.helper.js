import { object, string } from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const newTestSchema = object({
  title: string().trim().required('Обязательное поле'),
});
