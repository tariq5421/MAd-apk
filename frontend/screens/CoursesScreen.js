import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const BASE_URL = "http://localhost:3000";

export default function CoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [randomCourse, setRandomCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRandom, setShowRandom] = useState(false);
  const hasLoadedRef = useRef(false);

  // Initial load only once
  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchAllCourses();
      hasLoadedRef.current = true;
    }
  }, []);

  // Only reload on focus if courses are empty (e.g., after error or initial failure)
  useFocusEffect(
    React.useCallback(() => {
      if (courses.length === 0 && !loading && !error) {
        fetchAllCourses();
      }
    }, [courses.length, loading, error])
  );

  async function fetchAllCourses() {
    setLoading(true);
    setError("");
    setRandomCourse(null);
    setShowRandom(false);
    try {
      const res = await fetch(`${BASE_URL}/courses`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load courses");
      const fetchedCourses = json.items || [];
      setCourses(fetchedCourses);
      // Ensure we mark as loaded
      if (fetchedCourses.length > 0) {
        hasLoadedRef.current = true;
      }
    } catch (e) {
      setError(e.message);
      console.error("Error fetching courses:", e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRandomCourse() {
    setLoading(true);
    setError("");
    setCourses([]);
    setShowRandom(true);
    try {
      const res = await fetch(`${BASE_URL}/courses/random`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load random course");
      setRandomCourse(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => {
    const opacity = new Animated.Value(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    const levelColors = {
      Beginner: "#3b82f6",
      Intermediate: "#eab308",
      Advanced: "#ef4444"
    };

    return (
      <Animated.View style={[styles.card, { opacity }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColors[item.level] || "#6b7280" }]}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.instructor}>👨‍🏫 {item.instructor}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.duration}>⏱️ {item.duration}</Text>
          <Text style={styles.schedule}>📅 {item.schedule}</Text>
        </View>
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
        <View style={styles.priceStockRow}>
          <Text style={styles.price}>Rs. {item.fee.toLocaleString()}</Text>
          <Text style={[styles.stock, { color: item.available ? "#22c55e" : "#ef4444" }]}>
            {item.available ? "✅ Available" : "❌ Full"}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderRandomCourse = () => {
    if (!randomCourse) return null;
    const scale = new Animated.Value(0.9);
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    const levelColors = {
      Beginner: "#3b82f6",
      Intermediate: "#eab308",
      Advanced: "#ef4444"
    };

    return (
      <Animated.View style={[styles.highlightCard, { transform: [{ scale }] }]}>
        <Text style={styles.featuredLabel}>⭐ Featured Course</Text>
        <View style={styles.cardHeader}>
          <Text style={styles.highlightName}>{randomCourse.name}</Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColors[randomCourse.level] || "#6b7280" }]}>
            <Text style={styles.levelText}>{randomCourse.level}</Text>
          </View>
        </View>
        <Text style={styles.subject}>{randomCourse.subject}</Text>
        <Text style={styles.instructor}>👨‍🏫 {randomCourse.instructor}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.duration}>⏱️ {randomCourse.duration}</Text>
          <Text style={styles.schedule}>📅 {randomCourse.schedule}</Text>
        </View>
        {randomCourse.description && (
          <Text style={styles.description}>{randomCourse.description}</Text>
        )}
        <View style={styles.priceStockRow}>
          <Text style={styles.price}>Rs. {Number(randomCourse.fee).toLocaleString()}</Text>
          <Text style={[styles.stock, { color: randomCourse.available ? "#22c55e" : "#ef4444" }]}>
            {randomCourse.available ? "✅ Available" : "❌ Full"}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Courses</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={fetchAllCourses}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>📚 Browse All Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondary]}
          onPress={fetchRandomCourse}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>🎲 Surprise Me</Text>
        </TouchableOpacity>
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e40af" />
          <Text style={styles.loadingText}>Loading courses...</Text>
        </View>
      )}
      
      {!loading && !!error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAllCourses}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {!loading && !error && showRandom && randomCourse && renderRandomCourse()}
      
      {!loading && !error && !showRandom && courses.length > 0 && (
        <View style={styles.listWrapper}>
          <FlatList
            data={courses}
            keyExtractor={(item, index) => item._id || `course-${index}-${item.name}`}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            maintainVisibleContentPosition={null}
          />
        </View>
      )}
      
      {!loading && !error && !showRandom && courses.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No courses found.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchAllCourses}>
            <Text style={styles.retryButtonText}>Load Courses</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  header: {
    backgroundColor: "#1e40af",
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#1e40af",
  },
  secondary: {
    backgroundColor: "#eab308",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6b7280",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: "#1e40af",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 16,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  highlightCard: {
    backgroundColor: "#fefce8",
    marginHorizontal: 20,
    marginVertical: 24,
    padding: 24,
    borderRadius: 24,
    shadowColor: "#eab308",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#eab308",
  },
  featuredLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#eab308",
    marginBottom: 8,
    textAlign: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    flex: 1,
    marginRight: 8,
  },
  highlightName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
    flex: 1,
    marginRight: 8,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },
  subject: {
    fontSize: 16,
    color: "#1e40af",
    fontWeight: "600",
    marginBottom: 6,
  },
  instructor: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  duration: {
    fontSize: 13,
    color: "#6b7280",
    marginRight: 12,
  },
  schedule: {
    fontSize: 13,
    color: "#6b7280",
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 8,
    marginBottom: 12,
    fontStyle: "italic",
    lineHeight: 20,
  },
  priceStockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  price: {
    fontSize: 20,
    color: "#1e40af",
    fontWeight: "bold",
  },
  stock: {
    fontSize: 15,
    fontWeight: "600",
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    marginHorizontal: 20,
  },
  listWrapper: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});

