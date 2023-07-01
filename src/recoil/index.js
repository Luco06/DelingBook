import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

//La liste des livres après la recheche
export const BookListState = atom({
  key: "bookListState",
  default: [],
});

//Les détails du livres
export const BookDetailsState = atom({
  key: "bookDetailsState",
  default: [],
});

//My LibraryLike
export const MyLibraryLikeState = atom({
  key: "MyLibraryLike",
  default: [],
});

//My LibraryRead
export const MyLibraryReadState = atom({
  key: "MyLibraryRead",
  default: [],
});

//My LibraryFinish
export const MyLibraryFinishState = atom({
  key: "MyLibraryFinish",
  default: [],
});

export const MyAuthTokens = atom({
  key: "MyAuthTokens",
  default: [],
});

export const PreToken = atom({
  key: "PreToken",
  default: [],
});

export const MyId = atom({
  key: "MyId",
  default: [],
});

export const User = atom({
  key: "User",
  default: [],
});

export const SearchUserResult = atom({
  key: "ResultUser",
  default: [],
});
