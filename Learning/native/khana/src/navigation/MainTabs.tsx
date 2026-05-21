import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import HomeStack from "./HomeStack";
import SearchScreen from "../screens/SearchScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileDrawer from "./ProfileDrawer";
import { IconHome, IconSearch, IconOrders, IconProfile } from "../icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { cartCount } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: { backgroundColor: "#000" },
        tabBarStyle: { backgroundColor: "#000", borderTopColor: "#1A1A1A", borderTopWidth: 1, height: 60, paddingBottom: 8 },
        tabBarActiveTintColor: "#FF6B00",
        tabBarInactiveTintColor: "#555",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, React.ReactNode> = {
            Home:    <IconHome size={size} color={color} />,
            Search:  <IconSearch size={size} color={color} />,
            Orders:  <IconOrders size={size} color={color} />,
            Profile: <IconProfile size={size} color={color} />,
          };
          return icons[route.name] ?? null;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeMain";

          return {
            tabBarStyle: [
              { backgroundColor: "#000", borderTopColor: "#1A1A1A", borderTopWidth: 1, height: 60, paddingBottom: 8 },
              (routeName === "RestaurantDetail" || routeName === "Cart" || routeName === "OrderPlaced") && { display: "none" },
            ],
          };
        }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }}
      />
      <Tab.Screen name="Profile" component={ProfileDrawer} />
    </Tab.Navigator>
  );
}
