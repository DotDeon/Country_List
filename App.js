import { SafeAreaView } from "react-native-safe-area-context";
import CountryList from "./screens/CountryList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CountryDetails from "./screens/CountryDetails";
import { saveCurrentRoute, getCurrentRoute } from "./utils/storage";
import { useEffect, useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState("/");

  useEffect(() => {
    //Check if there is a route saved in the local storage
    getCurrentRoute().then((savedRoute) => {
      if (savedRoute) {
        console.log(savedRoute);
        setInitialRoute(savedRoute);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen
          name="/"
          component={CountryList}
          listeners={({ route }) => {
            console.log(route.name);
            saveCurrentRoute(route.name);
          }}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetails}
          listeners={({ route }) => {
            console.log(route.name);
            saveCurrentRoute(route.name);
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
