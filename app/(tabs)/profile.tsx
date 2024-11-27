import { View, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import { getUSerPost, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUSerPost(user.$id));

  const logout = async() => {
    //
    const result =  await signOut();
    //  console.log("result--------logout----------",result)
    setUser(null);
    setIsLogged(false);
    router.replace("/signin");
  };

  return (
    <SafeAreaView className=" h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <View>{item && <VideoCard video={item} />}</View>
        )}
        ListHeaderComponent={() => (
          <View className=" py-3 px-4">
            <View className="flex items-center justify-center px-2 ">
              <TouchableOpacity
                onPress={logout}
                className=" w-full items-end mb-5"
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className=" w-16 h-16 border-[1px] border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  resizeMode="cover"
                  className="w-[90%] h-[90%] rounded-lg"
                />
              </View>
              <InfoBox
                title={user?.username}
                containerStyle="mt-5"
                textStyle="text-lg"
              />
              <View className=" flex flex-row mt-0">
                <InfoBox
                  title={posts?.length || 0} 
                  subTitle="Posts"
                  containerStyle="mr-10"
                  textStyle="text-xl"
                />
                <InfoBox
                  title={"1.2K"}
                  subTitle="Followers"
                  containerStyle=""
                  textStyle="text-xl"
                />
              </View>
            </View>
            <View className="mt-6 mb-8">
              <SearchInput
                placeholder="Search for anything"
                // initialQuery={query as string}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="w-full    items-center flex-1  h-full">
            <EmptyState
              title="No Videos Found"
              subTitle="Be the first to post a video"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
