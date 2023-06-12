import React from "react";
import { StyleSheet, Image } from "react-native";
import StepPresentation from "../../../public/Api/Mock/StepPresentations";
import styled from "styled-components/native";
import ArrowPrez from "../../../assets/Img_Presentation/ArrowPrez.png";
import ImgPrez2 from "../../../assets/Img_Presentation/ImgPrez2.svg";
import { LinearGradient } from "expo-linear-gradient";
export default function Step2({ navigation }) {
  return (
    <>
      <LinearGradient colors={["#287DC0", "#13A484"]} style={styles.container}>
        <ViewStep>
          {StepPresentation.map(({ step2 }) => {
            return (
              <ViewImg key={step2.id}>
                <ImgPrez2 width={350} height={350} />
                <Title>{step2.title}</Title>
                <TextStep>{step2.text}</TextStep>
                <TextId>{step2.id}</TextId>
                <ViewBtn>
                  <BtnPrez onPress={() => navigation.navigate("Step3")}>
                    <Image source={ArrowPrez} />
                  </BtnPrez>
                </ViewBtn>
              </ViewImg>
            );
          })}
        </ViewStep>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ViewStep = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;
const ViewBtn = styled.View`
  display: flex;
  flex-direction: row-reverse;
  align-self: flex-end;
  justify-content: center;
`;
const ViewImg = styled.View`
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 36px;
  margin-top: 25px;
  margin-bottom: 10px;
`;
const TextStep = styled.Text`
  font-weight: 300;
  font-size: 20px;
  margin-bottom: 60px;
`;
const BtnPrez = styled.Pressable`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: black;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-right: 5px;
  margin-top: 20px;
`;
const TextId = styled.Text`
  display: none;
`;
