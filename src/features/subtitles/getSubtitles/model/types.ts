export interface IGetSubtitleRequest {
  videoId: string;
}

export interface IGetSubtitleResponse {
  title: string;
  videoId: string;
  subtitleList: ISubtitle[];
  _id: string;
  createdAt: string;
  __v: number;
}

export interface ISubtitle {
  text: string;
  start: number;
  end: number;
  _id: string;
}
