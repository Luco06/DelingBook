import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const BookListState = atom({
  key: "bookListState",
  default: [],
});

export const BookDetailsState = atom({
  key: "bookDetailsState",
  default: [],
});
