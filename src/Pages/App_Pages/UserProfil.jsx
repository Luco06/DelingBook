import React, { useState } from "react";
import {
  Platform,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import Setting from "../../../assets/Img_Presentation/Fill_1157.svg";
import Like from "../../../assets/Img_Presentation/like.svg";
import Comment from "../../../assets/Img_Presentation/Comment.svg";
import Share from "../../../assets/Img_Presentation/Share.svg";
import Footer from "./Footer";
import { LinearGradient } from "expo-linear-gradient";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SearchUserResult, FriendList, MyAuthTokens, User } from "../../recoil";
import { useNavigation } from "@react-navigation/native";
import { addUser, deleteFriend } from "../../../Api/RPC/api";

export default function UserProfil({ navigation: { goBack } }) {
  const [publication, setPublication] = useState(28);
  const [follow, setFollow] = useState(412);
  const InfoOtherUser = useRecoilValue(SearchUserResult);
  const setListAmi = useSetRecoilState(FriendList);
  const ListAmi = useRecoilValue(FriendList);
  const MyInfo = useRecoilValue(User);
  const navigation = useNavigation();

  const MyTokens = useRecoilValue(MyAuthTokens);
  const token = `Bearer ${MyTokens}`;
  const friendId = InfoOtherUser._id;
  const isFriend =
    ListAmi.length > 0 &&
    ListAmi.some((friend) => friend._id === InfoOtherUser._id);

  const ajoutAmi = () => {
    console.log(friendId);
    addUser({ friendId: friendId }, token)
      .then((response) => {
        setListAmi(response);
        alert(`${InfoOtherUser.pseudo} a bien été ajouté`);
        navigation.navigate("SearchUser");
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de l'ajout :", error);
        alert("Une erreur s'est produite lors de l'ajout");
      });
  };
  const suppAmi = () => {
    deleteFriend(MyInfo._id, InfoOtherUser._id, token)
      .then((res) => {
        alert("Cette utilisateur a bien été supprimer de votre liste d'ami");
        navigation.navigate("SearchUser");
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors dela suppression :",
          error
        );
        alert("Une erreur s'est produite lors de l suppression");
      });
  };
  const avatarUserUrl = InfoOtherUser.avatar.replace(
    "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
    ""
  );
  const avatarUrl = `http://192.168.0.20:3000${avatarUserUrl}`;
  console.log(InfoOtherUser);
  return (
    <View style={styles.container}>
      <ViewBtn>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
      </ViewBtn>
      <ViewInfoProfile>
        <ViewAvatar>
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        </ViewAvatar>
        <ViewDescription>
          <PseudoProfil>{InfoOtherUser.pseudo}</PseudoProfil>
          <Resume>{InfoOtherUser.description}</Resume>
        </ViewDescription>
        <ViewFollow>
          {isFriend ? (
            <View>
              <Pressable style={styles.BtnPrez} onPress={() => suppAmi()}>
                <LinearGradient
                  style={{
                    borderRadius: 15,
                    height: 30,
                    width: 120,
                  }}
                  colors={[
                    "rgba(40, 125, 192, 0.8)",
                    "rgba(19, 164, 132, 0.8)",
                  ]}
                >
                  <TextFollow>Supprimer</TextFollow>
                </LinearGradient>
              </Pressable>
            </View>
          ) : (
            <View>
              <Pressable style={styles.BtnPrez} onPress={() => ajoutAmi()}>
                <LinearGradient
                  style={{
                    borderRadius: 15,
                    height: 30,
                    width: 120,
                  }}
                  colors={[
                    "rgba(40, 125, 192, 0.8)",
                    "rgba(19, 164, 132, 0.8)",
                  ]}
                >
                  <TextFollow>Ajouter</TextFollow>
                </LinearGradient>
              </Pressable>
            </View>
          )}

          <Pressable style={styles.BtnPrez}>
            <LinearGradient
              style={{
                borderRadius: 15,
                height: 30,
                width: 120,
              }}
              colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
            >
              <Pressable onPress={() => navigation.navigate("Chat")}>
                <TextFollow>Écrire</TextFollow>
              </Pressable>
            </LinearGradient>
          </Pressable>
        </ViewFollow>
        <BoxInfo>
          <BoxInfoIntStr>
            <Text>{publication}</Text>
            <Text>Publications</Text>
          </BoxInfoIntStr>
          <BoxInfoIntStr>
            <Text>{InfoOtherUser.friends.length}</Text>
            <Text>Ami(e)s</Text>
          </BoxInfoIntStr>
        </BoxInfo>
        <View style={{ overflow: "hidden", paddingBottom: 5 }}>
          <View style={styles.shadow}>
            <Resume>{InfoOtherUser.pseudo}</Resume>
            <Image
              style={{ height: 130, width: 90, alignSelf: "center", margin: 5 }}
              source={require("../../../assets/Img_Presentation/tokyo.png")}
            />
            <Text>
              Comic indépendant à dévorer dans les plus bref delais
              !!#Tokyogosth
            </Text>
            <ViewIconPublication>
              <BoxIconPublication>
                <Like width={18} height={18} />
                <TextIcon>120</TextIcon>
              </BoxIconPublication>
              <BoxIconPublication>
                <Comment width={18} height={18} />
                <TextIcon>66</TextIcon>
              </BoxIconPublication>
              <BoxIconPublication>
                <Share width={18} height={18} />
                <TextIcon>15</TextIcon>
              </BoxIconPublication>
            </ViewIconPublication>
          </View>
        </View>
      </ViewInfoProfile>
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
  width: 80%;
`;

const ViewInfoProfile = styled.View`
  width: 100%;
  flex: 5;
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

const ViewFollow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 70%;
  margin: auto;
`;
const TextFollow = styled.Text`
  text-align: center;
  font-weight: bold;
  margin: 5px;
`;
const ViewDescription = styled.View`
  margin-bottom: 20px;
  padding: 5px;
`;
