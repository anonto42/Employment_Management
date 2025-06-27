import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'

const LoadingScreen = () => {

  return (
    <View className={'absolute w-full h-full justify-center items-center z-50 bg-[#58585e81]'}>
        <View className='text-center'>
            <ActivityIndicator 
            size="large" 
            color="#EF4444" // Tailwind red-600 color
            className={'mb-4'}
            />

        {/* Displaying text */}
        <Text className={'text-lg text-[#fce5e5] font-semibold'}>
            Please wait...
        </Text>
        </View>
    </View>
  );
};

export default LoadingScreen;
