import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from "../constants"
interface FormFieldProps {
    value: string;
    handleChangeText: (e:string) => void;
    otherStyles?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder?: string;
}

const SearchInput : React.FC<FormFieldProps> = ({
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder
}) => {
  return (
      <View className=' border-[1px] border-white flex-row items-center bg-black-100  w-full h-16 px-4 focus:border-secondary rounded-2xl'>
        <TextInput
            value={value}
            onChangeText={handleChangeText}
            className=' w-full flex-1 text-white h-full mt-0.5 text-base font-pregular'
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
        />
        <TouchableOpacity>
            <Image
            source={icons.search}
            className='w-5 h-5 '
            resizeMode='contain'
            />
        </TouchableOpacity>
           
      </View>
  )
}

export default SearchInput