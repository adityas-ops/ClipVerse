import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router,Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";


const index = () => {
  const {isLogged,loading} = useGlobalContext();
  if(!loading && isLogged){
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className=" flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            className=" max-w-[380px] w-full h-[300px]"
          />
          <View className=" relative mt-5 ">
            <Text className="text-3xl font-bold text-white text-center">
              Discover Endless Possibilities with 
              <Text className=" text-secondary-200 "> Aora</Text>
            </Text>
            <Image
            source={images.path}
            className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
            resizeMode="contain"
            />
         </View>
         <Text className=" text-sm font-pregular text-gray-100 text-center mt-7">
         Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
         </Text>
         <CustomButton
          title="Continue With Email"
          handlePress={() => {
            router.push("/signin");
          }}
          containerStyle="mt-7 w-full"
         />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default index;
