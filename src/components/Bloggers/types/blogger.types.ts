export enum SocialType {
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  TWITTER = 'twitter',
}

export interface MainBlog {
  socialType: SocialType;
  name: string;
  followers: number;
  link: string;
}
