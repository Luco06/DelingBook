import React from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import StepPresentation from "../../../Api/Mock/StepPresentations";
import styled from "styled-components/native";
import ArrowPrez from "../../../assets/Img_Presentation/ArrowPrez.png";

export default function Step1() {
  return (
    <>
      <ViewStep>
        {StepPresentation.map(({ step1 }) => {
          return (
            <View>
              <ViewImg>
                <ImgStep source={step1.img} />
                <Title>{step1.title}</Title>
                <TextStep>{step1.text}</TextStep>
              </ViewImg>
            </View>
          );
        })}

        <BtnPrez>
          <Image source={ArrowPrez} />
        </BtnPrez>
      </ViewStep>
    </>
  );
}
const ViewStep = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;
const ViewBtn = styled.View`
  display: flex;
  align-self: flex-end;
  margin-right: 30px;
  margin-top: 30px;
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
  font-weight: bolder;
  font-size: 20px;
  margin-bottom: 60px;
`;
const ImgStep = styled.Image`
  margin-bottom: 30px;
`;
const BtnPrez = styled.Pressable`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: black;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-right: 30px;
  margin-top: 20px;
`;
