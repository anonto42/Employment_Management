import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readSms(): Promise<Array<{ address: string; body: string; timestamp: number }>>;
}

export default TurboModuleRegistry.get<Spec>('NativeSmsReader') as Spec;
