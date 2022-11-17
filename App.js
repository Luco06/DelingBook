import { StyleSheet } from "react-native";
import Presentations from "./src/components/Pages/Presentations";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const Stack = createNativeStackNavigator();
  function LogoTitile() {
    return (
      <Image
        style={{ with: 50, height: 50 }}
        source={require("../delingbook_app/assets/OriginalLogo_Icon.png")}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Presentation"
          component={Presentations}
          options={{
            headerShown: false,
            headerStyle: { backgroundColor: "#287DC0" },
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
