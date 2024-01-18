import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import styled from "styled-components";
import { User, FriendList, AllPublications } from "../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { parseISO, compareDesc } from "date-fns";
import Like from "../../assets/Img_Presentation/like.svg";
import Share from "../../assets/Img_Presentation/Share.svg";
import Comment from "../../assets/Img_Presentation/Comment.svg";
import Avatar from "../../assets/Img_Presentation/Avatar.svg";

export default function BoxPost() {
  const Myinfo = useRecoilValue(User);
  const ListAmi = useRecoilValue(FriendList);
  const setAllPublication = useSetRecoilState(AllPublications);
  const AllPubli = useRecoilValue(AllPublications);

  // console.log("ListAmi", ListAmi);

  const joinAllPubli = () => {
    setTimeout(() => {
      if (Myinfo && Myinfo.publications && ListAmi) {
        const allPublications = [
          ...Myinfo.publications,
          ...ListAmi.flatMap((friend) => friend.publications),
        ];
        allPublications.sort((a, b) =>
          compareDesc(parseISO(a.date), parseISO(b.date))
        );
        setAllPublication(allPublications);
      }
    }, 4000);
  };

  useEffect(() => {
    if (Myinfo !== "") {
      joinAllPubli();
    }
  }, [Myinfo]);

  // console.log("Toutes les publications", AllPubli);

  const afficherDateAvecPrefixe = (datePublication) => {
    const maintenant = new Date();
    const datePub = new Date(datePublication);
    const differenceMs = maintenant - datePub;
    const secondes = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(secondes / 60);
    const heures = Math.floor(minutes / 60);
    const jours = Math.floor(heures / 24);

    if (jours > 0) {
      return `Il y a ${jours} jour${jours !== 1 ? "s" : ""}`;
    } else if (heures > 0) {
      return `Il y a ${heures} heure${heures !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `Il y a ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      return `Il y a quelques secondes`;
    }
  };
  const PostItem = ({ item }) => {
    const avatarUserUrl = item.avatar
      ? item.avatar.replace(
          "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
          ""
        )
      : null;
    const baseUrl = "http://192.168.0.20:3000"; // L'URL de base de votre serveur
    const avatarUrl = avatarUserUrl ? baseUrl + avatarUserUrl : null;
    return (
      <ViewPost key={item._id}>
        <View style={styles.shadow}>
          <ViewPseudo>
            {avatarUrl ? (
              <ImgPseudo source={{ uri: avatarUrl }} />
            ) : (
              <Avatar style={{ width: 25, height: 25, borderRadius: 100 }} />
            )}

            <Resume>{item.pseudo}</Resume>
          </ViewPseudo>
          <ImgPost
            source={{
              uri: `${item.img ?? require("../../assets/ImgNotFound.png")}`,
            }}
          />
          <Text>{item.txt}</Text>
          <DatePublication>
            {afficherDateAvecPrefixe(item.date)}
          </DatePublication>
          <ViewIconPublication>
            <BoxIconPublication>
              <Like width={18} height={18} />
              <TextIcon>{item.like}</TextIcon>
            </BoxIconPublication>
            <BoxIconPublication>
              <Comment width={18} height={18} />
              <TextIcon>{item.coms}</TextIcon>
            </BoxIconPublication>
            <BoxIconPublication>
              <Share width={18} height={18} />
              <TextIcon>{item.share}</TextIcon>
            </BoxIconPublication>
          </ViewIconPublication>
        </View>
      </ViewPost>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={AllPubli}
        keyExtractor={(item) => item._id}
        renderItem={PostItem}
      />
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
  contentContainer: {
    backgroundColor: "#fff",
  },
});
const Resume = styled.Text`
  margin-left: 10px;
  font-size: 13px;
`;
const ViewIconPublication = styled.View`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: flex-start;
  flex: 2;
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

const ImgPost = styled.Image`
  height: 130px;
  width: 90px;
  margin: 5px;
  align-self: center;
`;
const ViewPseudo = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 20%;
`;

const ImgPseudo = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 100px;
`;

const ViewPost = styled.View`
  overflow: hidden;
  padding-bottom: 10px;
  height: auto;
  display: flex;
`;

const DatePublication = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;
