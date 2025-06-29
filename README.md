<<<<<<< HEAD
# Employment_Management


Build comands:

./gradlew bundleRelease

npx react-native build-android --mode=release



 const listenToIncomingSMS = async () => {
    try {
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

      const subscription = SmsListener.addListener((message: any) => {
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

  const startBackrouSMS = async () => {
    await BackgroundService.start(smsBackgroundTask, {
      taskName: 'SMSMonitor',
      taskTitle: 'Listening for SMS...',
      taskDesc: 'This service listens for incoming SMS and sends it to the server.',
      taskIcon: {
          name: '', // without extension
          type: 'mipmap'
      }
    })
  };
=======
# Employment_Management


Build comands:

./gradlew bundleRelease

npx react-native build-android --mode=release



fluter: 

https://chatgpt.com/s/t_6860fddc547c819186862db1142ff185
>>>>>>> 9f17cf0912d4fdc1890463561295ad440b6e6aed
