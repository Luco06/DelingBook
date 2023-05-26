import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { RecoilRoot } from "recoil";
import AuthContext from "./src/context/AuthContext";
import Nav from "./src/Navigation/Nav";

export default function App() {
  const Stack = createNativeStackNavigator();
  function LogoTitile() {
    return (
      <Image
        style={{ with: 50, height: 50 }}
        source={require("./assets/OriginalLogo_Icon.png")}
      />
    );
  }
  return (
    <RecoilRoot>
      <NavigationContainer>
        <AuthContext>
          <Nav />
        </AuthContext>
      </NavigationContainer>
    </RecoilRoot>
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
