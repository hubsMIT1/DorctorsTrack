import { View, Text, useWindowDimensions, ScrollView, StyleSheet, Image, Dimensions, Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import SignUpLogo from '../../../assests/images/sign.png';

import CustomInput from '../../components/customInputs/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
const SignUpScreen = () => {
  const { height, width } = Dimensions.get("window")//useWindowDimensions();

  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, watch, formState: { errors } } = useForm();

  const pwd = watch('signpassword')

  const onSignInPressed = () => {

    navigation.navigate("SignIn");
  }


  const onSignUpPressed = async (data) => {
    // console.log("ischei", isChecked)
    if (loading) return;

    setLoading(true)
    const { username, email, signpassword } = data;
    // console.log("jklhl",username,email,signpassword,data)
    try {
      await Auth.signUp({
        username: email,
        password: signpassword,
        attributes: {
          name: username,

        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      });
      const key = "remPassword"

      const value = signpassword//control?.password;

      // console.log(isChecked, value)

      if (isChecked) {
        try {
          await AsyncStorage.removeItem(key);
          await AsyncStorage.removeItem("remCheck");
          await AsyncStorage.setItem(key, JSON.stringify(value));
          await AsyncStorage.setItem("remCheck", String(!isChecked));
          // console.log('Data saved successfully');
          setIsChecked(!isChecked)
        } catch (error) {
            ToastAndroid.show("Password is null",ToastAndroid.SHORT)
          // console.log('Error saving data:', error);
        }
      }
      navigation.navigate("ConfirmEmail", { email })

    } catch (error) {
      console.log('error signing up:', error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
    setLoading(false)

  }
  const onTersOfUsePressed = () => {
    ToastAndroid.show('Coming soon..', ToastAndroid.SHORT);

  }
  const onPrivacyPressed = () => {
    ToastAndroid.show('Coming soon..', ToastAndroid.SHORT);

  }
  const onRemeberPswrdPressed = () => {
    setIsChecked(!isChecked)

  }
  const [secureTextEntry, setsecureTextEntry] = useState(true)
  // console.log("siggnSetsecure", secureTextEntry)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.containerMain}>
        <View style={styles.root}>
          <Image source={SignUpLogo}
            style={[styles.logo, { height: 220 }]} resizeMode="cover" />
          {/* <View > */}
          <Text style={styles.title}>Sign Up</Text>

          <CustomInput name='username' placeholder="Username" control={control}
            rules={{ required: "Username is required", minLength: { value: 2, message: 'User should be minimum of 2 characters long' }, maxLength: { value: 20, message: 'Max characters 20' } }}
            secureTextEntry={false} errors={errors}
          />

          {/* <CustomInput name= 'username' placehoder = "Username" control={control} rules = {{required:"UserName is required",minLength:{value:2,message:'Minimum character 2'},maxLength:{value:20,message:'Max characters 20'}}}/> */}
          <CustomInput name='email' placeholder="Email" control={control}
            rules={{ required: { value: true, message: "Email is required" }, pattern: { value: EMAIL_REGEX, message: "Email is Invalid" } }} errors={errors} />

          <CustomInput name='signpassword' placeholder="Password" control={control}
            rules={{ required: "Password is required", minLength: { value: 8, message: 'Password should be minimum of 8 characters long' } }}
            secureTextEntry={secureTextEntry} errors={errors} setsecureTextEntry={setsecureTextEntry}
          />
          <CustomInput name='confirmpassword' placeholder="Confirm Password" control={control}
            rules={{ validate: value => value === pwd || "Password do not match" }}

            secureTextEntry={secureTextEntry} errors={errors} setsecureTextEntry={setsecureTextEntry}
          />
          <CustomButton text="Remember Password" onPress={onRemeberPswrdPressed}
            type="TERTIARY" checkBox={true} isChecked={isChecked} setIsChecked={setIsChecked} rememberFxn={onRemeberPswrdPressed}
          />
          <Text style={styles.termtext}>
            By registering, you confirm that you accept out <Text style={styles.link} onPress={onTersOfUsePressed}>Terms of Use </Text> and{' '} <Text style={styles.link} onPress={onPrivacyPressed} > Privacy Policy </Text>.
          </Text>
          <CustomButton disabled={loading} style={{ width: '100%', }} text={loading ? `Signing...` : `Sign Up`} onPress={handleSubmit(onSignUpPressed)} />
          {/* <View  style={{marginBottom:10}}> */}

          <CustomButton text="Already have an account ? Sign In" onPress={onSignInPressed}
            type="TERTIARY"
          />

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
    // alignItems:'center',
    height: '100%',
    backgroundColor: 'white'
  },
  logo: {
    width: '100%',
    // marginBottom:10,
    maxHeight: 220,
    marginBottom: 10,
    // maxWidth:'',
    // maxHeight:''
  },
  title: {
    fontSize: 36,
    padding: 20,
    fontWeight: 900,
    color: '#051C60',
  },
  termtext: {
    color: 'gray',
    // margin:10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // marginVertical:10
    marginTop:-10,
    marginBottom:10,
  },
  link: {
    color: '#FDB075'
  },
})

export default SignUpScreen;