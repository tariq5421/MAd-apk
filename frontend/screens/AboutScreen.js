import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const openEmail = () => {
    Linking.openURL("mailto:info@shaheenscience.edu.pk");
  };

  const openPhone = () => {
    Linking.openURL("tel:+923115524336");
  };

  const openWebsite = () => {
    Linking.openURL("https://www.shaheenscience.edu.pk");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>About Us</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shaheen Science Academy</Text>
            <Text style={styles.description}>
              Shaheen Science Academy is a premier educational institution dedicated to 
              excellence in science education. We offer comprehensive courses in Mathematics, 
              Physics, Chemistry, and Biology, taught by experienced and qualified instructors.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.description}>
              To provide high-quality science education that empowers students to excel 
              in their academic pursuits and develop a deep understanding of scientific 
              principles. We strive to create an environment that fosters critical thinking, 
              innovation, and a passion for learning.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Offer</Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>📚 Comprehensive course curriculum</Text>
              <Text style={styles.featureItem}>👨‍🏫 Experienced instructors</Text>
              <Text style={styles.featureItem}>📅 Flexible schedules</Text>
              <Text style={styles.featureItem}>🎯 Beginner to Advanced levels</Text>
              <Text style={styles.featureItem}>💼 Affordable fee structure</Text>
              <Text style={styles.featureItem}>✅ Small class sizes</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
              <Text style={styles.contactIcon}>📞</Text>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>03115524336</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
              <Text style={styles.contactIcon}>✉️</Text>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>info@shaheenscience.edu.pk</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
              <Text style={styles.contactIcon}>🌐</Text>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Website</Text>
                <Text style={styles.contactValue}>www.shaheenscience.edu.pk</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📍</Text>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue}>
                  Punjgran street no 1{'\n'}
                  Alipur{'\n'}
                  Islamabad
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Operating Hours</Text>
            <View style={styles.hoursContainer}>
              <Text style={styles.hoursText}>Monday - Friday: 9:00 AM - 6:00 PM</Text>
              <Text style={styles.hoursText}>Saturday: 9:00 AM - 2:00 PM</Text>
              <Text style={styles.hoursText}>Sunday: Closed</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2024 Shaheen Science Academy{'\n'}
              All rights reserved.
            </Text>
          </View>
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
  header: {
    backgroundColor: "#1e40af",
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 24,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 24,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 10,
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
    fontWeight: "600",
  },
  contactValue: {
    fontSize: 15,
    color: "#1f2937",
    lineHeight: 22,
  },
  hoursContainer: {
    marginTop: 8,
  },
  hoursText: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 8,
    lineHeight: 24,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 20,
  },
});

