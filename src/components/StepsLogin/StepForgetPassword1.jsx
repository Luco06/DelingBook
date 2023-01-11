import React, { useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View, TextInput, Text } from "react-native";
import MAil from "../../../assets/Img_Presentation/Letter.svg";
import { LinearGradient } from "expo-linear-gradient";
import XCircle from "../../../assets/Img_Presentation/x-circle.svg";

export default function StepLogin2({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  const [showPassword, setShowPassword] = useState(true);
  const showMdp = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={[styles.container]}>
      <ViewImg>
        <XCircle width={60} height={60} />
      </ViewImg>
      <Title>Entrer votre email</Title>
      <ViewStep>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.viewInput}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
              <MAil width={25} height={20} />
            </View>
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}

        <ViewCondition>
          <TextCondition1 onPress={() => console.log("Page mdp oublié")}>
            Vous n'avez pas reçu d'email?
          </TextCondition1>
          <TextCondition2>Nouvel envoie possible dans 30sec</TextCondition2>
        </ViewCondition>
        <LinearGradient colors={["#287DC0", "#13A484"]} style={styles.BtnPrez}>
          <BtnPrez
            title="Submit"
            onPress={() => navigation.navigate("StepForgetPassword2")}
          >
            <TextBtn>Envoyer</TextBtn>
          </BtnPrez>
        </LinearGradient>
      </ViewStep>
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
  BtnPrez: {
    width: 190,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
const ViewImg = styled.View`
  align-items: center;
  text-align: center;
  justify-content: center;
  flex: 2;
  margin: 10%;
`;
const ViewStep = styled.View`
  flex-direction: column;
  align-content: center;
  flex: 4;
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
`;
const ViewCondition = styled.View`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;
const TextCondition1 = styled.Text`
  font-size: 13px;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 30px;
  font-weight: bold;
`;
const TextCondition2 = styled.Text`
  font-size: 13px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 5px;
`;
const TextPressable = styled.Text`
  color: #287dc0;
  font-size: 13px;
  text-align: center;
`;
const Title = styled.Text`
  font-weight: 400;
  font-size: 36px;
  text-align: center;
`;
