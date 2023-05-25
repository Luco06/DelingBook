import React, { useState, useEffect } from "react";
import { Platform, View, StyleSheet, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import ArrowReturn from "../../assets/Img_Presentation/Shape.svg";
import Avatar from "../../assets/Img_Presentation/Avatar.svg";
import Footer from "../Pages/App_Pages/Footer";
import BookDetails from "../../Api/Mock/BookDetails";
import Share from "../../assets/Img_Presentation/Share.svg";
import LikeLibrary from "../../assets/like_library.svg";
import Rate from "../../assets/star_rate.svg";
import { useNavigation } from "@react-navigation/native";
import { BookDetailsState } from "../recoil";
import { useRecoilValue } from "recoil";

export default function BookDetail({ navigation: { goBack } }) {
  const navigation = useNavigation();
  const [Details, setDetails] = useState({});
  const bookDetails = useRecoilValue(BookDetailsState);
  const date = Date.parse(bookDetails.publishedDate);
  const dateConvert = new Date(date);
  const dateString =
    dateConvert.getDate() +
    "/" +
    (dateConvert.getMonth() + 1) +
    "/" +
    dateConvert.getFullYear();
  useEffect(() => {
    setDetails(BookDetails);
    console.log(Details);
  });
  return (
    <View style={styles.container}>
      <ViewIcon>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <ViewAvatar>
          <Avatar width={40} height={40} />
          <Text>DcLover17</Text>
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
          <Share style={{ marginRight: 80 }} width={20} height={20} />
          <LikeLibrary width={20} height={20} />
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
  justify-content: center;
  width: 30%;
  margin: auto;
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
