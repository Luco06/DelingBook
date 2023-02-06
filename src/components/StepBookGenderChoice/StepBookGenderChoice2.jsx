import React, { useState } from "react";
import OriginalLogoWTtxt from "../../../assets/Img_Presentation/OrignalLogoWTtxt.svg";
import { StyleSheet, View, FlatList, Text } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "@rneui/base";

export default function StepBookGenderChoice2({ navigation }) {
  const [searchBook, setSearchBook] = useState("");
  const onChangeSearch = (book) => setSearchBook(book);
  return (
    <View style={styles.container}>
      <ViewImg>
        <OriginalLogoWTtxt width={120} height={120} />
        <TextBook>
          Parmis les livres proposés, choisis en deux minimum pour chaques genre
          littéraire pour affinée ton profil. Sinon, tape le titre du livre dans
          la barre de recherche ci-dessous
        </TextBook>
      </ViewImg>

      <SearchBar
        placeholder="Taper ici..."
        onChangeText={onChangeSearch}
        value={searchBook}
        platform="android"
        containerStyle={{
          border: "solid 2px black",
          borderRadius: 15,
          height: 60,
        }}
        placeholderTextColor="#000000"
      />

      <FlastListView>
        <LinearGradient
          style={{
            borderRadius: 15,
            height: 60,
            width: 140,
          }}
          colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
        >
          {/* <TextBookChoice style={[styles.item, textColor]}>
            {item.txt}
          </TextBookChoice> */}
          <Text style={styles.visit}>Graphiques</Text>
        </LinearGradient>
        <LinearGradient
          style={{
            borderRadius: 15,
            height: 60,
            width: 140,
          }}
          colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
        >
          {/* <TextBookChoice style={[styles.item, textColor]}>
            {item.txt}
          </TextBookChoice> */}
          <Text style={styles.visit}>Narratifs</Text>
        </LinearGradient>
      </FlastListView>
      <PressableNext
        onPress={() => navigation.navigate("StepBookGenderChoice3")}
      >
        <TextPressableNext>Suivant</TextPressableNext>
      </PressableNext>
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
  visit: {
    margin: 15,
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
});

const ViewImg = styled.View`
  align-items: center;
  text-align: center;
  justify-content: center;
  flex: 2;
  margin: 10%;
`;
const TextBook = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
`;

const FlastListView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
  margin-bottom: 80px;
`;
const PressableNext = styled.TouchableOpacity`
  border: 1px solid black;
  bottom: 70px;
  justify-content: center;
  text-align: center;
  border-radius: 15px;
  width: 100px;
  height: 40px;
`;
const TextPressableNext = styled.Text`
  text-align: center;
  font-size: 15px;
  color: black;
`;
