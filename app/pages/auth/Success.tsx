import { View, Text, PermissionsAndroid, FlatList, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
//@ts-ignore
import SmsAndroid from "react-native-get-sms-android";
import { useNavigation } from '@react-navigation/native';
//@ts-ignore
import celebrationImage from "../../static/assets/logo.png";

const Success = () => {
    const navigator = useNavigation();
  const [smsList, setSmsList] = useState<any>();

  async function requestSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "SMS Permission",
          message: "This app needs access to your SMS message",
          buttonNegative: "Cancel",
          buttonPositive: "Okay"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }

  useEffect(() => {
    async function fetchSms() {
      const hasPermicions = await requestSmsPermission();
      if (hasPermicions) {
        SmsAndroid.list(
          JSON.stringify({
            box: "inbox",
            maxCount: 10
          }),
          (fail: any) => {
            console.log("Failed with the error " + fail);
          },
          (count: any, smsLists: any) => {
            const message = JSON.parse(smsLists);
            setSmsList(message);
          }
        );
      }
    }
    fetchSms();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <View className={'bg-white p-4 mb-3 rounded-lg shadow-md'}>
        <Text className={'text-blue-700 font-semibold'}>{item.address}</Text>
        <Text className={'text-gray-800 mt-2'}>{item.body}</Text>
        <Text className={'text-gray-500 text-sm mt-2 text-right'}>{item.date}</Text>
      </View>
    );
  };

   const handleRedirect = () => {
    // Navigate to another screen, e.g., Dashboard
    //@ts-ignore
    navigator.navigate('Dashboard');
  };

  return (
   <SafeAreaView className="flex-1 bg-red-100">
      <View className="flex-1 justify-center items-center px-6">
        {/* Celebration Image */}
        <Image
          source={celebrationImage}
          className="w-48 h-48 mb-6"
        />

        {/* Celebration Text */}
        <Text className="text-3xl font-bold text-blue-800 text-center mb-4">
          Congratulations!
        </Text>
        <Text className="text-lg text-gray-700 text-center mb-4">
          You've successfully logged in to the Employment Engagement Platform.
        </Text>

        {/* Redirection Button */}
        <TouchableOpacity 
          onPress={handleRedirect}
          className="bg-blue-500 p-4 rounded-lg w-full mb-4"
        >
          <Text className="text-white text-center font-semibold">Go to Dashboard</Text>
        </TouchableOpacity>

        {/* Optional Footer */}
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
