import * as yup from 'yup';

export const schema = yup.object({
  Name: yup.string().required(),
  Description: yup.string().required(),

});
