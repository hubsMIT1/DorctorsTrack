import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet ,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signInScreen/SignInScreen';
import SignUpScreen from '../screens/signUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import SetNewPassword from '../screens/setNewPassword/SetNewPassword';
import ForgetPasswordScreen from '../screens/forgetPasswordScreen/ForgetPasswordScreen';
import Home from '../components/Home';
import { Auth, Hub } from 'aws-amplify';
import SignLogo from '../../assests/images/DTlogo-1.png';

const Stack = createNativeStackNavigator();
const { height } = Dimensions.get('window');

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {

    const listener = (data) => {
      // console.log("index", data?.payload?.event)
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut' || data.payload.event === 'autoSignIn' || data.payload.event === 'confirmSignUp' || data.payload.event === 'confirmSignIn') {
        checkUser();
        // console.log("hello")
      }
    };
    try{
        Hub.listen('auth', listener);
      return () => {
        Hub.remove('auth', listener);
      }
    }
      catch(err){
        console.log("index",err);
      }

    
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
       <Image source={SignLogo}
                    style={[styles.logo, {height:340 }]} resizeMode="cover" />

        <Text style={[styles.title, { alignItems: 'center' }]}>Welcome to Doctor's Track</Text>
      </View>
    );
  }

  return (
    <NavigationContainer style={{ height: height }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    padding: 10,
    fontWeight: '900',
    color: '#051C60',
    alignItems: 'center',
  },
 
logo: {
    width: '100%',
    alignItems:'center'
    // maxWidth:'',
    // maxHeight:''
},
});

export default Navigation;
