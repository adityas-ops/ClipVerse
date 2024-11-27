import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import {createUser} from "@/lib/appwrite"
import { useGlobalContext } from "@/context/GlobalProvider";

interface SignFormState {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState<SignFormState>({
    username: "",
    email: "",
    password: "",
  });
  const [isSumitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async() => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields")
    }
    setIsSubmitting(true);
    try {
        const result  = await createUser(form.email, form.password, form.username)

      if(result){
        setUser(result)
        setIsLogged(true)
        router.replace("/home")
      }
    } catch (error: any) {
      Alert.alert("Error", error.message)
    }
    finally{
      setIsSubmitting(false)
    }
  };

  return (
    <SafeAreaView className=" flex-1 bg-primary">
      <ScrollView className=" h-full  flex-1">
        <View className=" w-full justify-center  h-[85vh] px-6 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className=" font-psemibold mt-10 text-2xl text-white">
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Enter your Unique username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="aditya@gmail.com"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter your password"
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyle="mt-7"
            isLoading={isSumitting}
          />
          <View className=" flex-row justify-center mt-5">
            <Text className=" text-gray-100 text-lg font-pregular">
             Have an already account?
            </Text>
            <Link className="pl-2" href="/signin">
              <Text className=" text-lg font-psemibold text-secondary ">
               Log in
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
