import React, { useState, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import styled from "styled-components";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { User, SearchUserResult } from "../recoil";
export default function Chat({ navigation: { goBack } }) {
  const [UserPseudo, setUserPseudo] = useState("Reader");
  const socket = io("http://192.168.0.20:3000");
  const [messages, setMessages] = useState([]);
  const MyUser = useRecoilValue(User);
  const InfoOtherUser = useRecoilValue(SearchUserResult);

  useEffect(() => {
    console.log(MyUser._id);
    console.log("Info de l'autre utilisateur", InfoOtherUser);
    socket.emit("userConnected", { userId: MyUser._id });
    socket.on("message", (message) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      );
    });
    console.log(messages);
  }, []);

  const onSend = (messages = []) => {
    const recipientId = InfoOtherUser._id;
    socket.emit("sendMessageToUser", { recipientId, message: messages[0] });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: MyUser._id,
        name: MyUser.email,
      }}
    />
    // <View style={styles.container}>
    //   <ViewReturn>
    //     <ArrowReturn onPress={() => goBack()} width={30} height={30} />
    //     <ImgStory source={require("../../assets/Img_story/Avatar1.png")} />
    //     <TextViewreturn>{UserPseudo}</TextViewreturn>
    //   </ViewReturn>
    //   <ScrollView style={styles.contentContainer}>
    //     <BoxChat>
    //       {Message.map((item) => (
    //         <View key={item.id}>
    //           <Box>
    //             <ImgStory source={item.img} />
    //             <BoxChatMess>
    //               <Text>{item.mess1}</Text>
    //             </BoxChatMess>
    //           </Box>
    //           <Box>
    //             <ImgStory source={item.img} />
    //             <BoxChatMess>
    //               <Text>{item.mess2}</Text>
    //             </BoxChatMess>
    //           </Box>
    //           <Box>
    //             <BoxChatRep>
    //               <Text>{item.rep1}</Text>
    //             </BoxChatRep>
    //           </Box>
    //           <Box>
    //             <BoxChatRep>
    //               <Text>{item.rep2}</Text>
    //             </BoxChatRep>
    //           </Box>
    //           <Box>
    //             <ImgStory source={item.img} />
    //             <BoxChatMess>
    //               <Text>{item.mess3}</Text>
    //             </BoxChatMess>
    //           </Box>
    //           <Box>
    //             <BoxChatRep>
    //               <Text>{item.rep3}</Text>
    //             </BoxChatRep>
    //           </Box>
    //           <Box>
    //             <ImgStory source={item.img} />
    //             <BoxChatMess>
    //               <Text>{item.mess4}</Text>
    //             </BoxChatMess>
    //           </Box>
    //           <Box>
    //             <BoxChatRep>
    //               <Text>{item.rep3}</Text>
    //             </BoxChatRep>
    //           </Box>
    //           <Box>
    //             <ImgStory source={item.img} />
    //             <BoxChatMess>
    //               <Text>{item.mess5}</Text>
    //             </BoxChatMess>
    //           </Box>
    //         </View>
    //       ))}
    //     </BoxChat>
    //   </ScrollView>
    //   <ViewInput>
    //     <CamMessage width={30} height={30} />
    //     <Input placeholder="Votre message" />
    //     <BoxIncon>
    //       <Mic width={20} height={20} />
    //       <Book width={20} height={20} />
    //     </BoxIncon>
    //   </ViewInput>
    // </View>
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
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#d9d9d9",
    width: "90%",
    height: 30,
  },
});
const ViewReturn = styled.View`
  flex: 0.2;
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  margin-left: 20px;
`;
const TextViewreturn = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const ImgStory = styled.Image`
  width: 35px;
  height: 35px;
`;
const BoxChatMess = styled.View`
  background-color: #d9d9d9;
  width: 50%;
  margin: 20px;
  margin-right: 140px;
  border-radius: 10px;
  min-height: 45px;
  padding: 6px;
`;
const BoxChatRep = styled.View`
  background-color: #d9d9d9;
  width: 50%;
  margin: 20px;
  margin-left: 140px;
  border-radius: 10px;
  min-height: 45px;
  padding: 6px;
`;

const Box = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const BoxChat = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const ViewInput = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  background-color: #d9d9d9;
  width: 90%;
  height: 35px;
  margin: 10px;
  align-items: center;
  justify-content: space-around;
`;
const BoxIncon = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 20%;
`;
const Input = styled.TextInput`
  width: 70%;
`;
