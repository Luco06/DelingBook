import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Platform,
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import styled from "styled-components";
import Footer from "./Footer";
import Story from "../../../Api/Mock/Story";
import BoxPost from "../../components/BoxPost";
import { getMyInfo, getBookInMyLibrary } from "../../../Api/RPC/api";
import {
  MyAuthTokens,
  User,
  MyLibraryLikeState,
  MyLibraryFinishState,
  MyLibraryReadState,
} from "../../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FloatingAction } from "react-native-floating-action";
import Modal from "react-native-modal";
import { SearchBar } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../../../assets/Img_Presentation/Avatar.svg";

export default function Home({ navigation }) {
  const [modalShareBookVisible, setShareBookVisible] = useState(false);
  const [modalShareMessageVisible, setModalShareMessageVisible] =
    useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

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
  const [publication, setPublication] = useState({
    img: "",
    text: "",
  });
  const userInfo = () => {
    getMyInfo(token)
      .then((res) => {
        setMyInfo(res);
      })
      .catch((error) => {
        console.error("Une erreur est survenue", error);
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
  useEffect(() => {
    userInfo();
    getMyLikeBook();
    getMyProgressBook();
    getMyFinishBook();
  }, []);
  const Item = ({ item }) => (
    <BoxStory key={item.id}>
      <ImgStory source={item.img} />
      <TextStroy>{item.pseudo}</TextStroy>
    </BoxStory>
  );
  const actions = [
    {
      text: "Publier un livre",
      icon: require("../../../assets/Img_Presentation/text.book.closed.png"),
      name: "bt_sharebook",
      position: 1,
      color: "#454545",
    },
    {
      text: "Publier un message",
      icon: require("../../../assets/Img_Presentation/ellipsis.bubble.png"),
      name: "bt_sharemessage",
      position: 2,
      color: "#454545",
    },
  ];
  const handleActionPress = (name) => {
    switch (name) {
      case "bt_sharebook":
        toggleBookModal(); // Ouvre la modal de partage de livre
        break;
      case "bt_sharemessage":
        toggleMessageModal(); // Ouvre la modal de partage de message
        break;
      default:
        break;
    }
    myAllBook();
  };

  const toggleBookModal = () => {
    setShareBookVisible((prevState) => !prevState);
  };

  const toggleMessageModal = () => {
    setModalShareMessageVisible((prevState) => !prevState);
  };
  function ModalShareBook() {
    const avatarUserUrl = MyInfo.avatar
      ? MyInfo.avatar.replace(
          "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
          ""
        )
      : null;
    const baseUrl = "http://192.168.0.20:3000"; // L'URL de base de votre serveur
    const avatarUrl = avatarUserUrl ? baseUrl + avatarUserUrl : null;

    return (
      <Modal isVisible={modalShareBookVisible}>
        <ViewModal>
          <ViewResultSearch>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Vos livres
            </Text>
            <FlatList
              data={flattenAllBooks}
              keyExtractor={BookItem.index}
              renderItem={BookItem}
            />
          </ViewResultSearch>
          <ViewTextShare>
            <TextInput
              style={styles.input}
              placeholder="Quoi de neuf?"
              multiline={true}
              onChangeText={(text) => setPublication(...publication, text)}
              value={publication.text}
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
            <Text>{publication.text}</Text>
          </Preview>
          <Pressable style={styles.BtnPrez} onPress={toggleBookModal}>
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
  function ModalShareMessage() {
    return (
      <Modal isVisible={modalShareMessageVisible}>
        <View style={{ flex: 1 }}>
          <Text>ModalShareMessage</Text>
          <Button title="fermer la modal" onPress={toggleMessageModal} />
        </View>
      </Modal>
    );
  }
  const BookItem = ({ item }) => {
    return (
      <ViewUserSearch key={item._id}>
        <BookImg
          source={{
            uri: `${item.image ?? require("../../../assets/ImgNotFound.png")}`,
          }}
        />
        <ViewTextBook>
          <Text>Titre: {item.titre}</Text>
        </ViewTextBook>
      </ViewUserSearch>
    );
  };
  return (
    <View style={styles.container}>
      <ViewTitle>
        <TitleHomePage>DelingBook</TitleHomePage>
      </ViewTitle>
      <ViewStory>
        <FlatList
          data={Story}
          horizontal={true}
          keyExtractor={Item.id}
          renderItem={Item}
        />
      </ViewStory>
      <View style={{ flex: 3.5 }}>
        <ScrollView style={styles.contentContainer}>
          <BoxPost />
        </ScrollView>
        <FloatingAction
          actions={actions}
          onPressItem={handleActionPress}
          overlayColor="rgba(255, 255, 255, 0.4)"
          color="#454545"
        />
      </View>

      <Footer />
      <ModalShareBook />
      <ModalShareMessage />
    </View>
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
const ViewTitle = styled.View`
  display: flex;
  justify-content: flex-start;
  width: 90%;
`;
const TitleHomePage = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const BoxStory = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ViewStory = styled.View`
  flex: 0.5;
`;
const ImgStory = styled.Image`
  margin: 15px;
  margin-top: 10px;
  width: 50px;
  height: 50px;
`;
const TextStroy = styled.Text`
  font-size: 10px;
  font-weight: 600;
`;

const ViewModal = styled.View`
  display: flex;
  background-color: white;
  flex: 1;
  padding: 5px;
  border-radius: 10px;
`;

const ViewResultSearch = styled.View`
  flex: 2;
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
  height: 130px;
  width: 90px;
  margin: 5px;
  align-self: center;
`;
