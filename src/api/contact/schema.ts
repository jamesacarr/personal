import { object, string } from 'yup';

const MIN_WORDS = 5;

const schema = object({
  name: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  message: string()
    .required('Required')
    .test({
      name: 'words',
      message: `Must be at least ${MIN_WORDS} words`,
      test: (value: string | undefined) =>
        value ? value.trim().split(' ').filter(Boolean).length >= MIN_WORDS : false,
    }),
}).required();

export default schema;
