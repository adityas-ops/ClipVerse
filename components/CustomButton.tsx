import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
  title: string,
  handlePress: () => void,
  containerStyle?: string,
  isLoading?: boolean,
  textStyles?: string
}

const CustomButton:React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyle,
  isLoading,
  textStyles
}) => {
  return (
    <TouchableOpacity disabled={isLoading} onPress={handlePress} className={`${containerStyle} bg-secondary rounded-xl min-h-[62px] justify-center items-center ${isLoading ? " opacity-50":""} `}>
      <Text className={` text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton