import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from "../constants"
interface FormFieldProps {
    title: string;
    value: string;
    handleChangeText: (e:string) => void;
    otherStyles?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder?: string;
}

const FormField : React.FC<FormFieldProps> = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <View className={` ${otherStyles} space-y-2`}>
      <Text className=' text-base text-gray-200'>{title}</Text>
      <View className=' border-2 border-pink-800 flex-row items-center bg-black-100 w-full h-16 px-4 focus:border-secondary rounded-2xl'>
        <TextInput
            value={value}
            onChangeText={handleChangeText}
            className=' w-full flex-1 text-white h-full text-base font-psemibold'
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            secureTextEntry={title === 'Password' && !showPassword}
        />
        {
            title === 'Password' && (
                <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                    source={showPassword ? icons.eye : icons.eyeHide}
                    className='w-6 h-6 '
                    resizeMode='contain'
                    />
                </TouchableOpacity>
            )
        }
      </View>
    </View>
  )
}

export default FormField