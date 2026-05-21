import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function CartScreen({ route, navigation }: any) {
  const restaurantName = route.params?.restaurantName ?? "Current restaurant";
  const { cartCount, setCartCount, addOrder } = useAuth();
  const itemPrice = 229;
  const deliveryFee = 39;

  const placeOrder = async () => {
    if (cartCount === 0) return;

    await addOrder({
      place: restaurantName,
      items: `${cartCount} menu item${cartCount > 1 ? "s" : ""}`,
      total: cartCount * itemPrice + deliveryFee,
    });
    setCartCount(0);
    navigation.replace("OrderPlaced", { restaurantName });
  };

  return (
    <SafeAreaView style={s.root} edges={["bottom"]}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.title}>Your Cart</Text>
        <Text style={s.sub}>From {restaurantName}</Text>

        <View style={s.divider} />

        {cartCount > 0 ? (
          <View style={s.item}>
            <View style={s.itemInfo}>
              <Text style={s.itemName}>Menu items</Text>
              <Text style={s.itemDesc}>{cartCount}x from {restaurantName}</Text>
            </View>
            <View style={s.qtyRow}>
              <Pressable style={s.qtyBtn} onPress={() => setCartCount((count) => Math.max(count - 1, 0))}>
                <Text style={s.qtyText}>-</Text>
              </Pressable>
              <Text style={s.qtyCount}>{cartCount}</Text>
              <Pressable style={s.qtyBtn} onPress={() => setCartCount((count) => count + 1)}>
                <Text style={s.qtyText}>+</Text>
              </Pressable>
            </View>
            <Text style={s.itemPrice}>₹{cartCount * itemPrice}</Text>
          </View>
        ) : (
          <View style={s.emptyCart}>
            <Text style={s.emptyTitle}>Cart is empty</Text>
            <Text style={s.emptyText}>Add a menu item to place an order.</Text>
          </View>
        )}

        <View style={s.divider} />

        <View style={s.summaryRow}>
          <Text style={s.summaryLabel}>Subtotal</Text>
          <Text style={s.summaryValue}>₹{cartCount * itemPrice}</Text>
        </View>
        <View style={s.summaryRow}>
          <Text style={s.summaryLabel}>Delivery fee</Text>
          <Text style={s.summaryValue}>₹{deliveryFee}</Text>
        </View>
        <View style={[s.summaryRow, { marginTop: 8 }]}>
          <Text style={[s.summaryLabel, { color: "#fff", fontWeight: "700" }]}>Total</Text>
          <Text style={[s.summaryValue, { color: "#FF6B00", fontWeight: "700" }]}>
            ₹{cartCount * itemPrice + deliveryFee}
          </Text>
        </View>
      </ScrollView>

      <View style={s.footer}>
        <Pressable style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backText}>Keep Browsing</Text>
        </Pressable>
        <Pressable style={[s.orderBtn, cartCount === 0 && s.orderBtnDisabled]} onPress={placeOrder} disabled={cartCount === 0}>
          <Text style={s.orderText}>Place Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  scroll: { padding: 20 },
  title: { fontSize: 26, fontWeight: "800", color: "#fff", letterSpacing: -0.5 },
  sub: { fontSize: 14, color: "#666", marginTop: 4 },
  divider: { height: 1, backgroundColor: "#1A1A1A", marginVertical: 20 },
  item: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: "600", color: "#fff" },
  itemDesc: { fontSize: 12, color: "#666", marginTop: 2 },
  itemPrice: { fontSize: 15, color: "#fff", fontWeight: "600" },
  qtyRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#2C2C2E", borderRadius: 999, overflow: "hidden" },
  qtyBtn: { width: 30, height: 30, alignItems: "center", justifyContent: "center", backgroundColor: "#131313" },
  qtyText: { color: "#FF6B00", fontSize: 18, fontWeight: "900" },
  qtyCount: { minWidth: 24, textAlign: "center", color: "#fff", fontSize: 13, fontWeight: "800" },
  emptyCart: { alignItems: "center", borderRadius: 16, borderWidth: 1, borderColor: "#202020", padding: 24, backgroundColor: "#101010" },
  emptyTitle: { color: "#fff", fontSize: 17, fontWeight: "800" },
  emptyText: { color: "#666", fontSize: 13, marginTop: 5 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: "#666" },
  summaryValue: { fontSize: 14, color: "#fff" },
  footer: { flexDirection: "row", gap: 12, padding: 20, borderTopWidth: 1, borderTopColor: "#1A1A1A" },
  backBtn: { flex: 1, paddingVertical: 15, borderRadius: 14, borderWidth: 1, borderColor: "#2C2C2E", alignItems: "center" },
  backText: { color: "#888", fontSize: 15, fontWeight: "600" },
  orderBtn: { flex: 1, paddingVertical: 15, borderRadius: 14, backgroundColor: "#FF6B00", alignItems: "center" },
  orderBtnDisabled: { opacity: 0.4 },
  orderText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
