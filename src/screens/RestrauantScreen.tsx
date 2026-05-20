import {  StyleSheet, Text, View,  } from 'react-native'
import React from 'react'
import { Button } from '@react-navigation/elements'
import { useNavigation } from "@react-navigation/native";

const RestrauantScreen = () => {

    const navigate = useNavigation<any>()
  return (
    <View>
      <Text>RestrauantScreen</Text>
    <Button onPress={() => {navigate.navigate('Cart')}}>Go to Home</Button>
    </View>
  )
}

export default RestrauantScreen

const styles = StyleSheet.create({})