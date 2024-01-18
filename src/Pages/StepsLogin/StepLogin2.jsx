import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View, TextInput, Text } from "react-native";
import MAil from "../../../assets/Img_Presentation/Letter.svg";
import Lock from "../../../assets/Img_Presentation/lock.svg";
import { LinearGradient } from "expo-linear-gradient";
import OriginalLogo from "../../../assets/Img_Presentation/OriginalLogo.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { userLogin } from "../../../Api/RPC/api";
import { MyId, User, MyAuthTokens } from "../../recoil";

export default function StepLogin2({ navigation }) {
  const MyTokens = useRecoilValue(MyAuthTokens);
  const setMyTokens = useSetRecoilState(MyAuthTokens);
  const setMyId = useSetRecoilState(MyId);
  const MyUserId = useRecoilValue(MyId);
  const MyUser = useRecoilValue(User);
  const setMyUser = useSetRecoilState(User);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      mdp: "",
    },
  });
  const onSubmit = (data) => {
    userLogin(data)
      .then((res) => {
        console.log("User connected", res);
        setMyTokens(res.authToken);
        setMyId(res.user._id);
        setMyUser(res);
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion", error);
      });
  };
  useEffect(() => {
    console.log("MyToken: ", MyTokens);
    console.log("MyId: ", MyUserId);
    console.log("MyUser", MyUser);
  }, [MyUser, MyUserId, MyTokens]);

  const [showPassword, setShowPassword] = useState(true);
  const showMdp = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container]}>
      <ViewImg>
        <OriginalLogo width={300} height={300} />
      </ViewImg>
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
            <TextBtn>Se connecter</TextBtn>
          </BtnPrez>
        </LinearGradient>
        <ViewCondition>
          <TextCondition onPress={() => navigation.navigate("ForgetPassword1")}>
            Mot de passe oublié?
          </TextCondition>
          <TextCondition>
            Pas encore inscrit?
            <TextPressable onPress={() => navigation.navigate("Login1")}>
              &nbsp; S'inscrire
            </TextPressable>
          </TextCondition>
        </ViewCondition>
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
const TextCondition = styled.Text`
  font-size: 13px;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;
const TextPressable = styled.Text`
  color: #287dc0;
  font-size: 13px;
  text-align: center;
`;
