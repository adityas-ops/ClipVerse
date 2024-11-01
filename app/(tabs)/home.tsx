import { View, Text, FlatList,Image,RefreshControl, Alert} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from "../../constants"
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import { getAllPost } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import EmptyState from "@/components/EmptyState";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {data:posts,loading,refetch} = useAppwrite(getAllPost);
  
 
  const onRefresh = async() => {
    setRefreshing(true);
  //  re called the api 
  await refetch();
  setRefreshing(false);
  }

  return (
    <SafeAreaView className=" h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item:any) => item.$id}
        renderItem={({ item }) => (
          <View>
            <Text className=" text-3xl text-white font-bold ">{` ${item.title}`}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className=" justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className=" text-xl font-psemibold text-white">Js Mastry</Text>
              </View>
              <View className=" mt-1.5">
                <Image
                source={images.logoSmall}
                   className=" w-9 h-10"
                   resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              value=""
              handleChangeText={(e) => console.log(e)}
              placeholder="Search for anything"
            />
            <View className="w-full flex-1 items-center   pt-5 pb-8">
              <Text className=" text-gray-100 w-full text-start text-lg font-pregular mb-3">
                Latest Video
              </Text>
            <Trending
            posts={[
               {
                id:1
              },
              {
                 id:2
               },
               {
                 id:3
               }
            ]}
            />
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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

export default Home;
