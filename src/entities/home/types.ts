export type Video = {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
};

export interface IModel {
  title: string;
  color: string[];
  img: string;
}

export type Size = 'small' | 'large';
