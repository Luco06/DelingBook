import React, { useState } from "react";
import OriginalLogoWTtxt from "../../../assets/Img_Presentation/OrignalLogoWTtxt.svg";
import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import styled from "styled-components";
import GenderBookChoice1 from "../../../public/Api/Mock/GenderBookChoice1";
import { LinearGradient } from "expo-linear-gradient";
import GenderBookChoice2 from "../../../public/Api/Mock/GenderBookChoice2";

export default function StepBookGenderChoice1({ navigation }) {
  const DATA1 = GenderBookChoice1;
  const DATA2 = GenderBookChoice2;
  const logPress = (PressType) => {
    console.log(PressType);
  };
  const BookChoice = ({ item }) => (
    <ViewChoiceBook>
      <Pressable style={styles.BtnPrez}>
        <LinearGradient
          style={{
            borderRadius: 15,
            height: 60,
            width: 140,
          }}
          colors={["rgba(40, 125, 192, 0.8)", "rgba(19, 164, 132, 0.8)"]}
        >
          <Text onPress={() => logPress(item.txt)} style={styles.visit}>
            {item.txt}
          </Text>
        </LinearGradient>
      </Pressable>
    </ViewChoiceBook>
  );
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return <BookChoice item={item} onPress={() => setSelectedId(item.id)} />;
  };
  return (
    <View style={styles.container}>
      <ViewImg>
        <OriginalLogoWTtxt width={120} height={120} />
        <TextBook>
          Pour en savoir plus sur toi et ainsi te proposer des nouveautées qui
          pourrait te plaire, choisis un ou plusieur genres littéraire qui te
          passione.
        </TextBook>
      </ViewImg>
      <FlastListView>
        <FlatList
          data={DATA1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
        <FlatList
          data={DATA2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </FlastListView>
      <PressableNext
        onPress={() => navigation.navigate("StepBookGenderChoice2")}
      >
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
const ViewChoiceBook = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
`;

const FlastListView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 3;
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
