/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SignInScreen from './Doctors/screens/signInScreen/SignInScreen';

import SignUpScreen from './Doctors/screens/signUpScreen/SignUpScreen';
import ForgetPasswordScreen from './Doctors/screens/forgetPasswordScreen/ForgetPasswordScreen';
import SetNewPassword from './Doctors/screens/setNewPassword/SetNewPassword';
import Navigation from './Doctors/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';

import PropTypes from 'deprecated-react-native-prop-types';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

Amplify.configure(awsExports);

// Amplify.configure(awsmobile)
function App() {
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <View>
    <Navigation />
    // </View>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
