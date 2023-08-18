
import { View, Text, useWindowDimensions, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import SignLogo from '../../assests/images/DTlogo-1.png';

import CustomInput from '../components/customInputs/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';

import { useNavigation } from '@react-navigation/native';

import { useForm, Controller } from 'react-hook-form';
import { Dimensions } from 'react-native';

import { Auth } from 'aws-amplify';



const ForgetPasswordScreen = () => {
    const { height } = Dimensions.get("window")//useWindowDimensions();

    const navigation = useNavigation();


    const [isChecked, setIsChecked] = useState(false);


    const onLogoutPressed = async () => {

        try {
            await Auth.signOut({ global: true });
            // navigation.navigate("SignIn");
            ToastAndroid.show("LogOut Successfully", ToastAndroid.SHORT);

        } catch (error) {
            //   console.log('error signing out: ', error);
            ToastAndroid.show(error.message, ToastAndroid.SHORT);

        }

    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} style={{ height: height }}>
            <View style={[styles.root, { height: height, minHeight: height }]}>
                <Text style={[styles.title, { alignSelf: 'center' }]}> Welcome in </Text>
                <Image source={SignLogo}
                    style={[styles.logo, {height:340 }]} resizeMode="cover" />

                <CustomButton textColor="white" style={{ width: '50%' }} text="LogOut" onPress={onLogoutPressed} />
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        padding: 10,
        fontWeight: 900,
        color: '#051C60',
        //    width:'50%',


    },
    root: {
        // alignItems:'center',
        // marginVertical:4,
        flex:1,
        justifyContent:'space-around',
        height: '100%',
        backgroundColor: 'white',

    },
    logo: {
        width: '100%',
        alignItems:'center'
        // maxWidth:'',
        // maxHeight:''
    },



})
export default ForgetPasswordScreen;