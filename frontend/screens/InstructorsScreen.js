import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = "http://localhost:3000";

export default function InstructorsScreen() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInstructors();
  }, []);

  async function fetchInstructors() {
    try {
      const res = await fetch(`${BASE_URL}/courses`);
      const json = await res.json();
      if (res.ok) {
        const uniqueInstructors = [...new Set(json.items?.map(c => c.instructor) || [])];
        setInstructors(uniqueInstructors);
      }
    } catch (e) {
      console.error("Failed to fetch instructors:", e);
    }
  }

  async function fetchCoursesByInstructor(instructor) {
    setLoading(true);
    setError("");
    setSelectedInstructor(instructor);
    try {
      const res = await fetch(`${BASE_URL}/courses/instructor/${encodeURIComponent(instructor)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load courses");
      setCourses(json.items || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const renderInstructorCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.instructorCard,
          selectedInstructor === item && styles.instructorCardActive
        ]}
        onPress={() => fetchCoursesByInstructor(item)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.instructorName,
          selectedInstructor === item && styles.instructorNameActive
        ]}>
          👨‍🏫 {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCourse = ({ item }) => {
    const levelColors = {
      Beginner: "#3b82f6",
      Intermediate: "#eab308",
      Advanced: "#ef4444"
    };

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={[styles.levelBadge, { backgroundColor: levelColors[item.level] || "#6b7280" }]}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>
        <Text style={styles.subject}>{item.subject}</Text>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Instructors</Text>
      </View>

      <View style={styles.instructorsSection}>
        <Text style={styles.sectionTitle}>Select an Instructor</Text>
        <FlatList
          data={instructors}
          keyExtractor={(item) => item}
          renderItem={renderInstructorCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.instructorsList}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#1e40af" style={styles.loader} />}
      {!!error && <Text style={styles.error}>{error}</Text>}

      {!loading && selectedInstructor && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {courses.length} {courses.length === 1 ? "Course" : "Courses"} by {selectedInstructor}
          </Text>
        </View>
      )}

      {!loading && selectedInstructor && (
        <FlatList
          data={courses}
          keyExtractor={(item) => item._id}
          renderItem={renderCourse}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No courses found for this instructor.</Text>
            </View>
          }
        />
      )}

      {!selectedInstructor && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>👆 Select an instructor above to view their courses</Text>
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
  instructorsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  instructorsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  instructorCard: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#e0e7ff",
    borderWidth: 1,
    borderColor: "#c7d2fe",
    marginRight: 12,
  },
  instructorCardActive: {
    backgroundColor: "#1e40af",
    borderColor: "#1e40af",
  },
  instructorName: {
    color: "#1e40af",
    fontSize: 15,
    fontWeight: "600",
  },
  instructorNameActive: {
    color: "#ffffff",
  },
  loader: {
    marginTop: 24,
  },
  error: {
    color: "#ef4444",
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    marginHorizontal: 20,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
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
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  placeholderText: {
    fontSize: 18,
    color: "#9ca3af",
    textAlign: "center",
  },
});

