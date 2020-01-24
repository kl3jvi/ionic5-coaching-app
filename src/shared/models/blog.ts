export interface IBlog {
  id: string;
  type: string;
  title: string;
  content: string;
  images: string[];
  likes: IBlogLike[] | any;
  comments: IBlogComment[] | any;
  is_deleted: boolean;
  bookmarks: string[] | any;
  created_at: Date;
  created_by: string;
  user: any;
  uid: any;
}

export interface IBlogLike {
  uid: string;
  picture: string;
  name: string;
  date: any;
  // $key:any;
}

export interface IBlogComment {
  id?: string;
  uid: string;
  picture: string;
  name: string;
  date: any;
  text: string;
}
