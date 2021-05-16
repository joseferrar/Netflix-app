import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Forgot from "../Auth/Forgot";
import TabNavbar from "../Navbar/TabNavbar";
import ProductDetails from "../screens/Home/Popular/PopularDetails";
import { auth } from "../config/fire";

const Stack = createStackNavigator();

export default function Navbar() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [user]);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Forgot"
              component={Forgot}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
          <Stack.Screen
            name="Home"
            component={TabNavbar}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
          name="Details"
          component={ProductDetails}
          
        />
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
