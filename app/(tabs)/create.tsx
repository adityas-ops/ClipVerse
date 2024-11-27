import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { createPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as ImagePicker from 'expo-image-picker';

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setform] = useState<{
    title: string;
    video: { uri: string } | null;
    thumbnail: { uri: string } | null;
    prompt: string;
  }>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType : any) => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:  selectType === "thumbnail" ? ['images'] : ['videos'],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "thumbnail") {
        setform({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setform({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  const submit = async () => {
    if (
      !form.video ||
      !form.thumbnail ||
      !form.title ||
      !form.prompt ||
      !user
    ) {
      return Alert.alert("Error", "Please upload a video and thumbnail");
    }
    setUploading(true);
    try {
      const upload = await createPost({
        ...form,
        userId: user.$id,
      });

      if (upload) {
        Alert.alert("Success", "Video uploaded successfully");
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        Alert.alert("Error", "An error occurred while uploading video");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setform({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  console.log("form.thumbnail.uri ", form.thumbnail?.uri);
  return (
    <SafeAreaView edges={["top"]} className=" bg-primary h-full">
      <ScrollView className=" px-4  mb-3 mt-7">
        <Text className=" text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          placeholder="give your video a catch title ..."
          value={form.title}
          handleChangeText={(e: string) => setform({ ...form, title: e })}
          otherStyles="mt-5"
        />
        <View className=" mt-7 space-y-2">
          <Text className="  text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker("video")}
            activeOpacity={0.7}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                resizeMode={ResizeMode.COVER}
                className=" w-full  h-[600px] rounded-2xl"
              />
            ) : (
              <View className=" w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className=" w-14 h-14 border-dashed border border-secondary-100 justify-center items-center ">
                  <Image
                    source={icons.upload}
                    className=" w-1/2 h-1/2 "
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className=" mt-7 space-y-2">
          <Text className="  text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity
            onPress={() => openPicker("thumbnail")}
            activeOpacity={0.7}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className=" w-full  h-[600px] rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className=" w-full rounded-2xl h-16 px-4 bg-black-100 border-2 border-black-200 flex-row space-x-2 justify-center items-center ">
                <Image
                  source={icons.upload}
                  className=" w-5 h-5 "
                  resizeMode="contain"
                />
                <Text className=" text-gray-100 text-sm font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title=" AI prompt"
          placeholder="the prompt to use create the video ..."
          value={form.prompt}
          handleChangeText={(e: string) => setform({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="submit & publish"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
