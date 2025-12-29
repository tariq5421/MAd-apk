import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import CoursesScreen from "./screens/CoursesScreen";
import SubjectsScreen from "./screens/SubjectsScreen";
import InstructorsScreen from "./screens/InstructorsScreen";
import AboutScreen from "./screens/AboutScreen";

const Tab = createBottomTabNavigator();

// Simple emoji-based tab icon component
function TabIcon({ emoji }) {
  return <Text style={{ fontSize: 24 }}>{emoji}</Text>;
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#1e40af",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <TabIcon emoji="🏠" />,
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="Courses"
          component={CoursesScreen}
          options={{
            tabBarIcon: () => <TabIcon emoji="📚" />,
            tabBarLabel: "Courses",
          }}
        />
        <Tab.Screen
          name="Subjects"
          component={SubjectsScreen}
          options={{
            tabBarIcon: () => <TabIcon emoji="🔬" />,
            tabBarLabel: "Subjects",
          }}
        />
        <Tab.Screen
          name="Instructors"
          component={InstructorsScreen}
          options={{
            tabBarIcon: () => <TabIcon emoji="👨‍🏫" />,
            tabBarLabel: "Instructors",
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: () => <TabIcon emoji="ℹ️" />,
            tabBarLabel: "About",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
