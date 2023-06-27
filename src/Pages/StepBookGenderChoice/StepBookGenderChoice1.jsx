import React, { useState } from "react";
import OriginalLogoWTtxt from "../../../assets/Img_Presentation/OrignalLogoWTtxt.svg";
import { StyleSheet, View, TextInput } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { updateUser } from "../../../Api/RPC/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "../../recoil";

export default function StepBookGenderChoice1({ navigation }) {
  const MyUser = useRecoilValue(User);
  const [userPseudo, setUserPseudo] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const userUpdate = {
    description: userDescription,
    pseudo: userPseudo,
  };

  const token = `Bearer ${MyUser.authToken}`;
  const update = () => {
    console.log("Mon pseudo", userPseudo);
    console.log("Ma description", userDescription);
    console.log("MyUser", MyUser);
    updateUser(userUpdate, token)
      .then((res) => {
        navigation.navigate("StepBookGenderChoice3");
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la mise à jour de votre compte :",
          error
        );
        // Gérez l'erreur ici
      });
  };

  return (
    <View style={styles.container}>
      <ViewImg>
        <OriginalLogoWTtxt width={120} height={120} />
        <TextBook>
          Tu peux mettre à jour ton profile en ajoutant un pseudo et ta
          description à ton compte, ou le faire plus tard.
        </TextBook>
      </ViewImg>
      <ViewInoput>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Pseudo"
            style={styles.input}
            onChangeText={(userPseudo) => setUserPseudo(userPseudo)}
            value={userPseudo}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Description"
            multiline={true}
            style={{ width: 230, height: 130 }}
            onChangeText={(userDescription) =>
              setUserDescription(userDescription)
            }
            value={userDescription}
          />
        </View>
      </ViewInoput>
      <PressableNext onPress={update}>
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
    padding: 15,
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
  input: {
    width: 180,
  },
  viewInput: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(196, 196, 196, 0.2)",
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
const ViewInoput = styled.View`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
