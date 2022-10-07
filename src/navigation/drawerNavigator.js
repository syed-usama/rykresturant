import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/homeScreen/homeScreen";
import { DrawerContent } from "../screens/drawerContent/drawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  // console.log('drawer navigator')

  return (
    <Drawer.Navigator
       screenOptions={{ headerShown: false }}
       drawerContent={(props) => <DrawerContent {...props} />} 
     >
       <Drawer.Screen name="HomeScreen" component={HomeScreen} />
     </Drawer.Navigator>
  );
}

export default DrawerNavigator;