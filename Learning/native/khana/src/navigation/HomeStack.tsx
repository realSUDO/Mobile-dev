import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrderPlacedScreen from "../screens/OrderPlacedScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        headerBackTitle: "Back",
        animation: "slide_from_right",
        contentStyle: { backgroundColor: "#000" },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: (route.params as any)?.name ?? "Restaurant",
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Your Cart", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="OrderPlaced"
        component={OrderPlacedScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
}
