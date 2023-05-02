import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Step1 from "./src/components/StepPresentation/Step1";
import Step2 from "./src/components/StepPresentation/Step2";
import Step3 from "./src/components/StepPresentation/Step3";
import Step4 from "./src/components/StepPresentation/Step4";
import StepLogin1 from "./src/components/StepsLogin/StepLogin1";
import StepLogin2 from "./src/components/StepsLogin/StepLogin2";
import StepForgetPassword1 from "./src/components/StepsLogin/StepForgetPassword1";
import StepForgetPassword2 from "./src/components/StepsLogin/StepForgetPassword2";
import StepBookGenderChoice1 from "./src/components/StepBookGenderChoice/StepBookGenderChoice1";
import StepBookGenderChoice2 from "./src/components/StepBookGenderChoice/StepBookGenderChoice2";
import StepBookGenderChoice3 from "./src/components/StepBookGenderChoice/StepBookGenderChoice3";
import MyUserProfil from "./src/components/App_Pages/MyUserProfil";
import MyLibrary from "./src/components/App_Pages/MyLibrary";

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Step1"
          component={Step1}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#287DC0" },
          }}
        />
        <Stack.Screen
          name="Step2"
          component={Step2}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#287DC0" },
          }}
        />
        <Stack.Screen
          name="Step3"
          component={Step3}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#287DC0" },
          }}
        />
        <Stack.Screen
          name="Step4"
          component={Step4}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#287DC0" },
          }}
        />
        <Stack.Screen
          name="StepLogin1"
          component={StepLogin1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepLogin2"
          component={StepLogin2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepForgetPassword1"
          component={StepForgetPassword1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepForgetPassword2"
          component={StepForgetPassword2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepBookGenderChoice1"
          component={StepBookGenderChoice1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepBookGenderChoice2"
          component={StepBookGenderChoice2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="StepBookGenderChoice3"
          component={StepBookGenderChoice3}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyUserProfil"
          component={MyUserProfil}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyLibrary"
          component={MyLibrary}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
