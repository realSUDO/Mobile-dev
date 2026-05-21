import { View, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { IconRestaurant, IconBolt, IconLocation } from "../icons";

const HERO = "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=90";

const FEATURES = [
  { Icon: IconRestaurant, label: "1000+ restaurants near you" },
  { Icon: IconBolt,       label: "Delivered in 30 minutes" },
  { Icon: IconLocation,   label: "Live order tracking" },
];

export default function OnboardingScreen({ navigation }: any) {
  return (
    <ImageBackground source={{ uri: HERO }} style={s.root} resizeMode="cover">
      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)", "#000"]}
        locations={[0, 0.48, 0.82]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <SafeAreaView style={s.safe} edges={["bottom"]}>
        <View style={s.content}>
          <Text style={s.logo}>Bytes.</Text>
          <Text style={s.headline}>{"Hungry?\nWe got you."}</Text>

          <View style={s.features}>
            {FEATURES.map(({ Icon, label }) => (
              <View key={label} style={s.row}>
                <View style={s.iconWrap}><Icon size={18} color="#FF6B00" /></View>
                <Text style={s.featureText}>{label}</Text>
              </View>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [s.btn, { opacity: pressed ? 0.85 : 1 }]}
            onPress={() => navigation.replace("MainTabs")}
          >
            <Text style={s.btnText}>Get Started</Text>
          </Pressable>

          <Text style={s.skip} onPress={() => navigation.replace("MainTabs")}>
            Skip for now
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  safe: { flex: 1, justifyContent: "flex-end" },
  content: { paddingHorizontal: 28, paddingBottom: 36 },
  logo: { fontSize: 20, fontWeight: "800", color: "#FF6B00", letterSpacing: -0.5, marginBottom: 14 },
  headline: { fontSize: 46, fontWeight: "800", color: "#fff", letterSpacing: -2, lineHeight: 50, marginBottom: 32 },
  features: { gap: 14, marginBottom: 40 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(255,107,0,0.12)", alignItems: "center", justifyContent: "center" },
  featureText: { fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: "500" },
  btn: { backgroundColor: "#FF6B00", borderRadius: 14, paddingVertical: 17, alignItems: "center", marginBottom: 14 },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  skip: { color: "#444", fontSize: 14, textAlign: "center" },
});
