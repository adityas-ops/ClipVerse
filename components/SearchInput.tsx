import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants"
import { router, usePathname } from 'expo-router';

interface FormFieldProps {
    value?: string;
    handleChangeText?: (e: string) => void;
    otherStyles?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    placeholder?: string;
    initialQuery?: string;
}

const SearchInput: React.FC<FormFieldProps> = ({
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholder,
    initialQuery
}) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    const handleSearch = () => {
        if (!query) {
            return Alert.alert('Please enter something to search');
        }
        if (pathName.startsWith('/search')) {
            router.setParams({ query });
        } else {
            router.push(`/search/${query}`);
        }
    };

    return (
        <View className='border-[1px] border-white flex-row items-center bg-black-100 w-full h-16 px-4 focus:border-secondary rounded-2xl'>
            <TextInput
                value={query}
                onChangeText={(e) => setQuery(e)}
                onSubmitEditing={handleSearch} // This triggers search on pressing Enter
                className='w-full flex-1 text-white h-full mt-0.5 text-base font-pregular'
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor='#CDCDE0'
                returnKeyType="search" // Sets the "Enter" key to show "Search" text on some devices
            />
            <TouchableOpacity onPress={handleSearch}>
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
}

export default SearchInput;
