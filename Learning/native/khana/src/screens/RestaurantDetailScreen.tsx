import { View, Text, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { IconStar, IconClock, IconCart } from "../icons";

const MENU = [
  { id: "1", name: "Classic Burger", desc: "Beef patty, lettuce, tomato, cheese", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" },
  { id: "2", name: "Double Stack", desc: "Double beef, special sauce, pickles", price: 289, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&q=80" },
  { id: "3", name: "Crispy Chicken", desc: "Fried chicken, coleslaw, mayo", price: 229, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&q=80" },
  { id: "4", name: "Paneer Tikka Melt", desc: "Smoky paneer, onion rings, mint mayo", price: 239, image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=300&q=80" },
  { id: "5", name: "Loaded Masala Fries", desc: "Crisp fries, chilli dust, cheesy dip", price: 149, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80" },
  { id: "6", name: "Peri Peri Wings", desc: "Juicy wings, hot glaze, ranch drizzle", price: 259, image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300&q=80" },
  { id: "7", name: "Cold Coffee Float", desc: "Creamy coffee, vanilla scoop, cocoa", price: 169, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80" },
  { id: "8", name: "Choco Lava Cup", desc: "Warm cocoa cake with molten centre", price: 129, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80" },
  { id: "9", name: "Smash Cheese Slider", desc: "Mini bun, crispy edges, cheddar sauce", price: 159, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&q=80" },
  { id: "10", name: "Tandoori Chicken Wrap", desc: "Charred chicken, onions, green chutney", price: 219, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&q=80" },
  { id: "11", name: "Makhani Pasta Bowl", desc: "Creamy tomato sauce, herbs, parmesan", price: 249, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300&q=80" },
  { id: "12", name: "Garlic Cheese Bread", desc: "Toasted loaf, garlic butter, cheese pull", price: 139, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&q=80" },
  { id: "13", name: "Crispy Corn Chaat", desc: "Sweet corn, chilli lime, crunchy herbs", price: 119, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80" },
  { id: "14", name: "Butter Chicken Rice", desc: "Creamy gravy, basmati rice, pickled onion", price: 319, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&q=80" },
  { id: "15", name: "Veggie Loaded Pizza", desc: "Mozzarella, capsicum, olives, onion", price: 329, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" },
  { id: "16", name: "Korean Chilli Momos", desc: "Crisp dumplings, sticky chilli glaze", price: 189, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&q=80" },
  { id: "17", name: "Lemon Mint Cooler", desc: "Fresh mint, citrus fizz, crushed ice", price: 99, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&q=80" },
  { id: "18", name: "Berry Cheesecake Jar", desc: "Cream cheese mousse, berry compote", price: 179, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&q=80" },
];

const FALLBACK = {
  name: "Bytes Kitchen",
  price: 249,
  image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85",
  cuisine: "Fresh meals",
  rating: "4.6",
  time: "25 min",
};

export default function RestaurantDetailScreen({ route, navigation }: any) {
  const params = route.params ?? {};
  const name = params.name ?? FALLBACK.name;
  const price = params.price ?? FALLBACK.price;
  const image = params.image ?? FALLBACK.image;
  const cuisine = params.cuisine ?? FALLBACK.cuisine;
  const rating = params.rating ?? FALLBACK.rating;
  const time = params.time ?? FALLBACK.time;
  const { cartCount, setCartCount } = useAuth();
  const [menuCounts, setMenuCounts] = useState<Record<string, number>>({});

  const addToCart = (itemId: string) => {
    setMenuCounts((counts) => ({ ...counts, [itemId]: (counts[itemId] ?? 0) + 1 }));
    setCartCount((count) => count + 1);
  };

  const removeFromCart = (itemId: string) => {
    setMenuCounts((counts) => {
      const current = counts[itemId] ?? 0;

      if (current <= 1) {
        const { [itemId]: _removed, ...nextCounts } = counts;
        return nextCounts;
      }

      return { ...counts, [itemId]: current - 1 };
    });
    setCartCount((count) => Math.max(count - 1, 0));
  };

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <Image source={{ uri: image }} style={s.hero} />

        <SafeAreaView edges={["bottom"]}>
          <View style={s.content}>
            <Text style={s.name}>{name}</Text>
            <Text style={s.cuisine}>{cuisine}</Text>

            <View style={s.metaRow}>
              <View style={s.meta}>
                <IconStar size={14} color="#FF6B00" />
                <Text style={s.metaText}>{rating}</Text>
              </View>
              <View style={s.meta}>
                <IconClock size={14} color="#666" />
                <Text style={s.metaText}>{time}</Text>
              </View>
              <Text style={s.metaPrice}>From ₹{price}</Text>
            </View>

            <View style={s.divider} />
            <Text style={s.menuTitle}>Menu ({MENU.length} items)</Text>

            {MENU.map((item) => (
              <View key={item.id} style={s.menuItem}>
                <Image source={{ uri: item.image }} style={s.menuImg} />
                <View style={s.menuInfo}>
                  <Text style={s.menuName}>{item.name}</Text>
                  <Text style={s.menuDesc} numberOfLines={2}>{item.desc}</Text>
                  <Text style={s.menuPrice}>₹{item.price}</Text>
                </View>
                {(menuCounts[item.id] ?? 0) > 0 ? (
                  <View style={s.qtyControl}>
                    <Pressable style={s.qtyBtn} onPress={() => removeFromCart(item.id)}>
                      <Text style={s.qtyBtnText}>-</Text>
                    </Pressable>
                    <Text style={s.qtyCount}>{menuCounts[item.id]}</Text>
                    <Pressable style={s.qtyBtn} onPress={() => addToCart(item.id)}>
                      <Text style={s.qtyBtnText}>+</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable style={s.addBtn} onPress={() => addToCart(item.id)}>
                    <Text style={s.addBtnText}>+</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>

      {/* Sticky cart button */}
      {cartCount > 0 && (
        <SafeAreaView edges={["bottom"]} style={s.cartBar}>
          <Pressable style={s.cartBtn} onPress={() => navigation.navigate("Cart", { restaurantName: name })}>
            <IconCart size={18} color="#fff" />
            <Text style={s.cartBtnText}>View Cart ({cartCount})</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  hero: { width: "100%", height: 260 },
  content: { padding: 20 },
  name: { fontSize: 26, fontWeight: "800", color: "#fff", letterSpacing: -0.5 },
  cuisine: { fontSize: 14, color: "#666", marginTop: 4, marginBottom: 12 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  meta: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 13, color: "#888" },
  metaPrice: { marginLeft: "auto" as any, fontSize: 14, color: "#FF6B00", fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#1A1A1A", marginVertical: 20 },
  menuTitle: { fontSize: 18, fontWeight: "700", color: "#fff", marginBottom: 16 },
  menuItem: { flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 12 },
  menuImg: { width: 72, height: 72, borderRadius: 12 },
  menuInfo: { flex: 1 },
  menuName: { fontSize: 15, fontWeight: "600", color: "#fff" },
  menuDesc: { fontSize: 12, color: "#666", marginTop: 3, lineHeight: 17 },
  menuPrice: { fontSize: 14, color: "#FF6B00", fontWeight: "600", marginTop: 6 },
  addBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#FF6B00", alignItems: "center", justifyContent: "center" },
  addBtnText: { color: "#fff", fontSize: 20, lineHeight: 22 },
  qtyControl: { minWidth: 88, height: 34, borderRadius: 17, borderWidth: 1, borderColor: "#FF6B00", backgroundColor: "rgba(255,107,0,0.12)", flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "hidden" },
  qtyBtn: { width: 30, height: "100%", alignItems: "center", justifyContent: "center" },
  qtyBtnText: { color: "#FF6B00", fontSize: 20, lineHeight: 22, fontWeight: "800" },
  qtyCount: { minWidth: 20, textAlign: "center", color: "#fff", fontSize: 13, fontWeight: "900" },
  cartBar: { paddingHorizontal: 20, paddingBottom: 8, backgroundColor: "#000" },
  cartBtn: { backgroundColor: "#FF6B00", borderRadius: 14, paddingVertical: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  cartBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
