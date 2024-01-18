import React from "react";
import { useRecoilValue } from "recoil";
import { MyAuthTokens } from "../recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Pages/App_Pages/Home";
import MyLibrary from "../Pages/App_Pages/MyLibrary";
import MyMessage from "../Pages/App_Pages/MyMessage";
import SearchBook from "../Pages/App_Pages/SearchBook";
import MyUserProfil from "../Pages/App_Pages/MyUserProfil";
import BookDetail from "../components/BookDetail";
import MyLikePage from "../components/MyLibPage/MyLikePage";
import MyReadPage from "../components/MyLibPage/MyReadPage ";
import MyFinishPage from "../components/MyLibPage/MyFinishPage";
import BookDetailLike from "../components/BookDetailLib/BookDetailLike";
import BookDetailRead from "../components/BookDetailLib/BookDetailRead";
import BookDetailFinish from "../components/BookDetailLib/BookDetailFinish";
import StepLogin1 from "../Pages/StepsLogin/StepLogin1";
import StepLogin2 from "../Pages/StepsLogin/StepLogin2";
import StepForgetPassword1 from "../Pages/StepsLogin/StepForgetPassword1";
import StepForgetPassword2 from "../Pages/StepsLogin/StepForgetPassword2";
import Step1 from "../Pages/StepPresentation/Step1";
import Step2 from "../Pages/StepPresentation/Step2";
import Step3 from "../Pages/StepPresentation/Step3";
import Step4 from "../Pages/StepPresentation/Step4";
import StepGenderBookChoice1 from "../Pages/StepBookGenderChoice/StepBookGenderChoice1";
import StepBookGenderChoice2 from "../Pages/StepBookGenderChoice/StepBookGenderChoice2";
import StepBookGenderChoice3 from "../Pages/StepBookGenderChoice/StepBookGenderChoice3";
import Chat from "../components/Chat";
import SearchUser from "../Pages/App_Pages/SearchUser";
import UserProfil from "../Pages/App_Pages/UserProfil";
import UpdateUser from "../components/UpdateUser";
import ModalShareBook from "../components/ModalShareBook";

const Nav = () => {
  const Stack = createNativeStackNavigator();
  const haveTokens = useRecoilValue(MyAuthTokens);
  console.log(haveTokens);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={haveTokens == "" ? "Login2" : "Home"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {haveTokens == "" ? (
          <>
            <Stack.Screen name="Login2" component={StepLogin2} />
            <Stack.Screen name="Login1" component={StepLogin1} />
            <Stack.Screen
              name="ForgetPassword1"
              component={StepForgetPassword1}
            />
            <Stack.Screen
              name="ForgetPassword2"
              component={StepForgetPassword2}
            />
            <Stack.Screen name="Step1" component={Step1} />
            <Stack.Screen name="Step2" component={Step2} />
            <Stack.Screen name="Step3" component={Step3} />
            <Stack.Screen name="Step4" component={Step4} />
            <Stack.Screen
              name="StepGenderBookChoice1"
              component={StepGenderBookChoice1}
            />
            <Stack.Screen
              name="StepBookGenderChoice2"
              component={StepBookGenderChoice2}
            />
            <Stack.Screen
              name="StepBookGenderChoice3"
              component={StepBookGenderChoice3}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MyLibrary" component={MyLibrary} />
            <Stack.Screen name="MyMessage" component={MyMessage} />
            <Stack.Screen name="SearchBook" component={SearchBook} />
            <Stack.Screen name="MyUserProfil" component={MyUserProfil} />
            <Stack.Screen name="BookDetail" component={BookDetail} />
            <Stack.Screen name="MyLikePage" component={MyLikePage} />
            <Stack.Screen name="MyReadPage" component={MyReadPage} />
            <Stack.Screen name="MyFinishPage" component={MyFinishPage} />
            <Stack.Screen name="BookDetailLike" component={BookDetailLike} />
            <Stack.Screen name="BookDetailRead" component={BookDetailRead} />
            <Stack.Screen
              name="BookDetailFinish"
              component={BookDetailFinish}
            />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="SearchUser" component={SearchUser} />
            <Stack.Screen name="UserProfil" component={UserProfil} />
            <Stack.Screen name="UpdateUser" component={UpdateUser} />
            <Stack.Screen name="ModalShareBook" component={ModalShareBook} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
