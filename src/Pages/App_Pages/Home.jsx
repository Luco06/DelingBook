import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { ScrollView, StyleSheet, FlatList } from "react-native";
import styled from "styled-components";
import Footer from "./Footer";
import Story from "../../../Api/Mock/Story";
import BoxPost from "../../components/BoxPost";
import { getMyInfo } from "../../../Api/RPC/api";
import { MyAuthTokens, User } from "../../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Home({ navigation }) {
  const setMyInfo = useSetRecoilState(User);
  const MyInfo = useRecoilValue(User);
  const MyToken = useRecoilValue(MyAuthTokens);
  const token = `Bearer ${MyToken}`;
  const userInfo = () => {
    setInterval(() => {
      getMyInfo(token)
        .then((res) => {
          setMyInfo(res);
        })
        .catch((error) => {
          console.error("Une erreur est survenue", error);
        });
    }, 3000);
  };
  useEffect(() => {
    userInfo();
  }, []);
  const Item = ({ item }) => (
    <BoxStory key={item.id}>
      <ImgStory source={item.img} />
      <TextStroy>{item.pseudo}</TextStroy>
    </BoxStory>
  );
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
      </View>

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
