import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { IconCart, IconClock, IconHelp, IconLocation, IconSettings } from "../icons";

const FAQS = [
  { q: "Where is my refund?", a: "Refunds return to the original payment method after the restaurant or rider issue is approved." },
  { q: "Can I edit an order?", a: "You can still change quantities while the order is in cart. Placed orders show here for repeat ordering." },
  { q: "How do I report a missing item?", a: "Open Help and use the chat or call option with your latest order ID ready." },
];

export function MyOrdersScreen({ navigation }: any) {
  const { cartCount, orders, setCartCount } = useAuth();

  return (
    <SafeAreaView style={s.root} edges={["bottom"]}>
      <ScrollView contentContainerStyle={s.screenContent} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>My Orders</Text>
        <Text style={s.sub}>Track the active cart and repeat recent meals.</Text>

        {cartCount > 0 && (
          <Pressable
            style={s.liveOrder}
            onPress={() => navigation.getParent()?.navigate("Home", { screen: "Cart", params: { restaurantName: "Current restaurant" } })}
          >
            <View style={s.liveIcon}><IconCart size={20} color="#fff" /></View>
            <View style={s.liveCopy}>
              <Text style={s.liveLabel}>Active cart</Text>
              <Text style={s.liveTitle}>{cartCount} item{cartCount > 1 ? "s" : ""} waiting for checkout</Text>
            </View>
            <Text style={s.liveAction}>Open</Text>
          </Pressable>
        )}

        <Text style={s.sectionTitle}>Order history</Text>
        {orders.length === 0 ? (
          <View style={s.emptyOrders}>
            <Text style={s.emptyTitle}>No past orders yet</Text>
            <Text style={s.emptyText}>Place an order from the cart and it will show up here.</Text>
          </View>
        ) : orders.map((order) => (
          <View key={order.id} style={s.orderCard}>
            <View style={s.orderTop}>
              <Text style={s.orderPlace}>{order.place}</Text>
              <Text style={s.orderTotal}>₹{order.total}</Text>
            </View>
            <Text style={s.orderItems}>{order.items}</Text>
            <View style={s.orderMeta}>
              <View style={s.inlineMeta}>
                <IconClock size={13} color="#777" />
                <Text style={s.orderDate}>{order.date}</Text>
              </View>
              <Text style={s.orderId}>{order.id}</Text>
            </View>
            <Pressable
              style={s.reorderBtn}
              onPress={() => {
                setCartCount(Math.max(Number.parseInt(order.items, 10) || 1, 1));
                navigation.getParent()?.navigate("Home", { screen: "Cart", params: { restaurantName: order.place } });
              }}
            >
              <Text style={s.reorderText}>Reorder</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export function SettingsScreen() {
  const [pushAlerts, setPushAlerts] = useState(true);
  const [vegMode, setVegMode] = useState(false);
  const [lateNight, setLateNight] = useState(true);
  const [compactCards, setCompactCards] = useState(false);

  return (
    <SafeAreaView style={s.root} edges={["bottom"]}>
      <ScrollView contentContainerStyle={s.screenContent} showsVerticalScrollIndicator={false}>
        <View style={s.titleRow}>
          <View style={s.titleIcon}><IconSettings size={20} color="#FF6B00" /></View>
          <View>
            <Text style={s.title}>Settings</Text>
            <Text style={s.sub}>Delivery, preference and app controls</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>Preferences</Text>
        <SettingRow label="Order updates" sub="Push alerts for rider and kitchen status" value={pushAlerts} onChange={setPushAlerts} />
        <SettingRow label="Veg only discovery" sub="Prioritize vegetarian kitchens on browse" value={vegMode} onChange={setVegMode} />
        <SettingRow label="Late night picks" sub="Show kitchens open after midnight" value={lateNight} onChange={setLateNight} />
        <SettingRow label="Compact restaurant cards" sub="Fit more results in search and home" value={compactCards} onChange={setCompactCards} />

        <Text style={s.sectionTitle}>Saved details</Text>
        <View style={s.infoCard}>
          <View style={s.inlineMeta}>
            <IconLocation size={16} color="#FF6B00" />
            <Text style={s.infoTitle}>Home</Text>
          </View>
          <Text style={s.infoText}>New Delhi, India</Text>
          <Text style={s.infoHint}>Default delivery address</Text>
        </View>
        <View style={s.infoCard}>
          <Text style={s.infoTitle}>Payments</Text>
          <Text style={s.infoText}>UPI and cash on delivery enabled</Text>
          <Text style={s.infoHint}>Cards can be added during checkout</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function HelpScreen() {
  const [supportChannel, setSupportChannel] = useState<"chat" | "call" | null>(null);

  return (
    <SafeAreaView style={s.root} edges={["bottom"]}>
      <ScrollView contentContainerStyle={s.screenContent} showsVerticalScrollIndicator={false}>
        <View style={s.titleRow}>
          <View style={s.titleIcon}><IconHelp size={20} color="#FF6B00" /></View>
          <View>
            <Text style={s.title}>Help & Support</Text>
            <Text style={s.sub}>Quick support for orders and payments</Text>
          </View>
        </View>

        <View style={s.supportCard}>
          <Text style={s.supportTitle}>Need help with an order?</Text>
          <Text style={s.supportText}>Support is ready for delivery delays, missing items and payment issues.</Text>
          <View style={s.supportActions}>
            <Pressable style={s.primaryAction} onPress={() => setSupportChannel("chat")}>
              <Text style={s.primaryActionText}>Chat now</Text>
            </Pressable>
            <Pressable style={s.secondaryAction} onPress={() => setSupportChannel("call")}>
              <Text style={s.secondaryActionText}>Call support</Text>
            </Pressable>
          </View>
          {!!supportChannel && (
            <Text style={s.supportStatus}>
              {supportChannel === "chat" ? "Chat request opened. A support agent will join here." : "Call request queued. Keep your phone nearby."}
            </Text>
          )}
        </View>

        <Text style={s.sectionTitle}>Common questions</Text>
        {FAQS.map((faq) => (
          <View key={faq.q} style={s.faqCard}>
            <Text style={s.faqQuestion}>{faq.q}</Text>
            <Text style={s.faqAnswer}>{faq.a}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ label, sub, value, onChange }: {
  label: string;
  sub: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={s.settingRow}>
      <View style={s.settingCopy}>
        <Text style={s.settingLabel}>{label}</Text>
        <Text style={s.settingSub}>{sub}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#2A2A2A", true: "#FF6B00" }}
        thumbColor="#fff"
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  screenContent: { padding: 20, paddingBottom: 32 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  titleIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: "rgba(255,107,0,0.12)", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 25, fontWeight: "800", color: "#fff" },
  sub: { fontSize: 14, color: "#666", marginTop: 4 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "800", marginTop: 24, marginBottom: 12 },
  liveOrder: { marginTop: 20, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#FF6B00", borderRadius: 18, padding: 15 },
  liveIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: "rgba(0,0,0,0.16)", alignItems: "center", justifyContent: "center" },
  liveCopy: { flex: 1 },
  liveLabel: { color: "rgba(255,255,255,0.76)", fontSize: 11, fontWeight: "900", textTransform: "uppercase" },
  liveTitle: { color: "#fff", fontSize: 15, fontWeight: "800", marginTop: 3 },
  liveAction: { color: "#fff", fontSize: 13, fontWeight: "900" },
  emptyOrders: { marginTop: 24, borderRadius: 16, borderWidth: 1, borderColor: "#202020", backgroundColor: "#101010", padding: 20 },
  emptyTitle: { color: "#fff", fontSize: 17, fontWeight: "800" },
  emptyText: { color: "#666", fontSize: 13, lineHeight: 18, marginTop: 6 },
  orderCard: { marginBottom: 12, borderRadius: 16, borderWidth: 1, borderColor: "#202020", backgroundColor: "#101010", padding: 15 },
  orderTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  orderPlace: { flex: 1, color: "#fff", fontSize: 16, fontWeight: "800" },
  orderTotal: { color: "#FF6B00", fontSize: 14, fontWeight: "900" },
  orderItems: { color: "#777", fontSize: 13, marginTop: 6 },
  orderMeta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  inlineMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  orderDate: { color: "#777", fontSize: 12, fontWeight: "700" },
  orderId: { color: "#444", fontSize: 12, fontWeight: "700" },
  reorderBtn: { alignSelf: "flex-start", backgroundColor: "rgba(255,107,0,0.12)", borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8, marginTop: 14 },
  reorderText: { color: "#FF6B00", fontSize: 12, fontWeight: "900" },
  settingRow: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#101010", borderWidth: 1, borderColor: "#202020", borderRadius: 16, padding: 15, marginBottom: 10 },
  settingCopy: { flex: 1 },
  settingLabel: { color: "#fff", fontSize: 15, fontWeight: "800" },
  settingSub: { color: "#666", fontSize: 12, lineHeight: 17, marginTop: 4 },
  infoCard: { backgroundColor: "#101010", borderWidth: 1, borderColor: "#202020", borderRadius: 16, padding: 15, marginBottom: 10 },
  infoTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
  infoText: { color: "#ddd", fontSize: 13, marginTop: 8 },
  infoHint: { color: "#666", fontSize: 12, marginTop: 5 },
  supportCard: { marginTop: 20, backgroundColor: "#111", borderRadius: 18, borderWidth: 1, borderColor: "#242424", padding: 17 },
  supportTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  supportText: { color: "#777", fontSize: 13, lineHeight: 19, marginTop: 7 },
  supportActions: { flexDirection: "row", gap: 10, marginTop: 16 },
  supportStatus: { color: "#FF9B52", fontSize: 12, lineHeight: 17, fontWeight: "700", marginTop: 12 },
  primaryAction: { flex: 1, backgroundColor: "#FF6B00", borderRadius: 13, paddingVertical: 12, alignItems: "center" },
  primaryActionText: { color: "#fff", fontSize: 13, fontWeight: "900" },
  secondaryAction: { flex: 1, borderRadius: 13, borderWidth: 1, borderColor: "#2C2C2E", paddingVertical: 12, alignItems: "center" },
  secondaryActionText: { color: "#ddd", fontSize: 13, fontWeight: "800" },
  faqCard: { backgroundColor: "#101010", borderWidth: 1, borderColor: "#202020", borderRadius: 16, padding: 15, marginBottom: 10 },
  faqQuestion: { color: "#fff", fontSize: 14, fontWeight: "800" },
  faqAnswer: { color: "#666", fontSize: 13, lineHeight: 18, marginTop: 6 },
});
