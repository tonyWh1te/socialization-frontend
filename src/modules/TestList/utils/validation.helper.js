import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const newTestSchema = Yup.object({
  title: Yup.string().trim().required('Обязательное поле'),
});
