import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import { Text, StyleSheet, FlatList, Image } from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import Share from "../../../assets/Img_Presentation/Share.svg";
import Pencil from "../../../assets/Img_Presentation/pencil.svg";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import {
  MyLibraryLikeState,
  MyLibraryFinishState,
  MyLibraryReadState,
  User,
} from "../../recoil";
import { useRecoilValue } from "recoil";

export default function MyLibrary({ navigation: { goBack } }) {
  const [MyLibrary, setMyLibrary] = useState("MyBookSpace");
  const MyLibraryLike = useRecoilValue(MyLibraryLikeState);
  const MyLibraryFinsh = useRecoilValue(MyLibraryFinishState);
  const MyLibraryRead = useRecoilValue(MyLibraryReadState);
  const MyInfo = useRecoilValue(User);
  const navigation = useNavigation();

  const Item = ({ item }) => (
    <ViewChoiceBook key={item._id}>
      <ViexTextFlat>
        <TexFlat numberOfLines={1} ellipsizeMode="tail">
          {item.titre}
        </TexFlat>
      </ViexTextFlat>
      <View style={styles.shadow}>
        <ImgChoiceBook
          source={{
            uri: `${item.image ?? require("../../../assets/ImgNotFound.png")}`,
          }}
        />
      </View>
    </ViewChoiceBook>
  );
  const keyExtractor = (item) => item._id.toString();
  return (
    <View style={styles.container}>
      <ViewBtn>
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
        <LibraryTitle>{MyLibrary}</LibraryTitle>
        <ViewBtnShare>
          <Share width={20} height={20} />
          <Pencil width={20} height={20} />
        </ViewBtnShare>
      </ViewBtn>
      <BoxLib>
        <ViewLibrary>
          <PressablePage onPress={() => navigation.navigate("MyLikePage")}>
            <Text>Mes envies</Text>
          </PressablePage>
          <FlatList
            data={MyLibraryLike}
            horizontal={true}
            keyExtractor={keyExtractor}
            renderItem={Item}
          />
        </ViewLibrary>
        <ViewLibrary>
          <PressablePage onPress={() => navigation.navigate("MyReadPage")}>
            <Text>En cours</Text>
          </PressablePage>
          <FlatList
            data={MyLibraryRead}
            horizontal={true}
            keyExtractor={keyExtractor}
            renderItem={Item}
          />
        </ViewLibrary>
        <ViewLibrary>
          <PressablePage onPress={() => navigation.navigate("MyFinishPage")}>
            <Text>Déjà lu</Text>
          </PressablePage>
          <FlatList
            data={MyLibraryFinsh}
            horizontal={true}
            keyExtractor={keyExtractor}
            renderItem={Item}
          />
        </ViewLibrary>
      </BoxLib>

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
    paddingTop: Platform.OS === "android" ? 25 : 25,
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
    padding: 1,
    borderRadius: 5,
  },
});
const ViewBtn = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const ViewIcon = styled.View`
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
  width: 30%;
`;
const ViewBtnShare = styled.View`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const ViewLibrary = styled.View`
  flex-direction: column;
  width: 95%;
  margin: auto;
  border-color: black;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  box-shadow: 10px 5px 5px black;
`;
const BoxLib = styled.View`
  flex: 2.5;
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: auto;
`;
const ViewChoiceBook = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  margin: 5px;
`;
const ImgChoiceBook = styled.Image`
  padding: 10px;
  margin-top: 10px;
  width: 66px;
  height: 100px;
`;
const ViexTextFlat = styled.View`
  text-align: start;
  margin-bottom: 5px;
  overflow: hidden;
  align-items: center;
`;
const TexFlat = styled.Text`
  font-weight: bold;
`;
const LibraryTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const PressablePage = styled.TouchableOpacity`
  width: 22%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;
