import { View, Text, FlatList, Pressable, StyleSheet, Image, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSearch, IconStar, IconClock, IconLocation, IconBolt, IconRestaurant } from "../icons";

const CATEGORIES = [
  { label: "Cafe", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80" },
  { label: "Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&q=80" },
  { label: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" },
  { label: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80" },
  { label: "Kabab", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80" },
  { label: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80" },
];

const RESTAURANTS = [
  { id: "1", name: "Burger Palace", cuisine: "Burgers, Fries, Shakes", price: 199, rating: "4.8", time: "25 min", offer: "40% OFF", distance: "1.2 km", type: "nonveg", category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
  { id: "2", name: "Pizza Town", cuisine: "Wood-fired Pizza, Pasta", price: 299, rating: "4.6", time: "30 min", offer: "Free delivery", distance: "2.1 km", type: "veg", category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80" },
  { id: "3", name: "Kabab House", cuisine: "Kabab, Rolls, North Indian", price: 249, rating: "4.9", time: "20 min", offer: "Top rated", distance: "900 m", type: "nonveg", category: "Kabab", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80" },
  { id: "4", name: "Sushi World", cuisine: "Sushi, Ramen, Bowls", price: 449, rating: "4.7", time: "35 min", offer: "Fresh picks", distance: "3.4 km", type: "nonveg", category: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80" },
  { id: "5", name: "Taco Fiesta", cuisine: "Tacos, Burritos, Nachos", price: 179, rating: "4.5", time: "10 min", offer: "Combo deals", distance: "1.8 km", type: "veg", category: "Cafe", image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&q=80" },
  { id: "6", name: "Noodle Bar", cuisine: "Noodles, Momos, Asian", price: 229, rating: "4.4", time: "11 min", offer: "Fastest", distance: "2.8 km", type: "veg", category: "Cafe", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80" },
  { id: "7", name: "Old Delhi Biryani", cuisine: "Chicken Biryani, Kebabs, Raita", price: 279, rating: "4.8", time: "24 min", offer: "Bestseller", distance: "1.5 km", type: "nonveg", category: "Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80" },
  { id: "8", name: "Dum Pot Biryani", cuisine: "Mutton Dum, Chicken 65, Salan", price: 349, rating: "4.7", time: "32 min", offer: "₹100 OFF", distance: "2.6 km", type: "nonveg", category: "Biryani", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&q=80" },
  { id: "9", name: "Green Bowl Studio", cuisine: "Salads, Millet Bowls, Smoothies", price: 239, rating: "4.6", time: "9 min", offer: "Healthy picks", distance: "1.1 km", type: "veg", category: "Cafe", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
  { id: "10", name: "Slice Theory", cuisine: "Margherita, Truffle Pizza, Garlic Bread", price: 319, rating: "4.8", time: "27 min", offer: "2 for 1", distance: "1.9 km", type: "veg", category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
  { id: "11", name: "Smash Bun Co.", cuisine: "Chicken Burgers, Tenders, Fries", price: 259, rating: "4.7", time: "21 min", offer: "Quick bite", distance: "850 m", type: "nonveg", category: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80" },
  { id: "12", name: "Royal Tandoor", cuisine: "Tikkas, Seekh Kabab, Butter Chicken", price: 329, rating: "4.9", time: "29 min", offer: "Chef special", distance: "2.3 km", type: "nonveg", category: "Kabab", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
  { id: "13", name: "Saffron Veg Dum", cuisine: "Paneer Biryani, Veg Dum, Mirchi Salan", price: 249, rating: "4.5", time: "26 min", offer: "Veg feast", distance: "2.0 km", type: "veg", category: "Biryani", image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=500&q=80" },
  { id: "14", name: "Miso Moon", cuisine: "Sushi Rolls, Katsu, Rice Bowls", price: 399, rating: "4.6", time: "34 min", offer: "New", distance: "3.1 km", type: "nonveg", category: "Sushi", image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500&q=80" },
  { id: "15", name: "Cafe Pour House", cuisine: "Coffee, Sandwiches, Desserts", price: 189, rating: "4.7", time: "8 min", offer: "8 min", distance: "700 m", type: "veg", category: "Cafe", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80" },
  { id: "16", name: "Plant Patty Lab", cuisine: "Veg Burgers, Loaded Fries, Shakes", price: 219, rating: "4.5", time: "23 min", offer: "Free fries", distance: "1.7 km", type: "veg", category: "Burger", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=500&q=80" },
  { id: "17", name: "Fire Skewer Club", cuisine: "Grilled Kabab, Wings, Rumali Rolls", price: 289, rating: "4.8", time: "22 min", offer: "Smoky picks", distance: "1.4 km", type: "nonveg", category: "Kabab", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&q=80" },
  { id: "18", name: "Tokyo Veg Roll", cuisine: "Avocado Sushi, Ramen, Gyoza", price: 359, rating: "4.4", time: "31 min", offer: "Fresh rolls", distance: "2.9 km", type: "veg", category: "Sushi", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80" },
  { id: "19", name: "Pepperoni District", cuisine: "Pepperoni Pizza, Wings, Dips", price: 379, rating: "4.7", time: "28 min", offer: "Hot deal", distance: "2.2 km", type: "nonveg", category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
  { id: "20", name: "South Brew Cafe", cuisine: "Filter Coffee, Idli Bowls, Toasts", price: 159, rating: "4.6", time: "10 min", offer: "Morning pick", distance: "950 m", type: "veg", category: "Cafe", image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500&q=80" },
];

export default function HomeScreen({ navigation }: any) {
  const [foodType, setFoodType] = useState<"veg" | "nonveg">("nonveg");
  const [category, setCategory] = useState<string | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);
  const visibleRestaurants = RESTAURANTS.filter((item) => {
    const typeMatches = item.type === foodType;
    const categoryMatches = !category || item.category === category;
    return typeMatches && categoryMatches;
  });

  const openRestaurant = (item: (typeof RESTAURANTS)[number]) => {
    navigation.navigate("RestaurantDetail", {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      cuisine: item.cuisine,
      rating: item.rating,
      time: item.time,
    });
  };

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <View style={s.header}>
        <View style={s.locationBlock}>
          <View style={s.locationRow}>
            <IconLocation size={14} color="#FF6B00" />
            <Text style={s.locationLabel}>18 min delivery</Text>
          </View>
          <Text style={s.locationCity}>New Delhi, India</Text>
        </View>
        <View style={s.foodToggle}>
          <Pressable
            style={[s.toggleOption, foodType === "veg" && s.toggleVegActive]}
            onPress={() => setFoodType("veg")}
          >
            <View style={[s.foodDot, s.vegDot]} />
            <Text style={[s.toggleText, foodType === "veg" && s.toggleActiveText]}>Veg</Text>
          </Pressable>
          <Pressable
            style={[s.toggleOption, foodType === "nonveg" && s.toggleNonVegActive]}
            onPress={() => setFoodType("nonveg")}
          >
            <View style={[s.foodDot, s.nonVegDot]} />
            <Text style={[s.toggleText, foodType === "nonveg" && s.toggleActiveText]}>Non-veg</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={s.searchBar} onPress={() => navigation.navigate("Search")}>
        <IconSearch size={18} color="#777" />
        <Text style={s.searchText}>Search for biryani, coffee, burgers</Text>
      </Pressable>

      <FlatList
        data={visibleRestaurants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listContent}
        ListHeaderComponent={
          <>
            <View style={s.promoRow}>
              <Pressable style={[s.promoCard, s.promoPrimary, selectedPromo === "cafe" && s.promoSelected]} onPress={() => { setFoodType("veg"); setCategory("Cafe"); setSelectedPromo(selectedPromo === "cafe" ? null : "cafe"); }}>
                <View style={s.wrapidoTop}>
                  <View style={s.promoIcon}>
                    <IconBolt size={18} color="#fff" />
                  </View>
                  <View style={s.wrapidoTime}>
                    <Text style={s.wrapidoTimeValue}>10</Text>
                    <Text style={s.wrapidoTimeUnit}>mins</Text>
                  </View>
                </View>
                <Text style={s.wrapidoTitle}>Wrapido</Text>
                <Text style={s.promoText}>Wraps and snack runs, delivered quick</Text>
              </Pressable>
              <Pressable style={[s.promoCard, s.promoGreen, selectedPromo === "fresh" && s.promoSelected]} onPress={() => { setFoodType("veg"); setCategory(null); setSelectedPromo(selectedPromo === "fresh" ? null : "fresh"); }}>
                <View style={[s.promoIcon, s.promoGreenIcon]}>
                  <IconRestaurant size={18} color="#fff" />
                </View>
                <Text style={s.promoTitle}>Fresh bowls</Text>
                <Text style={s.promoText}>Light meals from top kitchens nearby</Text>
              </Pressable>
            </View>

            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Eat what you like</Text>
              <Text style={s.sectionAction} onPress={() => { setCategory(null); setSelectedPromo(null); }}>All</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.catContent}>
              {CATEGORIES.map((cat) => (
                <Pressable key={cat.label} style={s.catItem} onPress={() => { setCategory(cat.label); setSelectedPromo(null); }}>
                  <Image source={{ uri: cat.image }} style={s.catImg} />
                  <Text style={[s.catText, category === cat.label && s.catTextActive]}>{cat.label}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Recommended near you</Text>
              <Text style={s.sectionAction}>Sort</Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <Pressable style={s.card} onPress={() => openRestaurant(item)}>
            <View style={s.imageWrap}>
              <Image source={{ uri: item.image }} style={s.cardImg} />
              <View style={s.offerPill}>
                <Text style={s.offerText}>{item.offer}</Text>
              </View>
            </View>
            <View style={s.cardBody}>
              <View style={s.cardTitleRow}>
                <Text style={s.cardName} numberOfLines={1}>{item.name}</Text>
                <View style={s.ratingPill}>
                  <IconStar size={11} color="#fff" />
                  <Text style={s.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={s.cardCuisine} numberOfLines={1}>{item.cuisine}</Text>
              <View style={s.cardMeta}>
                <View style={s.metaRow}>
                  <IconClock size={13} color="#777" />
                  <Text style={s.metaText}>{item.time}</Text>
                </View>
                <Text style={s.dot}>.</Text>
                <Text style={s.metaText}>{item.distance}</Text>
                <Text style={s.priceText}>From ₹{item.price}</Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={s.emptyResults}>
            <Text style={s.emptyTitle}>No {foodType} picks here yet</Text>
            <Text style={s.emptyText} onPress={() => setCategory(null)}>Clear category filter</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12, gap: 14 },
  locationBlock: { flex: 1, gap: 3 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  locationLabel: { fontSize: 11, color: "#FF6B00", fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.4 },
  locationCity: { fontSize: 18, fontWeight: "800", color: "#fff" },
  foodToggle: { flexDirection: "row", alignItems: "center", backgroundColor: "#111", borderRadius: 999, borderWidth: 1, borderColor: "#2C2C2E", padding: 3 },
  toggleOption: { height: 30, paddingHorizontal: 9, borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 5 },
  toggleVegActive: { backgroundColor: "#159947" },
  toggleNonVegActive: { backgroundColor: "#FF6B00" },
  toggleText: { color: "#888", fontSize: 11, fontWeight: "800" },
  toggleActiveText: { color: "#fff" },
  foodDot: { width: 7, height: 7, borderRadius: 4 },
  vegDot: { backgroundColor: "#22C55E" },
  nonVegDot: { backgroundColor: "#FF6B00" },

  searchBar: {
    marginHorizontal: 20,
    marginBottom: 16,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#2C2C2E",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
  },
  searchText: { color: "#777", fontSize: 14, fontWeight: "500" },
  listContent: { paddingBottom: 28 },

  promoRow: { flexDirection: "row", gap: 12, paddingHorizontal: 20, marginBottom: 24 },
  promoCard: {
    flex: 1,
    minHeight: 116,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#242424",
    justifyContent: "flex-end",
  },
  promoPrimary: { backgroundColor: "#FF6B00", borderColor: "#FF6B00" },
  promoGreen: { backgroundColor: "#159947", borderColor: "#159947" },
  promoSelected: { borderWidth: 2, borderColor: "#fff" },
  promoIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.18)", alignItems: "center", justifyContent: "center", marginBottom: 14 },
  wrapidoTop: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  wrapidoTime: { minWidth: 54, paddingHorizontal: 8, paddingVertical: 7, borderRadius: 12, backgroundColor: "#fff", alignItems: "center" },
  wrapidoTimeValue: { color: "#FF6B00", fontSize: 20, lineHeight: 20, fontWeight: "900" },
  wrapidoTimeUnit: { color: "#FF6B00", fontSize: 10, lineHeight: 12, fontWeight: "900", textTransform: "uppercase" },
  promoGreenIcon: { backgroundColor: "rgba(0,0,0,0.16)" },
  wrapidoTitle: { fontSize: 18, fontWeight: "900", color: "#fff", marginBottom: 4 },
  promoTitle: { fontSize: 16, fontWeight: "800", color: "#fff", marginBottom: 4 },
  promoText: { fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 16 },

  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#fff" },
  sectionAction: { fontSize: 13, color: "#FF6B00", fontWeight: "700" },

  catContent: { paddingHorizontal: 20, gap: 14, paddingBottom: 26 },
  catItem: { width: 76, alignItems: "center", gap: 9 },
  catImg: { width: 68, height: 68, borderRadius: 34, borderWidth: 1, borderColor: "#2C2C2E" },
  catText: { color: "#ddd", fontSize: 12, fontWeight: "700" },
  catTextActive: { color: "#FF6B00" },
  emptyResults: { marginHorizontal: 20, alignItems: "center", padding: 24, borderRadius: 16, backgroundColor: "#101010", borderWidth: 1, borderColor: "#202020" },
  emptyTitle: { color: "#fff", fontSize: 15, fontWeight: "800" },
  emptyText: { color: "#FF6B00", fontSize: 13, fontWeight: "800", marginTop: 8 },

  card: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#0F0F0F",
    borderWidth: 1,
    borderColor: "#1F1F1F",
  },
  imageWrap: { width: 104, height: 104, borderRadius: 13, overflow: "hidden", backgroundColor: "#171717" },
  cardImg: { width: "100%", height: "100%" },
  offerPill: { position: "absolute", left: 7, bottom: 7, backgroundColor: "#FF6B00", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 4 },
  offerText: { color: "#fff", fontSize: 10, fontWeight: "900" },
  cardBody: { flex: 1, paddingVertical: 3 },
  cardTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 },
  cardName: { flex: 1, color: "#fff", fontSize: 16, fontWeight: "800" },
  ratingPill: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "#159947", borderRadius: 8, paddingHorizontal: 7, paddingVertical: 4 },
  ratingText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  cardCuisine: { color: "#777", fontSize: 13, marginBottom: 12 },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 7 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { color: "#888", fontSize: 12, fontWeight: "600" },
  dot: { color: "#555", fontSize: 14, lineHeight: 14 },
  priceText: { color: "#FF6B00", fontSize: 12, fontWeight: "800", marginLeft: "auto" },
});
