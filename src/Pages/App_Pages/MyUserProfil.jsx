import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Text, StyleSheet, Image } from "react-native";
import styled from "styled-components";
import Setting from "../../../assets/Img_Presentation/Fill_1157.svg";
import Avatar from "../../../assets/Img_Presentation/Avatar.svg";
import Like from "../../../assets/Img_Presentation/like.svg";
import Comment from "../../../assets/Img_Presentation/Comment.svg";
import Share from "../../../assets/Img_Presentation/Share.svg";
import Footer from "./Footer";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { logoutUser } from "../../../Api/RPC/api";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { MyAuthTokens, User } from "../../recoil";
import { getMyInfo } from "../../../Api/RPC/api";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import MyPublications from "../../components/MyPublications";

export default function MyUserProfil({ navigation: { goBack } }) {
  const navigation = useNavigation();
  const [publication, setPublication] = useState(34);
  const [isVisible, setIsVisible] = useState(false);
  const MyUser = useRecoilValue(User);
  const setMyUser = useSetRecoilState(User);
  const MyTokens = useRecoilValue(MyAuthTokens);
  const ClearToken = useResetRecoilState(MyAuthTokens);

  const token = `Bearer ${MyTokens || MyUser.authToken}`;

  const list = [
    {
      title: "Espace comptes",
      onPress: () => navigation.navigate("UpdateUser"),
    },
    { title: "Notifications" },
    { title: "Gestions des groupes" },
    { title: "Bloqué/restreints" },
    { title: "Supprimer son compte" },
    {
      title: "Se déconnecter",
      onPress: () => handleLogout(),
    },
    {
      title: "Fermer",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];
  const handleLogout = () => {
    logoutUser(token)
      .then(() => {
        ClearToken();
        console.log("Déco réussie");
      })
      .catch((error) => {
        console.error("Une erreur est survenue", error);
      });
  };
  const avatarUserUrl = MyUser.avatar
    ? MyUser.avatar.replace(
        "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
        ""
      )
    : null;
  const baseUrl = "http://192.168.0.20:3000"; // L'URL de base de votre serveur
  const avatarUrl = avatarUserUrl ? baseUrl + avatarUserUrl : null;

  console.log("user", MyUser);
  return (
    <View style={styles.container}>
      <ViewBtn>
        <ViewIcon>
          <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        </ViewIcon>
        <ViewIcon>
          <Setting onPress={() => setIsVisible(true)} width={30} height={30} />
        </ViewIcon>
      </ViewBtn>
      <ViewInfoProfile>
        <ViewAvatar>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          ) : (
            <Avatar style={{ width: 150, height: 150 }} />
          )}
        </ViewAvatar>
        <PseudoProfil>{MyUser.pseudo}</PseudoProfil>
        <Resume>{MyUser.description}</Resume>
        <BoxInfo>
          <BoxInfoIntStr>
            <Text>{MyUser.publications.length}</Text>
            <Text>Publications</Text>
          </BoxInfoIntStr>
          <BoxInfoIntStr>
            <Text>{MyUser.friends.length}</Text>
            <Text>Ami(e)s</Text>
          </BoxInfoIntStr>
        </BoxInfo>
        <MyPublications />
      </ViewInfoProfile>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
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
    paddingTop: Platform.OS === "android" ? 5 : 5,
  },
  shadow: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 2,
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
const ViewBtn = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ViewIcon = styled.View`
  height: 30px;
  width: 30px;
  margin: 35%;
`;
const ViewInfoProfile = styled.View`
  width: 100%;
  flex: 3.8;
  display: flex;
`;
const ViewAvatar = styled.View`
  justify-content: center;
  align-items: center;
`;
const PseudoProfil = styled.Text`
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Resume = styled.Text`
  margin-top: 20px;
  margin-left: 10px;
  font-size: 13px;
`;

const BoxInfo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 20px;
`;
const BoxInfoIntStr = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;
const ViewIconPublication = styled.View`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: flex-start;
`;
const BoxIconPublication = styled.View`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  margin: 10px;
`;
const TextIcon = styled.Text`
  font-size: 12px;
  margin-left: 2px;
`;
