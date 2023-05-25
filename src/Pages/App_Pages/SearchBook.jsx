import React, { useState } from "react";
import { Text, StyleSheet, FlatList, Platform, View } from "react-native";
import styled from "styled-components/native";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import { SearchBar } from "@rneui/base";
import API_Key from "../../../Api/ApiKey";

export default function SearchBook({ navigation: { goBack } }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState({});

  const onSubmit = () => {
    const searchBook = async () => {
      await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_Key}`
      )
        .then((resp) => resp.json())
        .then((json) => setBooks(json.items))
        .catch((error) => console.error(error));
      console.log(books);
    };
    searchBook();
  };
  const BookItem = ({ item }) => (
    <ViewBook key={item.id}>
      <BookImg
        source={{
          uri: `${
            (item.volumeInfo.imageLinks ?? {}).thumbnail ??
            require("../../../assets/ImgNotFound.png")
          }`,
        }}
      />

      <ViewTextBook>
        <Text>Titre: {item.volumeInfo.title}</Text>
        <Text>Autheur: {item.volumeInfo.authors}</Text>
      </ViewTextBook>
    </ViewBook>
  );
  return (
    <View style={styles.container}>
      <ViewReturn>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <TextViewreturn>DCLover17</TextViewreturn>
      </ViewReturn>
      <SearchBarView>
        <SearchBar
          placeholder="Recherche"
          platform={"ios"}
          showCancel
          leftIcon={{ type: "font-awesome", name: "magnifying-glass" }}
          onChangeText={(query) => setQuery(query)}
          value={query}
        />
        <BtnPrez title="Submit" onPress={onSubmit}>
          <TextBtn>Recherche</TextBtn>
        </BtnPrez>
      </SearchBarView>
      <ViewResultBook>
        <FlatList
          data={books}
          keyExtractor={BookItem.index}
          renderItem={BookItem}
        />
      </ViewResultBook>
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
  contentContainer: {
    backgroundColor: "#fff",
    flex: 5,
  },
});

const ViewReturn = styled.View`
  flex: 0.3;
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-around;
  align-items: center;
  align-self: flex-start;
`;
const TextViewreturn = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const SearchBarView = styled.View`
  width: 95%;
  flex: 0.3;
`;

const ViewBook = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5px;
`;
const BookImg = styled.Image`
  height: 200px;
  width: 150px;
  border-width: 1px;
  border-color: #efeff3;
  border-radius: 10px;
`;

const ViewTextBook = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
`;

const ViewResultBook = styled.View`
  flex: 1.2;
  margin-top: 10px;
`;

const BtnPrez = styled.Pressable`
  width: 190px;
  height: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #efeff3;
`;
const TextBtn = styled.Text`
  font-weight: 300;
  font-size: 20px;
  color: black;
  font-weight: 500;
`;