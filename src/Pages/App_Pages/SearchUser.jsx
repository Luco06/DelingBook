import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  Platform,
  View,
  Pressable,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { SearchBar } from "@rneui/base";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { User, SearchUserResult, MyAuthTokens } from "../../recoil";
import { searchUser } from "../../../Api/RPC/api";

export default function SearchUser({ navigation: { goBack } }) {
  const MyInfo = useRecoilValue(User);
  const SetResultInfo = useSetRecoilState(SearchUserResult);
  const ResultInfo = useRecoilValue(SearchUserResult);
  const [user, setUser] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  const navigation = useNavigation();
  const MyTokens = useRecoilValue(MyAuthTokens);
  const token = `Bearer ${MyTokens || MyInfo.authToken}`;

  const userItem = ({ item }) => (
    <ViewUserSearch key={item._id}>
      <UserImg source={{ uri: item.avatar }} />
      <Pressable
        onPress={() => (SetResultInfo(item), navigation.navigate("UserProfil"))}
      >
        <UserPseudo>{item.pseudo}</UserPseudo>
      </Pressable>
    </ViewUserSearch>
  );
  //   const search = (searchTerm) => {
  //     setUser(searchTerm);
  //     if (searchTerm.length >= 3) {
  //       searchUser({ pseudo: searchTerm }, token)
  //         .then((response) => {
  //           setFilterUser(response);
  //           console.log("userFilter", response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } else {
  //       setFilterUser([]);
  //     }
  //   };

  const search = () => {
    searchUser({ pseudo: user }, token)
      .then((response) => {
        setFilterUser(response);
        console.log("userFilter", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user.length > 2) {
      search();
    }
  }, [user]);
  console.log(token);
  return (
    <View style={styles.container}>
      <ViewReturn>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <TextViewreturn>{MyInfo.pseudo}</TextViewreturn>
      </ViewReturn>
      <SearchBar
        placeholder="Recherche"
        platform={"ios"}
        showCancel
        leftIcon={{ type: "font-awesome", name: "magnifying-glass" }}
        onChangeText={(user) => setUser(user)}
        value={user}
      />
      <BtnPrez title="Submit" onPress={() => search(user)}>
        <TextBtn>Recherche</TextBtn>
      </BtnPrez>
      <ViewResultSearch>
        <FlatList
          data={filterUser}
          keyExtractor={(item) => item._id}
          renderItem={userItem}
        />
      </ViewResultSearch>
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
  flex: 0.6;
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

const ViewResultSearch = styled.View`
  flex: 2;
`;

const ViewUserSearch = styled.View`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: space-around;
  align-items: center;
`;
const UserImg = styled.Image`
  height: 200px;
  width: 200px;
  border-radius: 100px;
`;

const UserPseudo = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const TextBtn = styled.Text`
  font-weight: 300;
  font-size: 20px;
  color: black;
  font-weight: 500;
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
