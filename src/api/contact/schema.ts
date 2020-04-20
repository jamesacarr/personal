import { object, string } from 'yup';

const MIN_WORDS = 5;

const schema = object().shape({
  name: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  message: string()
    .required('Required')
    .test({
      name: 'words',
      message: `must be at least ${MIN_WORDS} words`,
      test: (value: string | undefined) => (value ? value.trim().split(' ').filter(Boolean).length >= 5 : false),
    }),
});

export default schema;
