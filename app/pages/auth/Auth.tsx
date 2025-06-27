import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import Logo from "../../static/assets/logo.png"

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [language, setLanguage] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pt-6">
        {/* Placeholder for Brand Logo */}
        <View className="items-center mb-4">
          <Image
            source={Logo}
            style={{ width: 180, height: 180, resizeMode: 'contain' }}
          />
        </View>

        {/* Language Selector */}
        {/* <View className="flex-row justify-end space-x-2 gap-2 my-6">
          <TouchableOpacity onPress={()=> setLanguage(true)} className={language ? `bg-red-600 px-3 py-1 rounded-full`: "bg-gray-200 px-3 py-1 rounded-full"}>
            <Text className={language? "text-white text-md font-semibold": "text-black text-md font-semibold"}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setLanguage(false)} className={!language ? `bg-red-600 px-3 py-1 rounded-full`: "bg-gray-200 px-3 py-1 rounded-full"}>
            <Text className={!language ? "text-white text-md font-semibold" : "text-md font-semibold text-black"}>বাংলা</Text>
          </TouchableOpacity>
        </View> */}

        {/* App Title */}
        <Text className="text-center font-bold text-base text-gray-800 mb-4">
          EMPLOYMENT ENGAGE
        </Text>

        {/* Form Inputs */}
        <View className="space-y-3 gap-4">
          <TextInput
            placeholder="Enter Your User ID"
            className="border border-gray-300 rounded-md px-4 py-3 text-lg bg-gray-100 text-black placeholder:text-[#a7a1a1] font-medium"
          />
          <View className="relative">
            <TextInput
              placeholder="Enter Your Password"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-md px-4 py-3 text-lg bg-gray-100 text-black placeholder:text-[#a7a1a1] font-medium"
            />
            <TouchableOpacity
              className="absolute right-4 top-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-lock-open' : 'eye-lock'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Remember Me Toggle */}
           <View className="flex-row items-center space-x-4">
            <Text className="text-lg text-gray-800">Remember Me</Text>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: '#d1d5db', true: '#22d3ee' }} // gray-300, cyan-400
              thumbColor={rememberMe ? '#ffffff' : '#f4f4f5'}   // white, zinc-100
              ios_backgroundColor="#d1d5db"                      // for iOS fallback
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity className="mt-6 bg-red-600 py-3 rounded-md items-center">
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-2">
          <Text className="text-center text-red-500 text-sm">
            Forgot User ID/Password/PIN
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="my-4 border-t border-gray-200" />
        <Text className="text-center text-gray-600">New User?</Text>

        {/* Register Button */}
        <TouchableOpacity className="mt-2 border border-red-600 py-3 rounded-md items-center">
          <Text className="text-red-600 font-semibold">Register with our app</Text>
        </TouchableOpacity>

        {/* QR Placeholder */}
        <View className="items-center my-6">
          <Text className="text-xl">[QR Code]</Text>
        </View>

        {/* Footer Links */}
        <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-2">
          {['FAQ', 'Branch', 'Contact', 'Version', 'Security', 'Privacy'].map((item) => (
            <Text key={item} className="text-gray-500 text-xs">
              {item}
            </Text>
          ))}
        </View>

        {/* Footer Copyright */}
        <Text className="text-center text-gray-400 text-xs mt-4">
          All rights reserved © 2025, employment engage. V 8.1.6
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
