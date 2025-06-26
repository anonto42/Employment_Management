// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Switch,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const Auth = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
//         {/* Brand Logo */}
//         <View className="items-center mb-4">
//           {/* <Image source={require('../assets/brandlogo.png')} className="h-12 w-32" resizeMode="contain" /> */}
//         </View>

//         {/* Language Selector */}
//         <View className="flex-row justify-end space-x-2 mb-2">
//           <TouchableOpacity className="bg-red-600 px-3 py-1 rounded-full">
//             <Text className="text-white text-sm">EN</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-gray-200 px-3 py-1 rounded-full">
//             <Text className="text-sm">বাংলা</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Heading */}
//         <Text className="text-center font-bold text-base text-gray-800 mb-4">EMPLOYMENT ENGAGE</Text>

//         {/* Inputs */}
//         <View className="space-y-3">
//           <TextInput
//             placeholder="Enter Your User ID"
//             className="border border-gray-300 rounded-md px-4 py-3 bg-gray-100"
//           />
//           <View className="relative">
//             <TextInput
//               placeholder="Enter Your Password"
//               secureTextEntry={!showPassword}
//               className="border border-gray-300 rounded-md px-4 py-3 bg-gray-100 pr-10"
//             />
//             <TouchableOpacity
//               className="absolute right-3 top-3"
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               <Icon
//                 name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//                 size={24}
//                 color="gray"
//               />
//             </TouchableOpacity>
//           </View>

//           {/* Remember Me Toggle */}
//           <View className="flex-row items-center space-x-2">
//             <Switch value={rememberMe} onValueChange={setRememberMe} />
//             <Text className="text-sm text-gray-600">Remember Me</Text>
//           </View>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity className="mt-6 bg-red-600 py-3 rounded-md items-center">
//           <Text className="text-white font-semibold">Login</Text>
//         </TouchableOpacity>

//         {/* Forgot */}
//         <TouchableOpacity className="mt-2">
//           <Text className="text-center text-red-500 text-sm">Forgot User ID/Password/PIN</Text>
//         </TouchableOpacity>

//         {/* Divider */}
//         <View className="my-4 border-t border-gray-200" />
//         <Text className="text-center text-gray-600">New User?</Text>

//         {/* Register Button */}
//         <TouchableOpacity className="mt-2 border border-red-600 py-3 rounded-md items-center">
//           <Text className="text-red-600 font-semibold">Register with our app</Text>
//         </TouchableOpacity>

//         {/* QR Code */}
//         <View className="items-center my-6">
//           {/* <Image source={require('../assets/qrcode.png')} className="h-24 w-24" resizeMode="contain" /> */}
//         </View>

//         {/* Footer Links */}
//         <View className="flex-row flex-wrap justify-center gap-x-4 gap-y-2">
//           {['FAQ', 'Branch', 'Contact', 'Version', 'Security', 'Privacy'].map((item) => (
//             <Text key={item} className="text-gray-500 text-xs">
//               {item}
//             </Text>
//           ))}
//         </View>

//         {/* Footer Copyright */}
//         <Text className="text-center text-gray-400 text-xs mt-4">
//           All rights reserved Copyright © 2025, employment engage. V 8.1.6
//         </Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Auth;


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        {/* Placeholder for Brand Logo */}
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800">[BrandLogo]</Text>
        </View>

        {/* Language Selector */}
        <View className="flex-row justify-end space-x-2 mb-2">
          <TouchableOpacity className="bg-red-600 px-3 py-1 rounded-full">
            <Text className="text-white text-sm">EN</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 px-3 py-1 rounded-full">
            <Text className="text-sm">বাংলা</Text>
          </TouchableOpacity>
        </View>

        {/* App Title */}
        <Text className="text-center font-bold text-base text-gray-800 mb-4">
          EMPLOYMENT ENGAGE
        </Text>

        {/* Form Inputs */}
        <View className="space-y-3">
          <TextInput
            placeholder="Enter Your User ID"
            className="border border-gray-300 rounded-md px-4 py-3 bg-gray-100"
          />
          <View className="relative">
            <TextInput
              placeholder="Enter Your Password"
              secureTextEntry={!showPassword}
              className="border border-gray-300 rounded-md px-4 py-3 bg-gray-100 pr-10"
            />
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Remember Me Toggle */}
          <View className="flex-row items-center space-x-2">
            <Switch value={rememberMe} onValueChange={setRememberMe} />
            <Text className="text-sm text-gray-600">Remember Me</Text>
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
