import 'react-native-gesture-handler'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Navigator from './src/navigation/Navigator';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import * as SplashScreen from 'expo-splash-screen';
import Loader from './src/components/Loader'

SplashScreen.preventAutoHideAsync();
export default function App() {

  let [fonts] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'Anuphan': require('./assets/fonts/Anuphan-Bold.ttf'),
    'Anuphansemi': require('./assets/fonts/Anuphan-SemiBold.ttf'),
    // 'Domine-Medium': require('./assets/fonts/Domine-Medium.ttf'),
    // 'Domine-Regular': require('./assets/fonts/Domine-Regular.ttf'),
    // 'Antic-Regular': require('./assets/fonts/Antic-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor='white' />
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <Navigator />
        {/* <Loader /> */}
      </Provider>
    </View>
    </>
  );
}


