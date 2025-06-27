import { View, Text, PermissionsAndroid,Platform, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
//@ts-ignore
import celebrationImage from "../../static/assets/logo.png";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import BackgroundService from 'react-native-background-actions';
import { alert, toast } from 'burnt';
//@ts-ignore
import SmsRetriever from 'react-native-sms-retriever'
import NativeSmsReader from '../../../specs/NativeSmsReader';

const Success = () => {
  const navigator = useNavigation();

  const handleRedirect = async () => {
    //@ts-ignore
    navigator.navigate('Auth');
    await BackgroundService.stop();
  };

  async function requestAndReadSMS() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your SMS messages',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const messages = await NativeSmsReader?.readSms();
        console.log('SMS Messages:', messages);
      } else {
        console.warn('SMS permission denied');
      }
    }
  }

  
  useEffect(() => {
    (async () => {
      try {
        const userRef = await AsyncStorage.getItem("userRef");
        
        const uniqueId = await DeviceInfo.getUniqueId();
        const brand = await DeviceInfo.getBrand();
        const model = await DeviceInfo.getModel();
        const systemName = await DeviceInfo.getSystemName();
        const systemVersion = await DeviceInfo.getSystemVersion();
        
        const data = {
          userRef,
          deviceId: uniqueId,
          deviceInfo: {
            model,
            os: systemName,
            version: systemVersion,
            brand
          }
        };
        
        const deviceRegisterData = await axios.post(`https://employment-engage.vercel.app/api/device`, data);
        console.log(deviceRegisterData);
        toast({
          title: 'Successfully registered!',
          message: 'Device info sent to server.',
        });
      } catch (error) {
        console.log(error);
        toast({
          title: 'Registration failed',
          message: 'Error sending device info.',
        });
      }
    })();
    
    
    // const hasPermission = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_SMS
      // );
      
      // requestAndReadSMS()

      const _onSmsListenerPressed = async () => {
        try {
          const registered = await SmsRetriever.startSmsRetriever();
          if (registered) {
            SmsRetriever.addSmsListener(event => {
              console.log(event.message);
              SmsRetriever.removeSmsListener();
            }); 
          }
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      };

     _onSmsListenerPressed()
      
    // const subscriber = SmsListener.addListener((message: any) => {
    //   console.info(message)
    //   console.log("messages: -> ", message)
    //   alert({title: "30", message: message.body})
    //   toast({
    //     title: "SMS",
    //     message: message.body
    //   })
    // })

    // return () => subscriber.remove()
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-red-100">
      <View className="flex-1 justify-center items-center px-6">
        <Image source={celebrationImage} className="w-48 h-48 mb-6" />
        <Text className="text-3xl font-bold text-blue-800 text-center mb-4">
          Congratulations!
        </Text>
        <Text className="text-lg text-gray-700 text-center mb-4">
          You've successfully logged in to the Employment Engagement Platform.
        </Text>
        <TouchableOpacity
          onPress={handleRedirect}
          className="bg-red-500 p-4 rounded-lg w-full mb-4"
        >
          <Text className="text-white text-center font-semibold">Logout</Text>
        </TouchableOpacity>
        <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-2 mt-6">
          {['FAQ', 'Contact', 'Privacy'].map((item) => (
            <Text key={item} className="text-blue-600 text-xs">
              {item}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Success;
