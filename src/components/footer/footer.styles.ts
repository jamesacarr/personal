import { CSSFunc } from '../../types';

export const copyrightStyles: CSSFunc = ({ theme }) => ({
  color: theme.color.neutral600,
  fontSize: '0.8rem',
  margin: 0,
  textTransform: 'uppercase',

  span: {
    color: theme.color.yellow500,
  },
});

export const footerStyles: CSSFunc = ({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.color.neutral000,
  display: 'flex',
  flexDirection: 'column',
  height: '5rem',
  justifyContent: 'space-around',
  marginTop: theme.spacing.large,
  width: '100%',
});
