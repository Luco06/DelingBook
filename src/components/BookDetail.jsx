import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";
import styled from "styled-components/native";
import ArrowReturn from "../../assets/Img_Presentation/Shape.svg";
import Avatar from "../../assets/Img_Presentation/Avatar.svg";
import Footer from "../Pages/App_Pages/Footer";
import Share from "../../assets/Img_Presentation/Share.svg";
import LikeLibrary from "../../assets/like_library.svg";
import ReadIcon from "../../assets/Readicon.svg";
import FinishIcon from "../../assets/FinishIconBook.svg";
import Rate from "../../assets/star_rate.svg";
import { useNavigation } from "@react-navigation/native";
import {
  BookDetailsState,
  MyLibraryLikeState,
  MyLibraryReadState,
  MyLibraryFinishState,
  MyId,
  MyAuthTokens,
  User,
} from "../recoil";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { addBook } from "../../Api/RPC/api";

export default function BookDetail({ navigation: { goBack } }) {
  const navigation = useNavigation();
  const bookDetails = useRecoilValue(BookDetailsState);
  const setMyLibraryLike = useSetRecoilState(MyLibraryLikeState);
  const setMyLibraryRead = useSetRecoilState(MyLibraryReadState);
  const setMyLibraryFinsh = useSetRecoilState(MyLibraryFinishState);
  const MyLibraryLike = useRecoilValue(MyLibraryLikeState);
  const MyLibraryFinsh = useRecoilValue(MyLibraryFinishState);
  const MyLibraryRead = useRecoilValue(MyLibraryReadState);
  const MyUserId = useRecoilValue(MyId);
  const MyTokens = useRecoilValue(MyAuthTokens);
  const ClearLikeList = useResetRecoilState(MyLibraryLikeState);
  const ClearReadList = useResetRecoilState(MyLibraryReadState);
  const ClearFinish = useResetRecoilState(MyLibraryFinishState);
  const MyInfo = useRecoilValue(User);
  const date = Date.parse(bookDetails.publishedDate);
  const dateConvert = new Date(date);
  const dateString =
    dateConvert.getDate() +
    "/" +
    (dateConvert.getMonth() + 1) +
    "/" +
    dateConvert.getFullYear();
  const token = `Bearer ${MyTokens}`;

  const addBookInDbEncours = () => {
    const bookDetailEnCours = {
      tag: "encours",
      titre: bookDetails.title,
      note:
        bookDetails.averageRating !== undefined
          ? bookDetails.averageRating
          : "néant",
      auteur: {
        auteur1: bookDetails.authors[0],
        auteur2: bookDetails.authors[1],
      },
      genre: bookDetails.categories ? bookDetails.categories.join() : "néant",
      pages: bookDetails.pageCount,
      date: dateString,
      description: bookDetails.description,
      image:
        bookDetails.imageLinks && bookDetails.imageLinks.thumbnail
          ? bookDetails.imageLinks.thumbnail
          : "../../../assets/ImgNotFound.png",
    };

    addBook(MyUserId, bookDetailEnCours, token)
      .then((res) => {
        console.log(res);
        alert("Livre ajouté avec succès");
        ClearLikeList();
      })
      .catch((error) => {
        console.log(MyUserId);
        console.log(bookDetailEnCours);
        console.log(token);
        console.log(
          "Une erreur s'est produite lors de l'ajout du livre",
          error
        );
      });
  };
  const addBookInDbDejaLu = () => {
    const bookDetailDejaLu = {
      tag: "dejalu",
      titre: bookDetails.title,
      note:
        bookDetails.averageRating !== undefined
          ? bookDetails.averageRating
          : "néant",
      auteur: {
        auteur1: bookDetails.authors[0],
        auteur2: bookDetails.authors[1],
      },
      genre: bookDetails.categories ? bookDetails.categories.join() : "néant",
      pages: bookDetails.pageCount ? bookDetails.pages : "néant",
      date: dateString,
      description: bookDetails.description,
      image:
        bookDetails.imageLinks && bookDetails.imageLinks.thumbnail
          ? bookDetails.imageLinks.thumbnail
          : "URL de l'image par défaut",
    };

    addBook(MyUserId, bookDetailDejaLu, token)
      .then((res) => {
        console.log(res);
        alert("Livre ajouté avec succès");
        ClearFinish();
      })
      .catch((error) => {
        console.log(MyUserId);
        console.log(bookDetailDejaLu);
        console.log(token);
        console.log(
          "Une erreur s'est produite lors de l'ajout du livre",
          error
        );
      });
  };

  const addBookInDbEnvie = () => {
    const bookDetailEnvie = {
      tag: "mesenvies",
      titre: bookDetails.title,
      note:
        bookDetails.averageRating !== undefined
          ? bookDetails.averageRating
          : "néant",
      auteur: {
        auteur1: bookDetails.authors[0],
        auteur2: bookDetails.authors[1],
      },
      genre: bookDetails.categories ? bookDetails.categories.join() : "néant",
      pages: bookDetails.pageCount,
      date: dateString,
      description: bookDetails.description,
      image:
        bookDetails.imageLinks && bookDetails.imageLinks.thumbnail
          ? bookDetails.imageLinks.thumbnail
          : "URL de l'image par défaut",
    };

    addBook(MyUserId, bookDetailEnvie, token)
      .then((res) => {
        console.log("Livre ajouté avec succès", res);
        ClearReadList();
      })
      .catch((error) => {
        console.log(MyUserId);
        console.log(bookDetailEnvie);
        console.log(token);
        console.log(
          "Une erreur s'est produite lors de l'ajout du livre",
          error
        );
      });
  };

  return (
    <View style={styles.container}>
      <ViewIcon>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <ViewAvatar>
          <Image
            source={{ uri: MyInfo.avatar }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <Text>{MyInfo.pseudo}</Text>
        </ViewAvatar>
      </ViewIcon>
      <ViewBook>
        <BookImg
          source={{
            uri: `${
              (bookDetails.imageLinks ?? {}).thumbnail ??
              require("../../assets/ImgNotFound.png")
            }`,
          }}
        />
        <ViewIconShare>
          <Share width={20} height={20} />
          <LikeLibrary
            onPress={() => addBookInDbEnvie()}
            width={20}
            height={20}
          />
          <ReadIcon
            onPress={() => addBookInDbEncours()}
            width={20}
            height={20}
          />
          <FinishIcon
            onPress={() => addBookInDbDejaLu()}
            width={30}
            height={30}
          />
        </ViewIconShare>
      </ViewBook>
      <ViewInfo>
        <ViewTitle>
          <TitleBook numberOfLines={1}>Titre: {bookDetails.title}</TitleBook>
          <ViewRate>
            <Rate width={20} height={20} />
            <TextRate>{bookDetails.averageRating ?? "néant"}</TextRate>
          </ViewRate>
        </ViewTitle>

        <Text>
          <TitleBook>Auteur: </TitleBook> {bookDetails.authors}
        </Text>
        <Text>
          <TitleBook>Genre: </TitleBook> {bookDetails.categories}
        </Text>
        <ViewPublish>
          <Text>
            <TitleBook>Pages:</TitleBook> {bookDetails.pageCount}
          </Text>
          <Text>
            <TitleBook>Date de sortie:</TitleBook> {dateString}
          </Text>
        </ViewPublish>
      </ViewInfo>
      <ViewresumeBook>
        <ScrollView>
          <Text style={{ fontWeight: "bold" }}>Synopsis:</Text>
          <Text>{bookDetails.description}</Text>
        </ScrollView>
      </ViewresumeBook>
      <Footer />
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
    paddingTop: Platform.OS === "android" ? 20 : 20,
  },
  shadow: {
    display: "flex",
    flexDirection: "column",
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
});
const ViewIcon = styled.View`
  flex: 0.5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-bottom: 40px;
`;
const ViewAvatar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 35%;
`;

const ViewBook = styled.View`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: auto;
`;

const BookImg = styled.Image`
  height: 240px;
  width: 160px;
  border-radius: 5px;
  border-width: 1px;
  border-color: black;
`;
const ViewIconShare = styled.View`
  flex: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  margin: 20px;
`;

const ViewInfo = styled.View`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;
const ViewTitle = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 75%;
`;
const TitleBook = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-right: 15px;
`;

const TextRate = styled.Text`
  justify-content: center;
  align-items: center;
  margin-left: 2px;
`;

const ViewRate = styled.View`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
`;
const ViewPublish = styled.View`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const ViewresumeBook = styled.View`
  flex: 1.1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top-width: 2px;
  border-top-color: black;
  text-align: justify;
  padding: 15px;
`;
