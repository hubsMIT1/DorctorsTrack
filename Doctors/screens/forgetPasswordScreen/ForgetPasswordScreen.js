
import { View, Text, useWindowDimensions, ScrollView ,StyleSheet, Image, TextInput, TouchableOpacity,ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import SignLogo from '../../../assests/images/dtPic3.png';
import CustomInput from '../../components/customInputs/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm , Controller} from 'react-hook-form';
import { Dimensions } from 'react-native';
import {Auth} from 'aws-amplify';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;


const ForgetPasswordScreen = () => {
    const {height}  = Dimensions.get("window")//useWindowDimensions();
   
    const navigation = useNavigation();
    const {control,handleSubmit,formState: { errors },
 } = useForm();

    const [loading,setLoading] = useState(false)
    
    const onForgetPasswordPressed = async(data) =>{
        if(loading)return;
        const email = data?.email;
        setLoading(true);
        try{
            await Auth.forgotPassword(email)
            .then((res) => {
                // console.log(res)
                navigation.navigate('SetNewPassword',{email})
            })
            .catch((err) =>{
                ToastAndroid.show(err.message, ToastAndroid.SHORT)
                // console.log(err)
            });
        }
        catch(e){
            ToastAndroid.show(err.message, ToastAndroid.SHORT)
        }
      
        setLoading(false)
    }
   

    return (
        <ScrollView showsHorizontalScrollIndicator ={false} style={{height:height}}> 
    <View style = {[styles.root,{height:height,minHeight:height}]}>
        <Image source={SignLogo}
            style = {[styles.logo, {height: 440}]} resizeMode="cover" />

      {/* <Text>SignInScreen</Text> */}
      <Text style={styles.title}>Fotgot Password?</Text>
      {/* <CustomInput placehoder =  "Username" name='username'  control = {control} rules = {{required:"Username is required"}} secureTextEntry ={false}/> */}
      <View style={{marginVertical:25}}>
      <CustomInput  name = 'email' placeholder = "Email" control = {control}
      rules = {{required:{value:true,message:"Email is required"},pattern:{value:EMAIL_REGEX,message:"Email is Invalid"}}} errors={errors} />
      </View>
      <View style={{marginVertical:10}}>

      <CustomButton disabled ={loading} style={{width:'100%'}} text={loading?`Sending code`:`Submit`} onPress   = {handleSubmit(onForgetPasswordPressed)}  />
      </View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    title:{
        fontSize:32,
        padding:20,
        fontWeight:900,
        color:'#051C60',
    //    width:'50%',
    },
    root:{
        // alignItems:'center',
        // marginVertical:4,
        height:'100%',
        backgroundColor:'white',
    },
    logo:{
        width:'100%',
        // maxWidth:'',
        maxHeight:440,
    },
})
// export default SignInScreen
export default ForgetPasswordScreen;