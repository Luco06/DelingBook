import React, { useState } from "react";
import OriginalLogoWTtxt from "../../../assets/Img_Presentation/OrignalLogoWTtxt.svg";
import { StyleSheet, View, FlatList, Text, Platform } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "@rneui/base";
import GenderListeBook from "../../../Api/Mock/GenderListeBook";
import GenderListeBook2 from "../../../Api/Mock/GenderListeBook2";
import ArrowPrez from "../../../assets/next_selection.svg";

export default function StepBookGenderChoice2({ navigation }) {
  const DATA1 = GenderListeBook;
  const DATA2 = GenderListeBook2;
  const [searchBook, setSearchBook] = useState("");
  const onChangeSearch = (book) => setSearchBook(book);

  const Item = ({ item }) => (
    <ViewChoiceBook key={item.id} style={styles.shadow}>
      <ImgChoiceBook source={item.book1} />
      <ImgChoiceBook source={item.book2} />
      <ImgChoiceBook source={item.book3} />
      <ArrowPrez
        width={30}
        height={30}
        onPress={() => console.log("next secletion")}
      />
    </ViewChoiceBook>
  );
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

      <FlastListView>
        <SearchBar
          placeholder="Taper ici..."
          onChangeText={onChangeSearch}
          value={searchBook}
          platform="ios"
          placeholderTextColor="#000000"
        />
        <LinearGradient
          style={{
            borderRadius: 15,
            height: 40,
            width: 110,
            alignSelf: "center",
          }}
          colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
        >
          <Text style={styles.visit}>Graphiques</Text>
        </LinearGradient>

        <FlatList
          data={GenderListeBook}
          horizontal={true}
          keyExtractor={Item.id}
          renderItem={Item}
        />

        <LinearGradient
          style={{
            borderRadius: 15,
            height: 40,
            width: 110,
            alignSelf: "center",
          }}
          colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
        >
          <Text style={styles.visit}>Narratifs</Text>
        </LinearGradient>
        <FlatList
          data={GenderListeBook2}
          horizontal={true}
          keyExtractor={Item.id}
          renderItem={Item}
        />
      </FlastListView>
      <PressableNext
        onPress={() => navigation.navigate("StepBookGenderChoice3")}
      >
        <LinearGradient
          style={{
            borderRadius: 15,
            height: 40,
            width: 110,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>Suivant</Text>
        </LinearGradient>
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
    paddingTop: Platform.OS === "android" ? 40 : 40,
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
    padding: 8,
    textAlign: "center",
    color: "black",
    fontSize: 15,
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
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRightColor: "whitesmoke",
    borderLeftColor: "whitesmoke",
    padding: 10,
  },
});

const ViewImg = styled.View`
  align-items: center;
  text-align: center;
  justify-content: center;
  flex: 1.5;
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
  justify-content: center;
  align-items: center;
  flex: 3;
`;
const PressableNext = styled.TouchableOpacity`
  bottom: 30px;
  justify-content: center;
  text-align: center;
  border-radius: 15px;
  margin: auto;
`;

const ViewChoiceBook = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ImgChoiceBook = styled.Image`
  margin: 20px;
  margin-top: 10px;
  height: 100px;
  width: 64px;
`;
