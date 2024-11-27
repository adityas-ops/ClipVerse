import { View, Text, Image,Platform } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";


interface TabIconProps {
  icon: any;
  name: string;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, name, color, focused }) => {
  return (
    <View className="items-center  h-full   justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
      style={{color:color}}
        className={`${focused ? " font-psemibold" : " font-pregular"} w-full text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor:"#FFA001",
        tabBarInactiveTintColor: "#CDCDE0", 
        tabBarStyle:{
          backgroundColor:"#161622",
          // borderTopColor:"#161622",
          borderTopWidth:1,
          borderTopColor:"#232533",
          height:80,
          paddingTop:Platform.OS === "ios" ? 16 : 26
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              name="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              name="Saved"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              name="Create"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              name="Profile"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      

    </Tabs>
  );
};

export default Layout;
