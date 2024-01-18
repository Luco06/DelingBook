import React, { useState, useEffect } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { Text, StyleSheet, TextInput, Button } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import ArrowReturn from "../../assets/Img_Presentation/Shape.svg";
import { User, MyAuthTokens } from "../recoil";
import { useRecoilValue } from "recoil";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { updateUser } from "../../Api/RPC/api";

export default function UpdateUser({ navigation: { goBack } }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [mdp, setMdp] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const MyTokens = useRecoilValue(MyAuthTokens);
  const showMdp = () => {
    setShowPassword(!showPassword);
  };
  const token = `Bearer ${MyTokens}`;
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0]?.uri);
    }
    if (hasGalleryPermission === false) {
      console.log("Impossible d'ajouter une photo");
    }
  };

  const MyInfo = useRecoilValue(User);
  const navigation = useNavigation();
  // const userDataUpdate = {
  //   avatar: image ? image.trim() : undefined,
  //   pseudo: pseudo ? pseudo.trim() : undefined,
  //   email: email ? email.trim() : undefined,
  //   telephone: telephone ? telephone.trim() : undefined,
  //   mdp: mdp ? mdp.trim() : undefined,
  // };

  const update = () => {
    const userUpdate = {
      pseudo: pseudo.trim() || undefined,
      email: email.trim() || undefined,
      telephone: telephone.trim() || undefined,
      mdp: mdp.trim() || undefined,
    };

    const formData = new FormData();
    if (image) {
      formData.append("avatar", {
        uri: image,
        type: "image/jpeg",
        name: "avatar.jpg",
      });
      formData.append("userUpdate", JSON.stringify(userUpdate));
      console.log("Données user", formData);

      updateUser(formData, token)
        .then((res) => {
          alert("Votre profil a été mis à jour");
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert("Votre profil n'a pas pu être mis à jour");
        });
    } else {
      updateUser(userUpdate, token)
        .then((res) => {
          alert("Votre profil a été mis à jour");
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert("Votre profil n'a pas pu être mis à jour");
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.os === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-20}
    >
      <ViewBtn>
        <ArrowReturn onPress={() => goBack()} width={30} height={30} />
        <TitlePage>Editer votre profil</TitlePage>
      </ViewBtn>
      <BoxAvatar>
        {image && <ImgUser source={{ uri: image }} />}
        <Button title="Ajouter une image" onPress={pickImage} />
      </BoxAvatar>
      <ViewEdit>
        <BoxInput>
          <Text>Pseudo</Text>
          <TextInput
            style={styles.viewInput}
            placeholder={MyInfo.pseudo}
            size={300}
            onChangeText={(name) => setPseudo(name)}
            value={pseudo}
          />
        </BoxInput>
        <BoxInput>
          <Text>Email</Text>
          <TextInput
            style={styles.viewInput}
            placeholder={MyInfo.email}
            onChangeText={(mail) => setEmail(mail)}
            value={email}
          />
        </BoxInput>
        <BoxInput>
          <Text>Telephone</Text>
          <TextInput
            placeholder="Téléphone"
            style={styles.viewInput}
            keyboardType="phone-pad"
            onChangeText={(tel) => setTelephone(tel)}
            value={telephone}
          />
        </BoxInput>
        <BoxInput>
          <Text>Mot de passe</Text>
          <TextInput
            placeholder="Mot de passe"
            style={styles.viewInput}
            size={300}
            secureTextEntry={showPassword}
            onChangeText={(mdp) => setMdp(mdp)}
            value={mdp}
          />
        </BoxInput>
        <LinearGradient colors={["#287DC0", "#13A484"]} style={styles.BtnPrez}>
          <BtnSave onPress={update}>
            <TextBtn>Mettre à jour</TextBtn>
          </BtnSave>
        </LinearGradient>
      </ViewEdit>
    </KeyboardAvoidingView>
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
  viewInput: {
    width: 170,
    height: 40,
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

const ViewBtn = styled.View`
  flex: 0.7;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  justify-content: space-between;
`;

const TitlePage = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 25px;
`;

const ViewEdit = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 2;
`;

const BoxInput = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ImgUser = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 100px;
  margin-bottom: 10px;
`;

const BoxAvatar = styled.View`
  flex: 1;
`;

const BtnSave = styled.Pressable`
  width: 140px;
  height: 50px;
  border-radius: 50px;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const TextBtn = styled.Text`
  font-weight: 300;
  font-size: 18px;
  color: black;
  font-weight: 500;
`;
