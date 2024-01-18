import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import styled from "styled-components";
import Post from "../../Api/Mock/Post";
import Like from "../../assets/Img_Presentation/like.svg";
import Share from "../../assets/Img_Presentation/Share.svg";
import Comment from "../../assets/Img_Presentation/Comment.svg";
import Trash from "../../assets/Img_Presentation/trash.svg";
import { User, MyAuthTokens } from "../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { deletePost } from "../../Api/RPC/api";

export default function MyPublications() {
  const MyInfo = useRecoilValue(User);
  const MyPublication = MyInfo.publications;
  const MyTokens = useRecoilValue(MyAuthTokens);
  const token = `Bearer ${MyTokens}`;
  console.log(MyPublication);
  console.log(token);

  const avatarUserUrl = MyInfo.avatar
    ? MyInfo.avatar.replace(
        "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
        ""
      )
    : null;
  const baseUrl = "http://192.168.0.20:3000"; // L'URL de base de votre serveur
  const avatarUrl = avatarUserUrl ? baseUrl + avatarUserUrl : null;

  const PostItem = ({ item }) => {
    const publicationId = item._id;
    const deletePublication = () => {
      deletePost(publicationId, token)
        .then((res) => {
          alert(res.message);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la suppression de la publication :",
            error
          );
          console.error("Status:", error.response?.status);
          console.error("Message:", error.message);
        });
      console.log(publicationId);
    };
    return (
      <ViewPost key={item._id}>
        <View style={styles.shadow}>
          <ViewPseudo>
            {avatarUrl ? (
              <ImgPseudo source={{ uri: avatarUrl }} />
            ) : (
              <Avatar style={{ width: 25, height: 25, borderRadius: 100 }} />
            )}

            <Resume>{MyInfo.pseudo}</Resume>
          </ViewPseudo>
          <ImgPost
            source={{
              uri: `${item.img ?? require("../../assets/ImgNotFound.png")}`,
            }}
          />
          <Text>{item.txt}</Text>
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
            <DeletePressable onPress={deletePublication}>
              <Trash width={25} height={25} />
            </DeletePressable>
          </ViewIconPublication>
        </View>
      </ViewPost>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={MyPublication}
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
  width: 25%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
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
`;

const DeletePressable = styled.Pressable`
  margin: 6px;
  justify-content: flex-end;
  align-items: flex-end;
  width: 66%;
  display: flex;
  float: right;
  margin: 6px;
`;
