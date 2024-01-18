// @mui
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

interface IBgBlur {
  color?: string;
  blur?: number;
  opacity?: number;
  imgUrl?: string;
}

export function bgBlur({
  color = '#000000',
  blur = 6,
  opacity = 0.8,
  imgUrl,
}: IBgBlur) {
  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

// ----------------------------------------------------------------------

interface IBgGradient {
  direction?: string;
  startColor?: string;
  endColor?: string;
  imgUrl?: string;
  color?: string;
}

export function bgGradient({
  direction = 'to bottom',
  startColor,
  endColor,
  imgUrl,
  color,
}: IBgGradient) {

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${endColor || color}), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

// ----------------------------------------------------------------------

export function textGradient(value: string | number) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
}

// ----------------------------------------------------------------------

export function filterStyles(value: string) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  };
}

// ----------------------------------------------------------------------

export const hideScrollbarY = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

// ----------------------------------------------------------------------

export const hideScrollbarX = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowX: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};