import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splashScreen/splashScreen";
import LoginScreen from "../screens/loginScreen/loginScreen";
import SignupScreen from "../screens/signupScreen/signupScreen";
import DrawerNavigator from "./drawerNavigator";
import Deliveries from "../screens/deliveries/deliveries";
import History from "../screens/history/history";
import Wallet from "../screens/wallet/wallet";
import Notifications from "../screens/notifications/notifications";
import OtpScreen from "../screens/otpScreen/otpScreen";
// import FoodScreen from "../screens/rykfoods/foodScreen/foodScreen";
// import CartScreen from "../screens/rykfoods/cartScreen/cartScreen";
// import ProductScreen from "../screens/rykfoods/productScreen/productScreen";
// import ResturantScreen from "../screens/rykfoods/resturantScreen/resturantScreen";
// import CheckoutScreen from "../screens/rykfoods/checkoutScreen/checkoutScreen";
// import StoreScreen from "../screens/rykStore/storeScreen/storeScreen";
// import StoreCart from "../screens/rykStore/storeCart/storeCart";
// import StoreProduct from "../screens/rykStore/storeProduct/storeProduct"; 
// import ShopScreen from "../screens/rykStore/shopScreen/shopScreen";
// import StoreCheckout from "../screens/rykStore/storeCheckout/storeCheckout";


const Stack = createStackNavigator();

const OnBoardStackNavigator = () => {
  console.log('onboard stack')
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
          <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
          <Stack.Screen name={'SignupScreen'} component={SignupScreen} />
          <Stack.Screen name={'OtpScreen'} component={OtpScreen} />
    </Stack.Navigator>
  );
}
const DrawerStack = () => {
  console.log('drawer stack')
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'Drawer'} component={DrawerNavigator} />
          <Stack.Screen name="Deliveries" component={Deliveries} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

// const FoodStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//        <Stack.Screen name="FoodHome" component={FoodScreen} />
//        <Stack.Screen name="CartScreen" component={CartScreen} />
//        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
//        <Stack.Screen name="ProductScreen" component={ProductScreen} />
//        <Stack.Screen name="ResturantScreen" component={ResturantScreen} />
//     </Stack.Navigator>
//   );
// }

// const StoreStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//        <Stack.Screen name="StoreHome" component={StoreScreen} />
//        <Stack.Screen name="StoreCart" component={StoreCart} />
//        <Stack.Screen name="StoreCheckout" component={StoreCheckout} />
//        <Stack.Screen name="StoreProduct" component={StoreProduct} />
//        <Stack.Screen name="ShopScreen" component={ShopScreen} />
//     </Stack.Navigator>
//   );
// }

export { OnBoardStackNavigator,DrawerStack };