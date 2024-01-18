import React from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styled from "styled-components/native";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import Avatar from "../../../assets/Img_Presentation/Avatar.svg";
import { MyLibraryLikeState, BookDetailsState, User } from "../../recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";

export default function MyLikePage({ navigation: { goBack } }) {
  const MyLibraryLike = useRecoilValue(MyLibraryLikeState);
  const setDetailsBook = useSetRecoilState(BookDetailsState);
  const MyInfo = useRecoilValue(User);
  const navigation = useNavigation();
  console.log("MyLib", MyLibraryLike);
  return (
    <View style={styles.container}>
      <ViewIcon>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <ViewAvatar>
          <Image
            source={{ uri: MyInfo.avatar }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <Text>{MyInfo.pseudo}</Text>
        </ViewAvatar>
      </ViewIcon>
      <TitlePage>Mes envies</TitlePage>
      <ScrollView style={styles.contentContainer}>
        <ViewLike>
          {MyLibraryLike.map((item) => {
            return (
              <ViewChoiceBook key={item._id}>
                <ViexTextFlat>
                  <TexFlat numberOfLines={1} ellipsizeMode="tail">
                    {item.titre}
                  </TexFlat>
                </ViexTextFlat>
                <View style={styles.shadow}>
                  <TouchableOpacity
                    onPress={() => (
                      setDetailsBook(item),
                      navigation.navigate("BookDetailLike")
                    )}
                  >
                    <ImgChoiceBook
                      source={{
                        uri: `${
                          item.image ??
                          require("../../../assets/ImgNotFound.png")
                        }`,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </ViewChoiceBook>
            );
          })}
        </ViewLike>
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
    paddingTop: Platform.OS === "android" ? 40 : 40,
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
    padding: 1,
    borderRadius: 5,
  },
  contentContainer: {
    backgroundColor: "#fff",
    flex: 1,
    marginBottom: 10,
  },
});
const ViewIcon = styled.View`
  flex: 0.2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;
const ViewAvatar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 30%;
`;
const TitlePage = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const ViewChoiceBook = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  margin: 5px;
`;
const ImgChoiceBook = styled.Image`
  padding: 10px;
  margin-top: 10px;
  width: 66px;
  height: 100px;
`;
const ViexTextFlat = styled.View`
  text-align: start;
  margin-bottom: 5px;
  overflow: hidden;
  align-items: center;
`;
const TexFlat = styled.Text`
  font-weight: bold;
`;
const ViewLike = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
