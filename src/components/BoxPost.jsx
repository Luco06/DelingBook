import React from "react";
import {
  Platform,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import styled from "styled-components";
import Post from "../../public/Api/Mock/Post";
import Like from "../../assets/Img_Presentation/like.svg";
import Share from "../../assets/Img_Presentation/Share.svg";
import Comment from "../../assets/Img_Presentation/Comment.svg";

export default function BoxPost() {
  return (
    <View>
      {Post.map((item) => (
        <View key={item.id} style={{ overflow: "hidden", paddingBottom: 5 }}>
          <View style={styles.shadow}>
            <ViewPseudo>
              <ImgPseudo source={item.img} />
              <Resume>{item.pseudo}</Resume>
            </ViewPseudo>
            <ImgPost source={item.bookImg} />
            <Text>{item.comment}</Text>
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
        </View>
      ))}
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
`;
