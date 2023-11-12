import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // this key is using to store data in local storage
  storage: AsyncStorage, // configure which storage will be used to store the data
  converter: JSON, // configure how values will be serialized/deserialized in storage
});

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
  effects_UNSTABLE: [persistAtom],
});

export const SearchUserResult = atom({
  key: "ResultUser",
  default: [],
});

export const FriendList = atom({
  key: "ListeAmi",
  default: [],
});

export const MyPublication = atom({
  key: "MyPublication",
  default: [],
});

export const AllPublications = atom({
  key: "Allpublication",
  default: [],
});
