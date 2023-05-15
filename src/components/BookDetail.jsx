import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../assets/Img_Presentation/Shape.svg";
import Avatar from "../../assets/Img_Presentation/Avatar.svg";
import Footer from "../Pages/App_Pages/Footer";
import BookDetails from "../../Api/Mock/BookDetails";
import Share from "../../assets/Img_Presentation/Share.svg";
import LikeLibrary from "../../assets/like_library.svg";
import Rate from "../../assets/star_rate.svg";

export default function BookDetail() {
  const [Details, setDetails] = useState({});
  useEffect(() => {
    setDetails(BookDetails);
    console.log(Details);
  });
  return (
    <View style={styles.container}>
      <ViewIcon>
        <ArrowReturn width={30} height={30} />
        <ViewAvatar>
          <Avatar width={40} height={40} />
          <Text>DcLover17</Text>
        </ViewAvatar>
      </ViewIcon>
      <ViewBook>
        <BookImg source={Details.img} />
        <ViewIconShare>
          <Share style={{ marginRight: 80 }} width={20} height={20} />
          <LikeLibrary width={20} height={20} />
        </ViewIconShare>
      </ViewBook>
      <ViewInfo>
        <ViewTitle>
          <TitleBook>{Details.title}</TitleBook>
          <ViewRate>
            <Rate width={20} height={20} />
            <TextRate>{Details.rate}</TextRate>
          </ViewRate>
        </ViewTitle>
        <Text>{Details.author}</Text>
        <ViewPublish>
          <Text>Âge: {Details.age}+</Text>
          <Text>Pages: {Details.pages}</Text>
          <Text>Date de sortie: {Details.date}</Text>
        </ViewPublish>
      </ViewInfo>
      <ViewresumeBook>
        <Text>Synopsis</Text>
        <Text>{Details.resume}</Text>
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
  flex: 2.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookImg = styled.Image`
  height: 300px;
  width: 200px;
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
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const ViewTitle = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
`;
const TitleBook = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const TextRate = styled.Text`
  justify-content: center;
  align-items: center;
`;

const ViewRate = styled.View`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: space-between;
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
