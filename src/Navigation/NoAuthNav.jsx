import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StepLogin1 from "../Pages/StepsLogin/StepLogin1";
import StepLogin2 from "../Pages/StepsLogin/StepLogin2";
import StepForgetPassword1 from "../Pages/StepsLogin/StepForgetPassword1";
import StepForgetPassword2 from "../Pages/StepsLogin/StepForgetPassword2";
import AuthNav from "./AuthNav";
import PrezNav from "./PrezNav";

const Tabs = createNativeStackNavigator();
const NoAuthNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Login2"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Login1" component={StepLogin1} />
      <Tabs.Screen name="Login2" component={StepLogin2} />
      <Tabs.Screen name="ForgetPassword1" component={StepForgetPassword1} />
      <Tabs.Screen name="ForgetPassword2" component={StepForgetPassword2} />
      <Tabs.Screen name="Auth" component={AuthNav} />
      <Tabs.Screen name="PrezNav" component={PrezNav} />
    </Tabs.Navigator>
  );
};
export default NoAuthNav;
