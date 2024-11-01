import { View, Text, FlatList } from "react-native";
import React from "react";
import EmptyState from "./EmptyState";

interface trendingProps {
  posts: any[];
}

const Trending: React.FC<trendingProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.id}
      renderItem={({ item }) => (
        <View>
          <Text className=" text-sm text-white ">{`Trending ${item.id}`}</Text>
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}

    />
  );
};

export default Trending;
