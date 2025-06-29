import CryptoJS from 'crypto-js';

interface SMSPayloadInput {
  deviceId: string;
  from: string;
  message: string;
}

interface SMSPayload extends SMSPayloadInput {
  timestamp: number;
  smsHash: string;
}

export const prepareSMSPayload = ({ deviceId, from, message }: SMSPayloadInput): SMSPayload => {
  const timestamp = Date.now();; 

  const rawString = `${deviceId}|${from}|${message}|${timestamp}`;

  const smsHash = CryptoJS.SHA256(rawString).toString(CryptoJS.enc.Hex);

  return {
    deviceId,
    from,
    message,
    timestamp,
    smsHash,
  };
};
