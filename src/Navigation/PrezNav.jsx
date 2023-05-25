import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1 from "../Pages/StepPresentation/Step1";
import Step2 from "../Pages/StepPresentation/Step2";
import Step3 from "../Pages/StepPresentation/Step3";
import Step4 from "../Pages/StepPresentation/Step4";
import ChoiceBookNav from "./GenderChoiceNav";

const Tabs = createNativeStackNavigator();
const PrezNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Step1"
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Step1" component={Step1} />
      <Tabs.Screen name="Step2" component={Step2} />
      <Tabs.Screen name="Step3" component={Step3} />
      <Tabs.Screen name="Step4" component={Step4} />
      <Tabs.Screen name="ChoiceBookNav" component={ChoiceBookNav} />
    </Tabs.Navigator>
  );
};

export default PrezNav;
