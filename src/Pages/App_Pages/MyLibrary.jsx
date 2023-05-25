import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Text, StyleSheet, FlatList } from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import Avatar from "../../../assets/Img_Presentation/Avatar.svg";
import Share from "../../../assets/Img_Presentation/Share.svg";
import Pencil from "../../../assets/Img_Presentation/pencil.svg";
import GenrderListeBook from "../../../Api/Mock/GenderListeBook";
import GenderListeBook3 from "../../../Api/Mock/GenderListeBook3";
import ArrowPrez from "../../../assets/next_selection.svg";
import GenderListeBook4 from "../../../Api/Mock/GenderListeBook4";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
export default function MyLibrary({ navigation: { goBack } }) {
  const [MyLibrary, setMyLibrary] = useState("MyBookSpace");
  const navigation = useNavigation();
  const Item = ({ item }) => (
    <ViewChoiceBook key={item.id}>
      <ViexTextFlat>
        <TexFlat>{item.text}</TexFlat>
      </ViexTextFlat>
      <View style={styles.shadow}>
        <ImgChoiceBook source={item.book1} />
        <ImgChoiceBook source={item.book2} />
        <ImgChoiceBook source={item.book3} />
        <ArrowPrez
          width={30}
          height={30}
          onPress={() => console.log("next secletion")}
        />
      </View>
    </ViewChoiceBook>
  );
  return (
    <View style={styles.container}>
      <ViewBtn>
        <ViewIcon>
          <ArrowReturn onPress={() => goBack()} width={30} height={30} />
          <ViewAvatar>
            <Avatar width={40} height={40} />
            <Text>DcLover17</Text>
          </ViewAvatar>
        </ViewIcon>
        <LibraryTitle>{MyLibrary}</LibraryTitle>
        <ViewBtnShare>
          <Share width={20} height={20} />
          <Pencil width={20} height={20} />
        </ViewBtnShare>
      </ViewBtn>
      <ViewLibrary>
        <FlatList
          data={GenrderListeBook}
          horizontal={true}
          keyExtractor={Item.id}
          renderItem={Item}
        />
        <FlatList
          data={GenderListeBook3}
          horizontal={true}
          keyExtractor={Item.id}
          renderItem={Item}
        />
        <FlatList
          data={GenderListeBook4}
          horizontal={true}
          keyExtractor={Item.id}
          renderItem={Item}
        />
      </ViewLibrary>
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
    padding: 10,
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
  flex: 2.5;
  display: flex;
  flex-direction: column;
`;
const ViewChoiceBook = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImgChoiceBook = styled.Image`
  margin: 20px;
  margin-top: 10px;
  width: 66px;
  height: 100px;
`;
const ViexTextFlat = styled.View`
  text-align: start;
  width: 100%;
  margin-bottom: 5px;
`;
const TexFlat = styled.Text`
  font-weight: bold;
`;
const LibraryTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
