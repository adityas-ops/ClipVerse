import React from 'react';
import { StyleSheet, View,Text } from 'react-native';


interface InfoBoxProps {
    title: string | number;
    subTitle?: string;
    containerStyle?: string;
    textStyle?: string;
}

const InfoBox:React.FC<InfoBoxProps>= ({
    title,
    subTitle,
    containerStyle,
    textStyle
}) => {
    return (
        <View className={containerStyle}>
            <Text className={` text-white text-center font-psemibold ${textStyle}`}>{title}</Text>
            <Text className=' text-sm text-gray-100 text-center'>{subTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default InfoBox;
