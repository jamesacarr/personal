import { Theme } from '../../types';

const theme: Theme = {
  breakpoint: {
    // Smartphones, portrait iPhone, portrait 480x320 phones (Android)
    xxsmall: '@media (min-width:320px)',

    // Smartphones, Android phones, landscape iPhone
    xsmall: '@media (min-width:480px)',

    // Portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android)
    small: '@media (min-width:600px)',

    // Tablet, landscape iPad, lo-res laptops ands desktops
    medium: '@media (min-width:801px)',

    // Big landscape tablets, laptops, and desktops
    large: '@media (min-width:1025px)',

    // Hi-res laptops and desktops
    xlarge: '@media (min-width:1281px)',
  },

  color: {
    primary000: '#035388',
    primary100: '#0B69A3',
    primary200: '#127FBF',
    primary300: '#1992D4',
    primary400: '#2BB0ED',
    primary500: '#40C3F7',
    primary600: '#5ED0FA',
    primary700: '#81DEFD',
    primary800: '#B3ECFF',
    primary900: '#E3F8FF',

    neutral000: '#1F2933',
    neutral100: '#323F4B',
    neutral200: '#3E4C59',
    neutral300: '#52606D',
    neutral400: '#616E7C',
    neutral500: '#7B8794',
    neutral600: '#9AA5B1',
    neutral700: '#CBD2D9',
    neutral800: '#E4E7EB',
    neutral900: '#F5F7FA',

    pink000: '#620042',
    pink100: '#870557',
    pink200: '#A30664',
    pink300: '#BC0A6F',
    pink400: '#DA127D',
    pink500: '#E8368F',
    pink600: '#F364A2',
    pink700: '#FF8CBA',
    pink800: '#FFB8D2',
    pink900: '#FFE3EC',

    red000: '#610316',
    red100: '#8A041A',
    red200: '#AB091E',
    red300: '#CF1124',
    red400: '#E12D39',
    red500: '#EF4E4E',
    red600: '#F86A6A',
    red700: '#FF9B9B',
    red800: '#FFBDBD',
    red900: '#FFE3E3',

    yellow000: '#8D2B0B',
    yellow100: '#B44D12',
    yellow200: '#CB6E17',
    yellow300: '#DE911D',
    yellow400: '#F0B429',
    yellow500: '#F7C948',
    yellow600: '#FADB5F',
    yellow700: '#FCE588',
    yellow800: '#FFF3C4',
    yellow900: '#FFFBEA',

    teal000: '#014D40',
    teal100: '#0C6B58',
    teal200: '#147D64',
    teal300: '#199473',
    teal400: '#27AB83',
    teal500: '#3EBD93',
    teal600: '#65D6AD',
    teal700: '#8EEDC7',
    teal800: '#C6F7E2',
    teal900: '#EFFCF6',
  },

  font: {
    family: "'Raleway', sans-serif",
  },
};

export default theme;
