
import { View, Text, useWindowDimensions, ScrollView ,StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import SignLogo from '../../assests/images/dtPic3.png';

import CustomInput from '../components/customInputs/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';

import {useNavigation} from '@react-navigation/native';

import {useForm , Controller} from 'react-hook-form';
import { Dimensions } from 'react-native';

import { Auth } from 'aws-amplify';



const FirstPage = () => {
    const {height}  = Dimensions.get("window")//useWindowDimensions();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState('')
    const navigation = useNavigation();
    const {control,handleSubmit,formState: { errors },
 } = useForm();

    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheck = () => {
      setIsChecked(!isChecked);
    };
    const onSignInPressed = () =>{
        console.warn("Sign In")
        navigation.navigate('')
    }
    const onLogoutPressed = async() =>{
       
            try {
                await Auth.signOut();
                navigation.navigate('SignIn');
            } catch (error) {
              console.log('error signing out: ', error);
            }
          
        // console.warn("Forget password")
        // setIsChecked(!isChecked);
    }
    const onSignUpPress = () =>{
        console.warn("Create Account")
        navigation.navigate("SignUp")

    }

    return (
        <ScrollView showsHorizontalScrollIndicator ={false} style={{height:height}}> 
    <View style = {[styles.root,{height:height}]}>
        
      {/* <Text>SignInScreen</Text> */}
      <Text style={[styles.title,{alignSelf:'center'}]}>Welcome in Doctor's Track </Text>
      {/* <CustomInput placehoder =  "Username" name='username'  control = {control} rules = {{required:"Username is required"}} secureTextEntry ={false}/> */}

      </View>

  
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    title:{
        fontSize:32,
        padding:10,
        fontWeight:900,
        color:'#051C60',
    //    width:'50%',
       

    },
    root:{
        alignItems:'center',
        // marginVertical:4,
        height:'100%',
        backgroundColor:'white',

    },
    logo:{
        width:'100%',
        // maxWidth:'',
        // maxHeight:''
    },
   
     
     
})

// export default SignInScreen

export default FirstPage;