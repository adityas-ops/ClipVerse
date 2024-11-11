import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import {Video,ResizeMode} from "expo-av"

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

interface TrendingProps {
  posts: any[];
}

interface TrendingItemProps {
  activeItem: any;
  item: any;
}

// trending video component
const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={300}
    >
      {/* Your content here */}
      {
        play ? (
          // <Text className="text-xs text-white">Playing...</Text>
          <Video
            source={{
              uri: item?.video,
            }}
            shouldPlay
            className="w-52 h-72 rounded-[35px] mt-3  bg-white/10  overflow-hidden"
            resizeMode={ResizeMode.COVER}
            useNativeControls
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded && status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <TouchableOpacity
          activeOpacity={0.8}
            onPress={() => setPlay(true)}
            className="rounded-[35px] my-5 overflow-hidden shadow-lg  shadow-black/40 relative justify-center items-center mt-3"
          >
            <ImageBackground
              source={{
                uri: item?.thumbnail,
              }}
              className="w-52 h-72 rounded-[35px]  overflow-hidden "
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<any>(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: Array<{ key: any }> }) => {
  if(viewableItems.length > 0){
    setActiveItem(viewableItems[0].key);
  }
  }
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
        contentOffset={{ x: 170 , y: 0 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;
