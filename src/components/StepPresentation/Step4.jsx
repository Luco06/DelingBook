import React from "react";
import { View } from "react-native";
import StepPresentation from "../../../Api/Mock/StepPresentations";
import styled from "styled-components/native";

export default function Step4() {
  return (
    <ViewStep>
      {StepPresentation.map(({ step4 }) => {
        return (
          <View>
            <ImgStep source={step4.img} />
            <Title>{step4.title}</Title>
            <TextStep>{step4.text}</TextStep>
          </View>
        );
      })}
    </ViewStep>
  );
}
const ViewStep = styled.View`
  flex-direction: column;
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
`;
const ImgStep = styled.Image`
  margin: auto;
`;
