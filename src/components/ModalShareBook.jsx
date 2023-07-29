import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import styled from "styled-components";
import { getBookInMyLibrary } from "../../Api/RPC/api";
import {
  User,
  MyLibraryLikeState,
  MyLibraryFinishState,
  MyLibraryReadState,
  MyAuthTokens,
} from "../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../../assets/Img_Presentation/Avatar.svg";
import Cross from "../../assets/Img_Presentation/xmark.svg";
import { SearchBar } from "@rneui/base";
import { updateUser, getMyInfo } from "../../Api/RPC/api";

export default function ModalShareBook({ navigation }) {
  const [modalShareBookVisible, setShareBookVisible] = useState(false);
  const setMyInfo = useSetRecoilState(User);
  const MyInfo = useRecoilValue(User);
  const MyToken = useRecoilValue(MyAuthTokens);
  const token = `Bearer ${MyToken}`;
  const setMyLibraryLike = useSetRecoilState(MyLibraryLikeState);
  const setMyLibraryRead = useSetRecoilState(MyLibraryReadState);
  const setMyLibraryFinsh = useSetRecoilState(MyLibraryFinishState);
  const MyLibraryLike = useRecoilValue(MyLibraryLikeState);
  const MyLibraryFinsh = useRecoilValue(MyLibraryFinishState);
  const MyLibraryRead = useRecoilValue(MyLibraryReadState);
  const [allBook, setAllBook] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [publiImg, setPubliImg] = useState("");
  const [publiTxt, setPubliTxt] = useState("");

  const avatarUserUrl = MyInfo.avatar
    ? MyInfo.avatar.replace(
        "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
        ""
      )
    : null;
  const baseUrl = "http://192.168.0.20:3000"; // L'URL de base de votre serveur
  const avatarUrl = avatarUserUrl ? baseUrl + avatarUserUrl : null;
  const handleImageSelection = (selectImage) => {
    setPubliImg(selectImage);
  };
  const userInfo = () => {
    // setInterval(() => {
    getMyInfo(token)
      .then((res) => {
        setMyInfo(res);
      })
      .catch((error) => {
        console.error("Une erreur est survenue", error);
      });
    // }, 1000);
  };

  const update = () => {
    const formData = new FormData();

    // Create a new publication object with the provided data
    const newPublication = {
      img: publiImg.trim() || undefined,
      txt: publiTxt.trim() || undefined,
      pseudo: MyInfo.pseudo,
      avatar: MyInfo.avatar,
      date: new Date(),
    };

    // Push the new publication to the current publications array
    const currentPublications = [...MyInfo.publications]; // Make a copy of the current publications
    currentPublications.push(newPublication);

    // Create the userUpdate object with the updated publications
    const userUpdate = {
      publications: currentPublications,
    };

    // Append the userUpdate object to the formData
    formData.append("userUpdate", JSON.stringify(userUpdate));

    // Send the updated data to the server
    updateUser(formData, token)
      .then((res) => {
        console.log("InfoUpdate", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMyLikeBook = () => {
    setTimeout(() => {
      getBookInMyLibrary(MyInfo._id, "mesenvies", token)
        .then((res) => {
          setMyLibraryLike(res.books);
          console.log("MyBookLike", MyLibraryLike);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des livres likés :",
            error
          );
        });
    }, 1000);
  };
  const getMyProgressBook = () => {
    setTimeout(() => {
      getBookInMyLibrary(MyInfo._id, "encours", token)
        .then((res) => {
          setMyLibraryRead(res.books);
          console.log("MyBookReadingProgress", MyLibraryRead);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des livres likés :",
            error
          );
        });
    }, 1000);
  };
  const getMyFinishBook = () => {
    setTimeout(() => {
      getBookInMyLibrary(MyInfo._id, "dejalu", token)
        .then((res) => {
          setMyLibraryFinsh(res.books);
          console.log("MyBookFinish", MyLibraryFinsh, "BobyFeeal");
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des livres likés :",
            error
          );
        });
    }, 1000);
  };
  const myAllBook = () => {
    const livresUniques = new Set([
      ...MyLibraryLike,
      ...MyLibraryFinsh,
      ...MyLibraryRead,
      ...allBook,
    ]);
    setAllBook(Array.from(livresUniques));
  };
  const flattenAllBooks = allBook.flat();
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      // Effectuer la recherche en filtrant les livres
      const filteredBooks = flattenAllBooks.filter((book) => {
        const title = book.titre.toLowerCase();
        return title.includes(query.toLowerCase());
      });
      setSearchResults(filteredBooks);
    } else {
      setSearchResults([]);
    }
  };
  const toggleBookModal = () => {
    setShareBookVisible((prevState) => !prevState);
  };
  const sendAndCloseModal = () => {
    setShareBookVisible((prevState) => !prevState);
    update();
    userInfo();
    navigation.navigate("Home");
  };
  const closeModal = () => {
    setShareBookVisible((prevState) => !prevState);
    navigation.navigate("Home");
  };
  useEffect(() => {
    toggleBookModal();
    getMyLikeBook();
    getMyProgressBook();
    getMyFinishBook();
    myAllBook();
  }, []);

  const BookItem = ({ item }) => {
    return (
      <ViewUserSearch key={item._id}>
        <BookImg
          source={{
            uri: `${item.image ?? require("../../assets/ImgNotFound.png")}`,
          }}
        />
        <BntPressable onPress={() => handleImageSelection(item.image)}>
          <ViewTextBook>
            <Text>Titre: {item.titre}</Text>
          </ViewTextBook>
        </BntPressable>
      </ViewUserSearch>
    );
  };
  return (
    <Modal animationType="slide" visible={modalShareBookVisible}>
      <ViewModal>
        <CrossPressable onPress={closeModal}>
          <ViewCross>
            <Cross width={20} height={20} />
          </ViewCross>
        </CrossPressable>

        <ViewSearchBar>
          <Text>Recherche parmis vos livres</Text>
          <SearchBar
            placeholder="Recherche"
            platform={"ios"}
            showCancel
            leftIcon={{ type: "font-awesome", name: "magnifying-glass" }}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </ViewSearchBar>
        <ViewResultSearch>
          <Text style={{ textAlign: "center", fontSize: 20 }}>Vos livres</Text>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item._id}
            renderItem={BookItem}
          />
        </ViewResultSearch>
        <ViewTextShare>
          <TextInput
            style={styles.input}
            placeholder="Quoi de neuf?"
            multiline={true}
            onChangeText={(publiTxt) => setPubliTxt(publiTxt)}
            value={publiTxt}
          />
        </ViewTextShare>
        <Preview>
          <ViewPseudo>
            {avatarUrl ? (
              <ImgPseudo source={{ uri: avatarUrl }} />
            ) : (
              <Avatar style={{ width: 25, height: 25, borderRadius: 100 }} />
            )}

            <Resume>{MyInfo.pseudo}</Resume>
          </ViewPseudo>
          {publiImg ? (
            <ImgPost source={{ uri: publiImg }} />
          ) : (
            <ImgPost source={require("../../assets/ImgNotFound.png")} />
          )}
          <Text>{publiTxt}</Text>
        </Preview>
        <Pressable style={styles.BtnPrez} onPress={sendAndCloseModal}>
          <LinearGradient
            style={{
              borderRadius: 15,
              height: 30,
              width: 120,
            }}
            colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
          >
            <TextBtn>Publier</TextBtn>
          </LinearGradient>
        </Pressable>
      </ViewModal>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: Platform.OS === "android" ? 60 : 60,
  },
  shadow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRightColor: "whitesmoke",
    borderLeftColor: "whitesmoke",
    padding: 10,
  },
  contentContainer: {
    backgroundColor: "#fff",
  },
  input: {
    height: 60,
    margin: 12,
    padding: 10,
    textAlign: "left",
    textAlignVertical: "top",
  },
  BtnPrez: {
    width: 140,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 15,
    marginLeft: 30,
    marginRight: 30,
    margin: 20,
  },
});
const ViewResultSearch = styled.View`
  flex: 1.7;
`;
const ViewTextShare = styled.View`
  justify-content: flex-start;
  border-width: 0.3px;
  border-radius: 10px;
  margin: 10px;
`;

const TextBtn = styled.Text`
  text-align: center;
  font-weight: bold;
  margin: 5px;
`;

const BookImg = styled.Image`
  height: 130px;
  width: 80px;
  border-width: 1px;
  border-color: #efeff3;
  border-radius: 10px;
`;

const ViewUserSearch = styled.View`
  padding: 5px;
  display: flex;
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const ViewTextBook = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
`;

const Preview = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-width: 0.2px;
`;

const ViewPseudo = styled.View`
  display: flex;
  flex-direction: row;
  width: 25%;
  justify-content: space-around;
  align-items: center;
  padding: 2px;
`;
const ImgPseudo = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 100px;
`;
const Resume = styled.Text`
  font-size: 13px;
  font-weight: bold;
`;
const ImgPost = styled.Image`
  height: 90px;
  width: 60px;
  margin: 5px;
  align-self: center;
`;

const BntPressable = styled.Pressable`
  width: 65%;
`;

const ViewModal = styled.View`
  display: flex;
  background-color: white;
  flex: 1;
  padding: 5px;
  border-radius: 10px;
`;
const ViewSearchBar = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.7;
  margin: auto;
  border-bottom-width: 0.5px;
`;

const ViewCross = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  width: 90%;
  display: flex;
  float: right;
`;

const CrossPressable = styled.Pressable`
  flex: 0.2;
  margin: 5px;
`;
