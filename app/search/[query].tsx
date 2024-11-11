import { View, Text, FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import { searchPost } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const [refreshing, setRefreshing] = useState(false);
    const {query} = useLocalSearchParams()
  const {data:posts,loading,refetch} = useAppwrite(()=>searchPost(query));
  
  useEffect(()=>{
    refetch()
  },[query])

  return (
    <SafeAreaView className=" h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item:any) => item.$id}
        renderItem={({ item }) => (
          <View>
            {
              item && <VideoCard video={item} />
            }
           
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
                <Text className=" font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>
                <Text className=" text-xl font-psemibold text-white">
                  {query}
                </Text>
                <View className="mt-6 mb-8">
                <SearchInput
              placeholder="Search for anything"
              initialQuery={query as string}
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

export default Search;
