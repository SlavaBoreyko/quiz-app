export enum SocialType {
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
}

export interface MainBlog {
  en: string;
  pl: string;
  ua: string;
  or: string;
  soc: string;
  followers: number;
  link: string;
  // socialType: SocialType;
  // name: string;
  // followers: number;
  // link: string;
}
