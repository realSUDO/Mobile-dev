import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Modal,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useMemo, useRef, useEffect } from "react";

import {
  light,
  dark,
  listStyles as ls,
  editorStyles as es,
  modalStyles as ms,
  composedCardPhone,
  composedCardTablet,
  type Theme,
} from "./styles/notes";
import { SearchIcon, PlusIcon, ChevronLeftIcon, NoteIcon, VerticalDotsIcon } from "./components/Icons";

// types

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

// helpers

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function preview(body: string): string {
  const trimmed = body.trim();
  return trimmed.length > 90 ? trimmed.slice(0, 90) + "..." : trimmed || "No additional text";
}

const HEADER_DARK = require("../../assets/header-bg.jpg");
const HEADER_LIGHT = require("../../assets/header-bg-light.jpg");

// note menu .. shown when user taps the three dots on a card

function NoteMenu({
  note,
  t,
  onEdit,
  onDelete,
  onClose,
}: {
  note: Note;
  t: Theme;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={ms.backdrop} onPress={onClose}>
        <Pressable style={[ms.popup, { backgroundColor: t.surface }]} onPress={() => {}}>

          <Pressable
            style={({ pressed }) => [ms.button, { opacity: pressed ? 0.5 : 1 }]}
            onPress={onEdit}
          >
            <Text style={[ms.editText, { color: t.text }]}>Edit</Text>
          </Pressable>

          <View style={[ms.divider, { backgroundColor: t.border }]} />

          <Pressable
            style={({ pressed }) => [ms.button, { opacity: pressed ? 0.5 : 1 }]}
            onPress={onDelete}
          >
            <Text style={ms.deleteText}>Delete</Text>
          </Pressable>

          <View style={[ms.divider, { backgroundColor: t.border }]} />

          <Pressable
            style={({ pressed }) => [ms.button, { opacity: pressed ? 0.5 : 1 }]}
            onPress={onClose}
          >
            <Text style={[ms.cancelText, { color: t.text }]}>Cancel</Text>
          </Pressable>

        </Pressable>
      </Pressable>
    </Modal>
  );
}

// main screen .. renders list view or editor view based on state

export default function NotesScreen() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");
  const t: Theme = isDark ? dark : light;

  // animated value for the toggle thumb .. slides between 0 and 1
  const toggleAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isDark ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isDark]);

  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const numColumns = isTablet ? 2 : 1;
  const cardStyle = isTablet ? composedCardTablet : composedCardPhone;

  const [view, setView] = useState<"list" | "editor">("list");
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");
  const [menuNote, setMenuNote] = useState<Note | null>(null);

  // editor state .. editingId null means new note
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editDate, setEditDate] = useState("");

  const insets = useSafeAreaInsets();

  // filtered list .. recalculates only when query or notes change
  const filtered = useMemo(() => {
    if (!query.trim()) return notes;
    const q = query.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
    );
  }, [query, notes]);

  // actions

  const openNew = () => {
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
    setEditDate(formatDate());
    setView("editor");
  };

  const openEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditBody(note.body);
    setEditDate(note.createdAt);
    setView("editor");
  };

  const saveNote = () => {
    if (!editTitle.trim()) return;
    if (editingId) {
      setNotes(notes.map((n) =>
        n.id === editingId ? { ...n, title: editTitle.trim(), body: editBody } : n
      ));
    } else {
      setNotes([
        { id: Date.now().toString(), title: editTitle.trim(), body: editBody, createdAt: editDate },
        ...notes,
      ]);
    }
    setView("list");
  };

  const confirmDelete = () => {
    if (!menuNote) return;
    setNotes(notes.filter((n) => n.id !== menuNote.id));
    setMenuNote(null);
  };

  // flatten titleInput style to read fontSize for maxFontSizeMultiplier
  const flatTitleStyle = StyleSheet.flatten(es.titleInput);
  const titleMultiplierCap = 1.3;

  // list view

  if (view === "list") {
    return (
      <>
        <StatusBar style={isDark ? "light" : "dark"} />
        <SafeAreaView style={[ls.container, { backgroundColor: t.bg }]} edges={["top"]}>

          <View style={[ls.header, { borderBottomColor: t.border }]}>
            <View style={ls.headerRow}>
              <View>
                <Text style={[ls.title, { color: t.text }]}>Notes</Text>
                {notes.length > 0 && (
                  <Text style={[ls.noteCount, { color: t.textTertiary }]}>
                    {notes.length} {notes.length === 1 ? "note" : "notes"}
                  </Text>
                )}
              </View>
              <View style={ls.themeRow}>
                <Text style={[ls.themeLabel, { color: t.textTertiary }]}>
                  {isDark ? "Dark" : "Light"}
                </Text>
                <Pressable
                  onPress={() => setIsDark(v => !v)}
                  style={[ls.toggle, { backgroundColor: t.border }]}
                  android_ripple={null}
                >
                  <Animated.View style={[
                    ls.toggleThumb,
                    { backgroundColor: t.text, transform: [{ translateX: toggleAnim.interpolate({ inputRange: [0, 1], outputRange: [2, 20] }) }] },
                  ]} />
                </Pressable>
              </View>
            </View>

            <View style={[ls.searchContainer, { backgroundColor: t.surface }]}>
              <SearchIcon color={t.textTertiary} />
              <TextInput
                style={[ls.searchInput, { color: t.text }]}
                value={query}
                onChangeText={setQuery}
                placeholder="Search notes..."
                placeholderTextColor={t.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                returnKeyType="search"
              />
            </View>
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            key={numColumns}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  cardStyle,
                  isTablet && ls.cardTabletItem,
                  { borderColor: t.border, backgroundColor: pressed ? t.surface : t.bg },
                ]}
                onPress={() => openEdit(item)}
              >
                <View style={ls.cardRow}>
                  <Text style={[ls.noteTitle, { color: t.text, flex: 1 }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Pressable
                    style={({ pressed }) => [ls.cardMenu, { opacity: pressed ? 0.4 : 1 }]}
                    onPress={() => setMenuNote(item)}
                    hitSlop={8}
                  >
                    <VerticalDotsIcon color={t.textTertiary} />
                  </Pressable>
                </View>

                <Text style={[ls.notePreview, { color: t.textSecondary }]} numberOfLines={2}>
                  {preview(item.body)}
                </Text>
                <Text style={[ls.noteDate, { color: t.textTertiary }]}>{item.createdAt}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={isTablet ? null : () => (
              <View style={[ls.separator, { backgroundColor: t.border }]} />
            )}
            ListEmptyComponent={
              query.trim() ? (
                <View style={ls.noResultsContainer}>
                  <Text style={[ls.noResultsText, { color: t.textTertiary }]}>
                    No notes match "{query}"
                  </Text>
                </View>
              ) : (
                <View style={ls.emptyContainer}>
                  <NoteIcon color={t.textTertiary} />
                  <Text style={[ls.emptyTitle, { color: t.text }]}>No notes yet</Text>
                  <Text style={[ls.emptySubtitle, { color: t.textTertiary }]}>
                    Tap + to write your first note
                  </Text>
                </View>
              )
            }
            contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 80 }}
            columnWrapperStyle={isTablet ? ls.columnWrapper : undefined}
            keyboardShouldPersistTaps="handled"
          />

          <Pressable
            style={({ pressed }) => [
              ls.fab,
              { backgroundColor: t.accent, bottom: insets.bottom + 20, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={openNew}
            hitSlop={8}
          >
            <PlusIcon color={t.accentText} />
          </Pressable>

          {menuNote && (
            <NoteMenu
              note={menuNote}
              t={t}
              onEdit={() => { openEdit(menuNote); setMenuNote(null); }}
              onDelete={confirmDelete}
              onClose={() => setMenuNote(null)}
            />
          )}

        </SafeAreaView>
      </>
    );
  }

  // editor view

  const overlayColor = isDark ? "rgba(0,0,0,0.58)" : "rgba(0,0,0,0.42)";

  return (
    <>
      <StatusBar style="light" />
      <View style={[es.container, { backgroundColor: t.bg }]}>

        <ImageBackground
          source={isDark ? HEADER_DARK : HEADER_LIGHT}
          style={[es.headerImage, { paddingTop: insets.top }]}
          resizeMode="cover"
        >
          <View style={[es.headerOverlay, { backgroundColor: overlayColor }]}>
            <View style={es.headerActions}>
              <Pressable
                style={({ pressed }) => [es.backButton, { opacity: pressed ? 0.6 : 1 }]}
                onPress={() => setView("list")}
                hitSlop={12}
              >
                <ChevronLeftIcon />
                <Text style={es.backLabel}>Notes</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  es.saveButton,
                  !editTitle.trim() && es.saveButtonDisabled,
                  { opacity: pressed ? 0.7 : 1 },
                ]}
                onPress={saveNote}
                disabled={!editTitle.trim()}
                hitSlop={8}
              >
                <Text style={es.saveLabel}>{editingId ? "Update" : "Save"}</Text>
              </Pressable>
            </View>

            <Text style={es.headerDate}>{editDate}</Text>
          </View>
        </ImageBackground>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={[es.body, { backgroundColor: t.bg }]}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={[es.titleInput, { color: t.text }]}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Title"
              placeholderTextColor={t.placeholder}
              autoFocus={!editingId}
              returnKeyType="next"
              maxFontSizeMultiplier={titleMultiplierCap}
            />

            <View style={[es.divider, { backgroundColor: t.border }]} />

            <TextInput
              style={[es.bodyInput, { color: t.text }]}
              value={editBody}
              onChangeText={setEditBody}
              placeholder="Start writing..."
              placeholderTextColor={t.placeholder}
              multiline
              autoCorrect
              autoCapitalize="sentences"
            />
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    </>
  );
}
