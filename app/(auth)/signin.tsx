import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn,signOut,deleteSessions} from '@/lib/appwrite'
import { checkActiveSession } from "@/lib/appwrite";
import { useGlobalContext } from '@/context/GlobalProvider'


interface LoginFormState {
  email: string;
  password: string;
}

const SignIn = () => {
  const {  setUser,setIsLogged } = useGlobalContext();
  const [form,setForm] = useState<LoginFormState>({
    email:'',
    password:''
  })
  const [isSumitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async() => {
    if( !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields")
    }
    setIsSubmitting(true);
    try {
      const activeSession = await checkActiveSession();

      if (activeSession) {
        // Delete the active sessions if one exists
        await deleteSessions();
      }
         await signIn(form.email, form.password,)
        // const result =  await signIn(form.email, form.password,)
        const result = await getCurrentUser()
        console.log("result------------------",result)
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

  const handlesignOut = async() => {
    try {
        const result  = await signOut()

        router.replace("/signin")
    } catch (error: any) {
      Alert.alert("Error", error.message)
    }
    finally{
      setIsSubmitting(false)
    }
  }


  return (
   <SafeAreaView className=' flex-1 bg-primary'>
    <ScrollView className=' h-full  flex-1'>
    <View className=' w-full justify-center  h-[85vh] px-6 my-6'>
     <Image
      source={images.logo}
      className='w-[115px] h-[35px]'
      resizeMode='contain'
     />
     <Text className=' font-psemibold mt-10 text-2xl text-white'>
      Log in to Aora
     </Text>
     <FormField
      title='Email'
      value={form.email}
      handleChangeText={(e:string) => setForm({...form,email:e})}
      otherStyles='mt-7'
      keyboardType='email-address'
     />
     <FormField
      title='Password'
      value={form.password}
      handleChangeText={(e:string) => setForm({...form,password:e})}
      otherStyles='mt-7'
     />
      <CustomButton
            title='Sign in' 
            handlePress={handleSubmit}     
            containerStyle='mt-7'
            isLoading={isSumitting}
             />
             {/* <CustomButton
            title='Sign out'
            handlePress={handlesignOut}
            containerStyle='mt-7'
              /> */}
             <View className=' flex-row justify-center mt-5'>
              <Text className=' text-gray-100 text-lg font-pregular'>
                Don't have an account?
              </Text>
              <Link className='pl-2' href='/signup'>
              <Text className=' text-lg font-psemibold text-secondary '>
                Sign up
              </Text>
              </Link>
             </View>
    </View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn