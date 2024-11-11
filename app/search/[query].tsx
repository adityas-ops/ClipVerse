import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const QueryComponent = () => {
  const {query} = useLocalSearchParams()
  return (
    <View>
      <Text>QueryComponent</Text>
    </View>
  )
}

export default QueryComponent