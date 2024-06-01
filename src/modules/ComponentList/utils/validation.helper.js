import { object, string } from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const newTestSchema = object({
  title: string()
    .trim()
    .required('Обязательное поле')
    .matches(/^[a-zA-Z\u0400-\u04FF0-9:,.]*$/, 'Только буквы и цифры'),
});
