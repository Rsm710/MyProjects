// Rest of the import statements
import { useFonts } from 'expo-font';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import './gesture-handler'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
  });
}
