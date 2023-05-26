import React, { useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View, TextInput, Text } from "react-native";
import MAil from "../../../assets/Img_Presentation/Letter.svg";
import Tel from "../../../assets/Img_Presentation/smartphone.svg";
import Lock from "../../../assets/Img_Presentation/lock.svg";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBox } from "@rneui/themed";
import OriginalLogoWTtxt from "../../../assets/Img_Presentation/OrignalLogoWTtxt.svg";

export default function StepLogin1({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      telephone: "",
      mdp: "",
    },
  });
  const onSubmit = (data) => {
    navigation.navigate("PrezNav");
  };
  const [showPassword, setShowPassword] = useState(true);
  const showMdp = () => {
    setShowPassword(!showPassword);
  };
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <View style={[styles.container]}>
      <ViewImg>
        <OriginalLogoWTtxt width={150} height={150} />
      </ViewImg>
      <ViewStep>
        <Title>Crée votre compte gratuitement</Title>
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

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.viewInput}>
              <TextInput
                placeholder="Téléphone"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
              <Tel width={25} height={20} />
            </View>
          )}
          name="telephone"
        />
        {errors.telephone && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.viewInput}>
              <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                size={300}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={showPassword}
              />
              <Lock width={25} height={20} onPress={() => showMdp()} />
            </View>
          )}
          name="mdp"
        />
        {errors.mdp && <Text>This is required.</Text>}

        <LinearGradient colors={["#287DC0", "#13A484"]} style={styles.BtnPrez}>
          <BtnPrez title="Submit" onPress={handleSubmit(onSubmit)}>
            <TextBtn>S'inscrire</TextBtn>
          </BtnPrez>
        </LinearGradient>
        <ViewCondition>
          <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            // Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#287DC0"
            size={15}
          />

          <TextCondition>
            Cochez pour accepter les{" "}
            <TextPressable
              onPress={() => console.log("DL condition générales")}
            >
              Conditions générales
            </TextPressable>
            &nbsp; de l'application.
          </TextCondition>
        </ViewCondition>
        <TextCondition>
          Vous êtes déja membre?
          <TextPressable onPress={() => navigation.navigate("Login2")}>
            &nbsp; Se connecter
          </TextPressable>
        </TextCondition>
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
  flex: 4;
  align-content: center;
`;
const Title = styled.Text`
  font-weight: 400;
  font-size: 36px;
  text-align: center;
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
  flex-direction: row;
  text-align: center;
  align-items: center;
  height: 100px;
`;
const TextCondition = styled.Text`
  font-size: 10px;
  text-align: center;
`;
const TextPressable = styled.Text`
  color: #287dc0;
  font-size: 12px;
  margin-right: 5px;
`;
