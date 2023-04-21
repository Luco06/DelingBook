import React, { useState } from "react";
import {
  Platform,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import Setting from "../../../assets/Img_Presentation/Fill_1157.svg";
import AvatarUser from "../../../assets/Img_Presentation/AvatarUser.svg";
import Like from "../../../assets/Img_Presentation/like.svg";
import Comment from "../../../assets/Img_Presentation/Comment.svg";
import Share from "../../../assets/Img_Presentation/Share.svg";
import Library from "../../../assets/Img_Presentation/Library.svg";
import Home from "../../../assets/Img_Presentation/Home.svg";
import Account from "../../../assets/Img_Presentation/Account.svg";
import Message from "../../../assets/Img_Presentation/Message.svg";
import Search from "../../../assets/Img_Presentation/Search.svg";
import Video from "../../../assets/Img_Presentation/Video.svg";
import { LinearGradient } from "expo-linear-gradient";

export default function UserProfil({ navigation }) {
  const [pseudo, setPseudo] = useState("BookLover30");
  const [resume, setResume] = useState("Lire est une passion indélébile❤️😁");
  const [publication, setPublication] = useState(28);
  const [followers, setFollowwers] = useState(401);
  const [follow, setFollow] = useState(412);
  return (
    <View contentContainerStyle={styles.container}>
      <ViewBtn>
        <ArrowReturn width={30} height={30} style={{ marginRight: 100 }} />
        <Setting width={30} height={30} style={{ marginLeft: 100 }} />
      </ViewBtn>
      <ScrollView style={styles.contentContainer}>
        <ViewInfoProfile>
          <ViewAvatar>
            <AvatarUser width={200} height={200} />
          </ViewAvatar>
          <PseudoProfil>{pseudo}</PseudoProfil>
          <Resume>{resume}</Resume>
          <ViewFollow>
            <Pressable style={styles.BtnPrez}>
              <LinearGradient
                style={{
                  borderRadius: 15,
                  height: 30,
                  width: 120,
                }}
                colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
              >
                <TextFollow>Suivre</TextFollow>
              </LinearGradient>
            </Pressable>
            <Pressable style={styles.BtnPrez}>
              <LinearGradient
                style={{
                  borderRadius: 15,
                  height: 30,
                  width: 120,
                }}
                colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
              >
                <TextFollow>Écrire</TextFollow>
              </LinearGradient>
            </Pressable>
          </ViewFollow>
          <BoxInfo>
            <BoxInfoIntStr>
              <Text>{publication}</Text>
              <Text>Publications</Text>
            </BoxInfoIntStr>
            <BoxInfoIntStr>
              <Text>{followers}</Text>
              <Text>Followers</Text>
            </BoxInfoIntStr>
            <BoxInfoIntStr>
              <Text>{follow}</Text>
              <Text>Suivi(e)s</Text>
            </BoxInfoIntStr>
          </BoxInfo>
          <View style={{ overflow: "hidden", paddingBottom: 5 }}>
            <View style={styles.shadow}>
              <Resume>{pseudo}</Resume>
              <Image
                style={{
                  height: 130,
                  width: 90,
                  alignSelf: "center",
                  margin: 5,
                }}
                source={require("../../../assets/Img_Presentation/bookUser.png")}
              />
              <Text>
                Je viens de découvrir un livre magnifiquement bien écrit et très
                émouvant, je recommande !!!👌😱😢#LaromancedelaGoulue
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
          <View style={{ overflow: "hidden", paddingBottom: 5 }}>
            <View style={styles.shadow}>
              <Resume>{pseudo}</Resume>
              <Image
                style={{
                  height: 130,
                  width: 90,
                  alignSelf: "center",
                  margin: 5,
                }}
                source={require("../../../assets/Img_Presentation/bookUser.png")}
              />
              <Text>
                Je viens de découvrir un livre magnifiquement bien écrit et très
                émouvant, je recommande !!!👌😱😢#LaromancedelaGoulue
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
      </ScrollView>
      <ViewIconApp>
        <Home width={25} height={25} />
        <Message width={25} height={25} />
        <Library width={25} height={25} />
        <Search width={25} height={25} />
        <Video width={25} height={25} />
        <Account width={25} height={25} />
      </ViewIconApp>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    width: 130,
    height: 35,
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 22,
    margin: 20,
  },
  contentContainer: {
    backgroundColor: "#fff",
  },
});
const ViewBtn = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: auto;
  background-color: white;
  padding-top: 40px;
  padding-bottom: 30px;
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
const ViewInfoProfile = styled.View`
  width: 100%;
  flex: 4;
  display: flex;
`;
const ViewAvatar = styled.View`
  justify-content: center;
  align-items: center;
`;
const PseudoProfil = styled.Text`
  margin-top: 25px;
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
`;
const BoxInfoIntStr = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ViewIconApp = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-top-width: 1px;
  border-top-color: black;
  background: white;
`;
