import { Dimensions } from 'react-native';

export const API_URL = 'http://192.168.1.115:3000';

export const sanitizeFilename = (name: string) => {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[\/\\?%*:|"<>]/g, '-')
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/\|/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
};

export const formatViews = (views: number) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return (views || 0).toString();
};

export const getNumColumns = () => {
  const { width } = Dimensions.get('window');
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 600) return 2;
  return 1;
};