import { CSSFunc } from '../../types';

export const copyrightStyles: CSSFunc = ({ theme }) => ({
  color: theme.color.neutral600,
  fontSize: '0.8rem',
  margin: 0,
  textTransform: 'uppercase',

  span: {
    color: theme.color.teal400,
  },
});

export const footerStyles: CSSFunc = ({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.color.neutral000,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  height: '5rem',
  justifyContent: 'space-around',
  left: 0,
  position: 'absolute',
  width: '100%',
});
