import React from "react";
import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import OriginalLogo from "../../../assets/Img_Presentation/OriginalLogo.svg";

export default function StepBookGenderChoice3({ navigation }) {
  return (
    <View style={styles.container}>
      <ViewImg>
        <OriginalLogo width={300} height={300} />
        <TextBook>
          Ton compte est maintenant créer, tu vas pouvoir discuter, échanger et
          plus encore avec tes DelingGroup et les autres DelingUser
        </TextBook>
      </ViewImg>
      <ViewBtn>
        <PressableNext onPress={() => navigation.navigate("AuthNav")}>
          <LinearGradient
            style={{
              borderRadius: 15,
              height: 75,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
          >
            <Text style={styles.visit}>Accédez à mon profil</Text>
          </LinearGradient>
        </PressableNext>
      </ViewBtn>
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
  visit: {
    margin: 15,
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
});

const PressableNext = styled.TouchableOpacity`
  bottom: 70px;
  justify-content: center;
  text-align: center;
  border-radius: 15px;
  margin: auto;
`;
const ViewImg = styled.View`
  align-items: center;
  text-align: center;
  justify-content: center;
  flex: 3;
  margin: 10%;
`;
const TextBook = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
`;
const ViewBtn = styled.View`
  flex: 2;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;
