import { View, Text, useWindowDimensions, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import SignLogo from '../../../assests/images/signLogo2.png';

import CustomInput from '../../components/customInputs/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { Dimensions } from 'react-native';
import { Auth } from 'aws-amplify'
import { Hub } from 'aws-amplify';

function listenToAutoSignInEvent() {
 
}
import AsyncStorage from '@react-native-async-storage/async-storage';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

const SignInScreen = () => {
  const { height, width } = Dimensions.get("window")//useWindowDimensions();
  const [username, setUsername] = useState();
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors },
  } = useForm();
  const [secureTextEntry, setsecureTextEntry] = useState(true)
  // console.log("secureTex", secureTextEntry)
  const [isChecked, setIsChecked] = useState(false);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', JSON.parse(value));
        setIsChecked(!(JSON.parse(value)));
      } else {
        // ToastAndroid.show('Data not found', ToastAndroid.SHORT);
        // console.log('Data not found');
      }
    } catch (error) {
      // console.log('Error retrieving data:', error);
      
      ToastAndroid.show(error.message, ToastAndroid.SHORT);

    }
  };


  useEffect(() => {

    getData("remCheck")

  }, [])

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState()


  const onSignInPressed = async (data) => {
    // console.warn("Sign In")
    // console.log(loading) 
    if (loading) { return null; }
    const { email, password } = data;
    // console.log("passwordddd", password)
    const name = email;
    setLoading(true)
    try {
      const user = await Auth.signIn(name, password);
    } catch (error) {
      // console.log('error signing in', error);
      if (error.message == "User is not confirmed.") {
        // setLoading(false)
        try {
          await Auth.resendSignUp(email);
          console.log(error);
      
          navigation.navigate("ConfirmEmail",{email:name,password})
          
        }
        catch (e) {
          ToastAndroid.show(e.message, ToastAndroid.SHORT);
        }
      }
      ToastAndroid.show("Check your email " + error.message, ToastAndroid.SHORT);
    }
    setLoading(false)
    
  }
  const onForgetPasswordPressed = () => {

    navigation.navigate('ForgetPassword')
  }
  const onSignUpPress = () => {
    // console.warn("Create Account")
    navigation.navigate("SignUp")

  }

  const onRemeberPswrdPressed = async () => {
    const key = "remPassword";
    const value = password; // control?.password;
    // console.log(isChecked, value);

    if (!isChecked) {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        await AsyncStorage.setItem("remCheck", String(isChecked));
        // console.log('Data saved successfully');
        setIsChecked(!isChecked);
      } catch (error) {
        ToastAndroid.show("Password is null", ToastAndroid.SHORT);
        // console.log('Error saving data:', error);
      }
    } else {
      try {
        await AsyncStorage.removeItem(key);
        await AsyncStorage.removeItem("remCheck");
        setIsChecked(!isChecked);
        // console.log('Data deleted successfully');
      } catch (error) {
        ToastAndroid.show("Password is null", ToastAndroid.SHORT);
        // console.log('Error deleting data:', error);
      }
    }
  }


  // console.log(height, width)

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.containerMain}>
        <View style={[styles.root]}>
          <Image source={SignLogo}
            style={[styles.logo, { height: 440 }]} resizeMode="cover" />

          <CustomInput placeholder="Email" name='email' control={control}
            rules={{ required: { value: true, message: "Email is required" }, pattern: { value: EMAIL_REGEX, message: "Email is Invalid" } }}
            secureTextEntry={false} errors={errors}
          />
          <CustomInput  placeholder="Password" name='password' control={control}
            rules={{ required: { value: true, message: "Password is required" }, minLength: { value: 8, message: 'Minimum 8 characters' } }}
            secureTextEntry={secureTextEntry} errors={errors} setPasswordInLS={setPassword} setsecureTextEntry={setsecureTextEntry}
          />
          <View style={styles.pwdCheckPassword}>
            <CustomButton text="Remember Password" onPress={onRemeberPswrdPressed}
              type="TERTIARY" checkBox={true} isChecked={isChecked} setIsChecked={setIsChecked} rememberFxn={onRemeberPswrdPressed}
            />

            <CustomButton text="Forgot password" onPress={onForgetPasswordPressed}
              type="TERTIARY"
            />
          </View>
          <CustomButton disabled={loading} text={loading ? `Signing...` : `LOGIN`} onPress={handleSubmit(onSignInPressed)} type="PRIMARY" />
          <View style={{marginVertical:15}}>

          <CustomButton text="Don't have an account ? Create one" onPress={onSignUpPress}
            type="TERTIARY"
          />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    minHeight: 870,

  },
  root: {

    height: '100%',
    backgroundColor: 'white',

  },
  logo: {
    width: '100%',
    maxHeight: 440,
    marginBottom: 10,

  },

  pwdCheckPassword: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

})
export default SignInScreen;