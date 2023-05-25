import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
// import Step1 from "./src/Pages/StepPresentation/Step1";
// import Step2 from "./src/Pages/StepPresentation/Step2";
// import Step3 from "./src/Pages/StepPresentation/Step3";
// import Step4 from "./src/Pages/StepPresentation/Step4";
// import StepLogin1 from "./src/Pages/StepsLogin/StepLogin1";
// import StepLogin2 from "./src/Pages/StepsLogin/StepLogin2";
// import StepForgetPassword1 from "./src/Pages/StepsLogin/StepForgetPassword1";
// import StepForgetPassword2 from "./src/Pages/StepsLogin/StepForgetPassword2";
// import StepBookGenderChoice1 from "./src/Pages/StepBookGenderChoice/StepBookGenderChoice1";
// import StepBookGenderChoice2 from "./src/Pages/StepBookGenderChoice/StepBookGenderChoice2";
// import StepBookGenderChoice3 from "./src/Pages/StepBookGenderChoice/StepBookGenderChoice3";
// import MyUserProfil from "./src/Pages/App_Pages/MyUserProfil";
// import MyLibrary from "./src/Pages/App_Pages/MyLibrary";
// import HomePage from "./src/Pages/App_Pages/Home";
// import MyMessage from "./src/Pages/App_Pages/MyMessage";
// import Chat from "./src/components/Chat";
// import SearchBook from "./src/Pages/App_Pages/SearchBook";
// import BookDetail from "./src/components/BookDetail";
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
