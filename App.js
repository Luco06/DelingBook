import { StyleSheet } from "react-native";
import { RecoilRoot } from "recoil";
import Nav from "./src/Navigation/Nav";

export default function App() {
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
      <Nav />
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
