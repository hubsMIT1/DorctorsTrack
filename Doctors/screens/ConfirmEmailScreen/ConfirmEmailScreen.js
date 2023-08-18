import { View, Text, useWindowDimensions, ScrollView, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import SignLogo from '../../../assests/images/dtPic4.png';

import CustomInput from '../../components/customInputs/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'
import { useRoute } from '@react-navigation/native'
import { Hub } from 'aws-amplify';

const { height } = Dimensions.get("window")
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%'*+/=?^_`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

const ConfirmEmail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { control, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { email: route?.params?.email } },);
    const [loading, setLoading] = useState(false);
    const email = watch('email');
    const password = route?.params?.password
    // console.log(route?.params?.email)

    const onConfirmEmailPressed = async (data) => {
        if (loading) return;

        setLoading(true)
        const { email, code } = data;
        // console.log(email)

        try {
            await Auth.confirmSignUp(email, code).then(()=>{

                if(password){
                    navigation.navigate("SignIn")
                }
                // Hub.listen('auth', ({ payload }) => {
                //     const { event } = payload;
                //     if (event === 'autoSignIn') {
                //       const user = payload.data;
                //       // assign user
                //     } else if (event === 'autoSignIn_failure') {
                //       // redirect to sign in page
                //     }
                //   })
            });
            ToastAndroid.show('Registered Successfully!', ToastAndroid.SHORT);
            
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
            console.log('error confirming sign up', error);
        }

        setLoading(false)
    }
    const onSignInPress = () => {
        navigation.navigate("SignIn");
    }
    const onResendPress = async () => {
        try {
            await Auth.resendSignUp(email);
            ToastAndroid.show('Verification code sent on your email', ToastAndroid.SHORT);
            // console.log('code resent successfully');
        } catch (err) {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);

            // console.log('error resending code: ', err);
        }

    }
    const [code, setCode] = useState('');

    // const [email,setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.root, { minheight: height, height: height }]}>
                <Image source={SignLogo}
                    style={[styles.logo, { height: height / 2 }]} resizeMode="cover" />

                <Text style={styles.title}>Confirm Email</Text>
                <CustomInput name='email' placeholder="Email" control={control}
                    rules={{ required: { value: true, message: "Email is required" }, pattern: EMAIL_REGEX }}
                    secureTextEntry={false} errors={errors}
                />
                <CustomInput name='code' placeholder='Enter verification code'
                    value={code} setValue={setCode} control={control} rules={{ required: { value: true, message: "Code is required" } }} errors={errors} />
                <CustomButton disabled={loading} text={loading ? `Verifying...` : `Confirm`} onPress={handleSubmit(onConfirmEmailPressed)} />
                <View style={styles.pwdCheckPassword}>
                    <CustomButton style={{ alignItems: 'flex-start' }} text="Resend code" onPress={onResendPress} type="TERTIARY" />
                    <CustomButton text="Back to Sign in" onPress={onSignInPress} type="TERTIARY" />
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        // alignItems:'',
        backgroundColor: 'white'

    },
    pwdCheckPassword: {
        // width:'100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //         marginHorizontal: 50, // Add margin to adjust spacing as needed
        //   paddingHorizontal: 20,
    },

    logo: {
        width: '100%',
        // maxWidth:'',
        // maxHeight:''
    },
    title: {
        fontSize: 36,
        padding: 10,
        fontWeight: 'bold',
        color: '#051C60',


    },
    text: {
        color: 'gray',
        margin: 10,
        paddingHorizontal: 10,
        // marginVertical:10
    },
    link: {
        color: '#FDB075'
    },

})

export default ConfirmEmail;