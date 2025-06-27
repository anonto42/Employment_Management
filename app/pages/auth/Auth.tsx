import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { toast } from 'burnt';
import { useNavigation } from '@react-navigation/native';
//@ts-ignore
import Logo from '../../static/assets/logo.png';
//@ts-ignore
import OpenEyes from '../../static/icons/open-eye.png';
//@ts-ignore
import XEyes from '../../static/icons/x-eyes.png';
//@ts-ignore
import QrCode from '../../static/assets/QR.png';
import LoadingScreen from '../../components/Loader';
import axios from 'axios';

const Auth = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handelLogin = async () => {
    setLoading(true);
    setUserIdError('');
    setPasswordError('');

    const userIdRegex = /^[a-zA-Z0-9._-]{3,}$/;
    const isUserIdValid = userIdRegex.test(userId);
    const isPasswordValid = password.length >= 6;

    if (!isUserIdValid) {
      setUserIdError('Please enter a valid User ID.');
      setLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setPasswordError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    const authData = {
      userId: userId,
      password: password,
    };

    try {
      const { data } = await axios.post(`https://employment-engage.vercel.app/api/login`, authData);

      await AsyncStorage.setItem("userRef", JSON.stringify(data.user.userRef) );

      setLoading(false);

      toast({
        title: 'Login Successful!',
        message: 'You are successfully logged into the Employment Engagement Platform.',
      });

      setUserId('');
      setPassword('');

      //@ts-ignore
      navigation.navigate('Success');

    } catch (err) {
      setLoading(false);
      toast({
        title: 'Login Failed',
        message: 'Invalid credentials or network error.',
      });
    };
  };

  return (
    <SafeAreaView className="flex-1 bg-white overflow-hidden">
      {loading && <LoadingScreen />}
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-4"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-[400px] self-center">
            {/* Brand Logo */}
            <View className="items-center">
              <Image
                source={Logo}
                style={{ width: 180, height: 180, resizeMode: 'contain' }}
              />
            </View>

            {/* App Title */}
            <Text className="text-center font-bold text-base text-gray-800 mb-4">
              EMPLOYMENT ENGAGE
            </Text>

            {/* Form Inputs */}
            <View className="space-y-3 gap-4">
              <TextInput
                value={userId}
                onChangeText={setUserId}
                placeholder="Enter Your User ID"
                className={`border ${
                  userIdError ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-3 text-lg bg-gray-100 text-black placeholder:text-[#a7a1a1] font-medium`}
              />
              {userIdError && (
                <Text className="text-red-500 text-xs">{userIdError}</Text>
              )}

              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter Your Password"
                  secureTextEntry={!showPassword}
                  className={`border ${
                    passwordError ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-3 text-lg bg-gray-100 text-black placeholder:text-[#a7a1a1] font-medium`}
                />
                <TouchableOpacity
                  className="absolute right-4 top-2"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image
                    source={showPassword ? XEyes : OpenEyes}
                    style={{
                      width: 25,
                      resizeMode: 'contain',
                      marginTop: -103,
                      tintColor: '#736e6e',
                    }}
                  />
                </TouchableOpacity>
              </View>
              {passwordError && (
                <Text className="text-red-500 text-xs">{passwordError}</Text>
              )}

              {/* Remember Me Toggle */}
              <View className="flex-row items-center space-x-4">
                <Text className="text-lg text-gray-800">Remember Me</Text>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: '#d1d5db', true: '#22d3ee' }}
                  thumbColor={rememberMe ? '#ffffff' : '#f4f4f5'}
                  ios_backgroundColor="#d1d5db"
                />
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handelLogin}
              className="mt-6 bg-red-600 py-3 rounded-md items-center"
            >
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
              <Text className="text-red-600 font-semibold">
                Register with our app
              </Text>
            </TouchableOpacity>

            {/* QR Placeholder */}
            <View className="items-center my-6">
              <Image
                source={QrCode}
                style={{ width: 100, resizeMode: 'contain' }}
              />
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
