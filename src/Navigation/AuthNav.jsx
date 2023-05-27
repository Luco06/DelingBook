import React from "react";
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

const Tabs = createNativeStackNavigator();
const AuthNav = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="MyLibrary" component={MyLibrary} />
      <Tabs.Screen name="MyMessage" component={MyMessage} />
      <Tabs.Screen name="SearchBook" component={SearchBook} />
      <Tabs.Screen name="MyUserProfil" component={MyUserProfil} />
      <Tabs.Screen name="BookDetail" component={BookDetail} />
      <Tabs.Screen name="MyLikePage" component={MyLikePage} />
      <Tabs.Screen name="MyReadPage" component={MyReadPage} />
      <Tabs.Screen name="MyFinishPage" component={MyFinishPage} />
      <Tabs.Screen name="BookDetailLike" component={BookDetailLike} />
      <Tabs.Screen name="BookDetailRead" component={BookDetailRead} />
      <Tabs.Screen name="BookDetailFinish" component={BookDetailFinish} />
    </Tabs.Navigator>
  );
};
export default AuthNav;
