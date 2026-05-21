import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { IconSearch, IconClock, IconStar } from "../icons";

const RESULTS = [
  { id: "1", name: "Burger Palace", cuisine: "Burgers, Fries", price: 199, rating: "4.8", time: "25 min", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" },
  { id: "2", name: "Pizza Town", cuisine: "Pizza, Pasta", price: 299, rating: "4.6", time: "30 min", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80" },
  { id: "3", name: "Kabab House", cuisine: "Kabab, Rolls", price: 249, rating: "4.9", time: "20 min", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80" },
  { id: "4", name: "Noodle Bar", cuisine: "Noodles, Momos", price: 229, rating: "4.4", time: "28 min", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80" },
];

const QUICK_SEARCHES = ["Biryani", "Coffee", "Rolls", "Pizza", "Momos", "Healthy"];
const TRENDING = ["Cafe under 15 min", "Dinner combos", "High protein bowls"];

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState("");
  const filtered = RESULTS.filter((item) => {
    const value = `${item.name} ${item.cuisine}`.toLowerCase();
    return value.includes(query.toLowerCase());
  });

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <View style={s.header}>
        <Text style={s.title}>Search</Text>
        <View style={s.inputRow}>
          <IconSearch size={18} color="#777" />
          <TextInput
            style={s.input}
            placeholder="Search dishes or restaurants"
            placeholderTextColor="#666"
            value={query}
            onChangeText={setQuery}
            autoFocus
            selectionColor="#FF6B00"
          />
        </View>
      </View>

      <FlatList
        data={query ? filtered : RESULTS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.list}
        ListHeaderComponent={
          <>
            <Text style={s.sectionTitle}>Quick searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
              {QUICK_SEARCHES.map((item) => (
                <Pressable key={item} style={s.chip} onPress={() => setQuery(item)}>
                  <Text style={s.chipText}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={s.sectionTitle}>Trending now</Text>
            <View style={s.trendingGrid}>
              {TRENDING.map((item) => (
                <Pressable key={item} style={s.trendingCard} onPress={() => setQuery(item.split(" ")[0])}>
                  <Text style={s.trendingText}>{item}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={s.sectionTitle}>{query ? "Results" : "Popular picks"}</Text>
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            style={s.result}
            onPress={() =>
              navigation.navigate("Home", {
                screen: "RestaurantDetail",
                params: { id: item.id, name: item.name, price: item.price, image: item.image, cuisine: item.cuisine, rating: item.rating, time: item.time },
              })
            }
          >
            <Image source={{ uri: item.image }} style={s.resultImg} />
            <View style={s.resultBody}>
              <Text style={s.resultName}>{item.name}</Text>
              <Text style={s.resultCuisine}>{item.cuisine}</Text>
              <View style={s.metaRow}>
                <IconStar size={12} color="#FF6B00" />
                <Text style={s.metaText}>{item.rating}</Text>
                <IconClock size={12} color="#777" />
                <Text style={s.metaText}>{item.time}</Text>
                <Text style={s.priceText}>₹{item.price}</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={s.empty}>No matches nearby</Text>}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14, gap: 16 },
  title: { fontSize: 28, fontWeight: "800", color: "#fff" },
  inputRow: { height: 48, flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#111", borderRadius: 14, paddingHorizontal: 14, borderWidth: 1, borderColor: "#2C2C2E" },
  input: { flex: 1, fontSize: 15, color: "#fff" },
  list: { paddingHorizontal: 20, paddingBottom: 28 },
  sectionTitle: { color: "#fff", fontSize: 17, fontWeight: "800", marginBottom: 12, marginTop: 10 },
  chips: { gap: 10, paddingBottom: 20 },
  chip: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 999, backgroundColor: "#111", borderWidth: 1, borderColor: "#2C2C2E" },
  chipText: { color: "#ddd", fontSize: 13, fontWeight: "700" },
  trendingGrid: { gap: 10, marginBottom: 16 },
  trendingCard: { backgroundColor: "#101010", borderWidth: 1, borderColor: "#222", borderRadius: 14, padding: 14 },
  trendingText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  result: { flexDirection: "row", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#111" },
  resultImg: { width: 72, height: 72, borderRadius: 14, backgroundColor: "#111" },
  resultBody: { flex: 1, justifyContent: "center" },
  resultName: { color: "#fff", fontSize: 16, fontWeight: "800", marginBottom: 3 },
  resultCuisine: { color: "#777", fontSize: 13, marginBottom: 9 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { color: "#888", fontSize: 12, fontWeight: "700" },
  priceText: { color: "#FF6B00", fontSize: 12, fontWeight: "800", marginLeft: "auto" },
  empty: { color: "#555", textAlign: "center", marginTop: 36, fontSize: 14 },
});
