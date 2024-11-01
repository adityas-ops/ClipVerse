import React from "react";
import { Image, View, Text } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subTitle }) => {
    const router = useRouter()
  return (
    <View className="justify-center w-full   items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      {subTitle && (
        <Text className=" text-white  text-xl font-psemibold">{title}</Text>
      )}
      {title && (
        <Text className="  text-gray-100 text-sm font-pmedium">{subTitle}</Text>
      )}
      <CustomButton
        title="Create Video"
       handlePress={() => router.navigate('/create')}
       containerStyle="w-full my-5"
       />
    </View>
  );
};

export default EmptyState;
