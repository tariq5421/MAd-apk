import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BASE_URL = "http://localhost:3000";

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ courses: 0, subjects: 0, instructors: 0 });
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  async function loadHomeData() {
    try {
      // Fetch stats
      const [coursesRes, subjectsRes, randomRes] = await Promise.all([
        fetch(`${BASE_URL}/courses`),
        fetch(`${BASE_URL}/subjects`),
        fetch(`${BASE_URL}/courses/random`),
      ]);

      const coursesData = await coursesRes.json();
      const subjectsData = await subjectsRes.json();
      const randomData = await randomRes.json();

      setStats({
        courses: coursesData.count || 0,
        subjects: subjectsData.count || 0,
        instructors: new Set(coursesData.items?.map(c => c.instructor) || []).size,
      });

      if (randomRes.ok) {
        setFeaturedCourse(randomData);
      }
    } catch (e) {
      console.error("Failed to load home data:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1e40af" style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.academyName}>Shaheen Science Academy</Text>
          <Text style={styles.tagline}>Excellence in Science Education</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.courses}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.subjects}</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.instructors}</Text>
            <Text style={styles.statLabel}>Instructors</Text>
          </View>
        </View>

        {featuredCourse && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>⭐ Featured Course</Text>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredName}>{featuredCourse.name}</Text>
              <Text style={styles.featuredSubject}>{featuredCourse.subject}</Text>
              <Text style={styles.featuredInstructor}>👨‍🏫 {featuredCourse.instructor}</Text>
              <Text style={styles.featuredFee}>Rs. {featuredCourse.fee.toLocaleString()}</Text>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate("Courses")}
              >
                <Text style={styles.viewButtonText}>View All Courses</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Courses")}
          >
            <Text style={styles.actionButtonText}>📚 Browse Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Subjects")}
          >
            <Text style={styles.actionButtonText}>🔬 Explore Subjects</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Instructors")}
          >
            <Text style={styles.actionButtonText}>👨‍🏫 Meet Instructors</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  loader: {
    marginTop: 50,
  },
  header: {
    backgroundColor: "#1e40af",
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 24,
  },
  title: {
    color: "#bfdbfe",
    fontSize: 18,
    marginBottom: 4,
  },
  academyName: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tagline: {
    color: "#bfdbfe",
    fontSize: 14,
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 90,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
  },
  featuredSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: "#fefce8",
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#eab308",
  },
  featuredName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 8,
  },
  featuredSubject: {
    fontSize: 16,
    color: "#1e40af",
    fontWeight: "600",
    marginBottom: 6,
  },
  featuredInstructor: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  featuredFee: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 16,
  },
  viewButton: {
    backgroundColor: "#1e40af",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quickActions: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
  },
});

