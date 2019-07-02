import { CSSFunc } from '../../types';

export const wrapperStyles: CSSFunc = ({ theme }) => ({
  background: theme.color.neutral100,
  border: `1px solid ${theme.color.neutral600}`,
  borderRadius: '4px',
  color: theme.color.neutral600,
  display: 'inline-block',
  margin: '0.3rem',
  padding: '0.3rem',
  transition: 'all .5s',

  svg: {
    verticalAlign: 'sub',
  },

  '&:hover': {
    backgroundColor: theme.color.primary500,
    borderColor: theme.color.primary500,
    color: theme.color.neutral900,
    cursor: 'pointer',
  },
});
