import { StyleSheet } from "react-native";

// tokens

export const light = {
  bg: "#f5f5f0",
  surface: "#eeede8",
  border: "#ddddd8",
  text: "#1a1a1a",
  textSecondary: "#6b6b6b",
  textTertiary: "#a0a0a0",
  accent: "#1a1a1a",
  accentText: "#f5f5f0",
  placeholder: "#b0b0b0",
};

export const dark = {
  bg: "#1c1c1e",
  surface: "#2c2c2e",
  border: "#3a3a3c",
  text: "#e8e8e3",
  textSecondary: "#98989d",
  textTertiary: "#636366",
  accent: "#e8e8e3",
  accentText: "#1c1c1e",
  placeholder: "#636366",
};

export type Theme = typeof light;

// card base .. used with StyleSheet.compose to create phone and tablet variants

const cardBase = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

// tablet card .. adds extra horizontal padding via compose

const cardTablet = StyleSheet.create({
  card: {
    paddingHorizontal: 32,
  },
});

export const composedCardPhone = cardBase.card;
export const composedCardTablet = StyleSheet.compose(cardBase.card, cardTablet.card);

// list screen styles

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  themeLabel: {
    fontSize: 13,
  },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    padding: 0,
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  notePreview: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  noteDate: {
    fontSize: 11,
  },
  noteCount: {
    fontSize: 13,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultsContainer: {
    paddingTop: 60,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
  },
  // tablet grid card .. border and radius added on top of composed base
  cardTabletItem: {
    flex: 1,
    margin: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
  },
  columnWrapper: {
    paddingHorizontal: 12,
  },
  // three dot button on each card
  cardMenu: {
    padding: 6,
    marginLeft: 8,
    marginTop: -2,
  },
  cardMenuDots: {
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 18,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
  },
});

// note menu modal .. centered popup with edit, delete, cancel

export const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 48,
  },
  popup: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  button: {
    paddingVertical: 15,
    alignItems: "center",
  },
  editText: {
    fontSize: 16,
  },
  deleteText: {
    fontSize: 16,
    color: "#e53935",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

// editor screen styles

export const editorStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 160,
    justifyContent: "flex-end",
  },
  headerOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  backLabel: {
    fontSize: 15,
    color: "#ffffff",
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  saveButtonDisabled: {
    opacity: 0.4,
  },
  saveLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  headerDate: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  body: {
    flex: 1,
    padding: 20,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: 16,
    padding: 0,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    padding: 0,
    textAlignVertical: "top",
  },
});
