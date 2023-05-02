import React from "react";
import styled from "styled-components";
import Library from "../../../assets/Img_Presentation/Library.svg";
import Home from "../../../assets/Img_Presentation/Home.svg";
import Account from "../../../assets/Img_Presentation/Account.svg";
import Message from "../../../assets/Img_Presentation/Message.svg";
import Search from "../../../assets/Img_Presentation/Search.svg";
import Video from "../../../assets/Img_Presentation/Video.svg";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  return (
    <ViewIconApp>
      <Home width={25} height={25} />
      <Message width={25} height={25} />
      <Library
        onPress={() => navigation.navigate("MyLibrary")}
        width={25}
        height={25}
      />
      <Search width={25} height={25} />
      <Video width={25} height={25} />
      <Account
        onPress={() => navigation.navigate("MyUserProfil")}
        width={25}
        height={25}
      />
    </ViewIconApp>
  );
}
const ViewIconApp = styled.View`
  flex: 0.2;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-top-width: 1px;
  border-top-color: black;
  background: white;
`;
