import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepGenderBookChoice1 from "../Pages/StepBookGenderChoice/StepBookGenderChoice1";
import StepBookGenderChoice2 from "../Pages/StepBookGenderChoice/StepBookGenderChoice2";
import StepBookGenderChoice3 from "../Pages/StepBookGenderChoice/StepBookGenderChoice3";
import AuthNav from "./AuthNav";

const Tabs = createNativeStackNavigator();

const ChoiceBookNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Step"
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="StepGenderBookChoice1"
        component={StepGenderBookChoice1}
      />
      <Tabs.Screen
        name="StepBookGenderChoice2"
        component={StepBookGenderChoice2}
      />
      <Tabs.Screen
        name="StepBookGenderChoice3"
        component={StepBookGenderChoice3}
      />
      <Tabs.Screen name="AuthNav" component={AuthNav} />
    </Tabs.Navigator>
  );
};

export default ChoiceBookNav;
