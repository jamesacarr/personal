import { object, string } from 'yup';

const schema = object().shape({
  name: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  message: string().required('Required'),
});

export default schema;
