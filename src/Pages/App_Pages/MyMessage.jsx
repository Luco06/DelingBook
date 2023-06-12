import React, { useState } from "react";
import { Platform, View } from "react-native";
import {
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import { SearchBar } from "@rneui/themed";
import PrevMessage from "../../../public/Api/Mock/PrevMessage";
import { useNavigation } from "@react-navigation/native";

export default function MyMessage({ navigation: { goBack } }) {
  const navigation = useNavigation();
  const [MyPseudo, setMyPseudo] = useState("DCLover17");
  const [Search, setSearch] = useState("");
  const updateSearch = (Search) => {
    setSearch(Search);
  };
  return (
    <View style={styles.container}>
      <ViewReturn>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <TextViewreturn>{MyPseudo}</TextViewreturn>
      </ViewReturn>
      <SearchBarView>
        <SearchBar
          placeholder="Recherche"
          onChangeText={updateSearch}
          value={Search}
          platform={"ios"}
          showCancel
          leftIcon={{ type: "font-awesome", name: "magnifying-glass" }}
        />
      </SearchBarView>
      <ScrollView style={styles.contentContainer}>
        {PrevMessage.map((item) => (
          <ViewPrevMessage key={item.id}>
            <BoxImg>
              <ImgStory source={item.img} />
            </BoxImg>
            <TouchableOpacity
              style={{ width: "80%" }}
              onPress={() => navigation.navigate("Chat")}
            >
              <ViewPrevMessagetxt>
                <Pseudo>{item.pseudo}</Pseudo>
                <Text>{item.prevMess}</Text>
              </ViewPrevMessagetxt>
            </TouchableOpacity>
          </ViewPrevMessage>
        ))}
      </ScrollView>
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
    paddingTop: Platform.OS === "android" ? 5 : 5,
  },
  contentContainer: {
    backgroundColor: "#fff",
    flex: 5,
  },
});

const ViewReturn = styled.View`
  flex: 0.2;
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  align-self: flex-start;
`;
const TextViewreturn = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const SearchBarView = styled.View`
  width: 95%;
`;

const Pseudo = styled.Text`
  font-weight: bold;
`;
const ImgStory = styled.Image`
  width: 50px;
  height: 50px;
`;
const ViewPrevMessagetxt = styled.View`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const ViewPrevMessage = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15px;
`;
const BoxImg = styled.View`
  margin: 15px;
  margin-top: 10px;
  width: 50px;
  height: 50px;
`;
