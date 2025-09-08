import { object, string } from 'yup';

const MIN_WORDS = 5;

export const schema = object({
  email: string().email('Invalid email').required('Required'),
  message: string()
    .required('Required')
    .test({
      message: `Must be at least ${MIN_WORDS} words`,
      name: 'words',
      test: (value: string | undefined) =>
        value
          ? value.trim().split(' ').filter(Boolean).length >= MIN_WORDS
          : false,
    }),
  name: string().required('Required'),
}).required();
