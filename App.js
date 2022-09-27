import { StatusBar } from 'expo-status-bar';
import Routes from './src/Routes';

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor='#009688' />
      <Routes />
    </>
  );
}
