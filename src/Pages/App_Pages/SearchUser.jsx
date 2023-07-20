import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Platform,
  View,
  Pressable,
  Text,
} from "react-native";
import styled from "styled-components/native";
import { SearchBar } from "@rneui/base";
import ArrowReturn from "../../../assets/Img_Presentation/Shape.svg";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { User, SearchUserResult, MyAuthTokens, FriendList } from "../../recoil";
import { searchUser, getFriendList } from "../../../Api/RPC/api";

export default function SearchUser({ navigation: { goBack } }) {
  const [isSearchBar, setIsSearchBar] = useState(true);
  const MyInfo = useRecoilValue(User);
  const SetResultInfo = useSetRecoilState(SearchUserResult);
  const ResultInfo = useRecoilValue(SearchUserResult);
  const [user, setUser] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  const navigation = useNavigation();
  const MyTokens = useRecoilValue(MyAuthTokens);
  const token = `Bearer ${MyTokens || MyInfo.authToken}`;
  const setListAmi = useSetRecoilState(FriendList);
  const ListAmi = useRecoilValue(FriendList);

  const ListPage = () => {
    setIsSearchBar(false);
  };
  const SearchPage = () => {
    setIsSearchBar(true);
  };
  const userItem = ({ item }) => {
    const avatarUserUrl = item.avatar.replace(
      "/Users/luc-olivieryohan/Desktop/DB_BackEnd/MangoDB/src/midddlewares",
      ""
    );
    const avatarUrl = `http://192.168.0.20:3000${avatarUserUrl}`;
    return (
      <ViewUserSearch key={item._id}>
        <UserImg source={{ uri: avatarUrl }} />
        <Pressable
          onPress={() => (
            SetResultInfo(item), navigation.navigate("UserProfil")
          )}
        >
          <UserPseudo>{item.pseudo}</UserPseudo>
        </Pressable>
      </ViewUserSearch>
    );
  };

  const search = () => {
    searchUser({ pseudo: user }, token)
      .then((response) => {
        setFilterUser(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getListFriends = () => {
    const promises = [
      getFriendList(MyInfo._id, token),
      ...MyInfo.friends.map((friendId) => getFriendList(friendId, token)),
    ];
    Promise.all(promises)
      .then((res) => {
        const friend = res[0];
        setListAmi(friend);
        console.log("ListAmi", ListAmi);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user.length > 2) {
      search();
    }
    getListFriends();
  }, [user]);
  return (
    <View style={styles.container}>
      <ViewReturn>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <TextViewreturn>{MyInfo.pseudo}</TextViewreturn>
      </ViewReturn>
      <BoxBtn>
        <BtnView onPress={() => SearchPage()}>
          <TextBtnView>Recherche d'amis</TextBtnView>
        </BtnView>
        <BtnView onPress={() => ListPage()}>
          <TextBtnView>Liste d'amis</TextBtnView>
        </BtnView>
      </BoxBtn>
      {isSearchBar ? (
        <View style={{ flex: 2 }}>
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
      ) : (
        <View style={{ flex: 2 }}>
          <ViewResultSearch>
            <FlatList
              data={ListAmi}
              keyExtractor={(item) => item._id}
              renderItem={userItem}
            />
          </ViewResultSearch>
        </View>
      )}
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const UserImg = styled.Image`
  height: 80px;
  width: 80px;
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

const BoxBtn = styled.View`
  flex: 0.3;
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-around;
  align-items: center;
`;
const BtnView = styled.Pressable`
  width: 150px;
  height: 40px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-color: #efeff3;
`;

const TextBtnView = styled.Text`
  font-weight: 300;
  font-size: 15px;
  color: black;
  font-weight: 500;
`;
