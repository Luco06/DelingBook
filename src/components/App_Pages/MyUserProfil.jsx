import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Text, StyleSheet, Image } from "react-native";
import styled from "styled-components";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import Setting from "../../../assets/Img_Presentation/Fill_1157.svg";
import Avatar from "../../../assets/Img_Presentation/Avatar.svg";
import Like from "../../../assets/Img_Presentation/like.svg";
import Comment from "../../../assets/Img_Presentation/Comment.svg";
import Share from "../../../assets/Img_Presentation/Share.svg";
import Footer from "./Footer";

export default function MyUserProfil({ navigation }) {
  const [pseudo, setPseudo] = useState("DCLover17");
  const [resume, setResume] = useState("ComicBook forever !!!👌👌");
  const [publication, setPublication] = useState(34);
  const [followers, setFollowwers] = useState(350);
  const [follow, setFollow] = useState(330);
  return (
    <View style={styles.container}>
      <ViewBtn>
        <ViewIcon>
          <ArrowReturn width={30} height={30} />
        </ViewIcon>
        <ViewIcon>
          <Setting width={30} height={30} />
        </ViewIcon>
      </ViewBtn>
      <ViewInfoProfile>
        <ViewAvatar>
          <Avatar width={200} height={200} />
        </ViewAvatar>
        <PseudoProfil>{pseudo}</PseudoProfil>
        <Resume>{resume}</Resume>
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
