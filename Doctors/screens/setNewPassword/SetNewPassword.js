import { View, Text, useWindowDimensions, ScrollView, StyleSheet, Image, Dimensions, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import SignLogo from '../../../assests/images/dtPic4.png';

import CustomInput from '../../components/customInputs/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify';

const { height } = Dimensions.get("window")
const SetNewPassword = () => {

    const route = useRoute();

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, watch, formState: { errors } } = useForm();

    const email = route?.params?.email;

    const onSetNewPasswordPressed = (res) => {
        if (loading) return;
        const { code, new_password } = res;
        // console.log(res, " ||", new_password, email)
        setLoading(true)
        Auth.forgotPasswordSubmit(email, code, new_password)
            .then((data) => {
                // console.log(data)
                navigation.navigate("SignIn");
                ToastAndroid.show("Password has Changed successfully", ToastAndroid.SHORT);
            })
            .catch((err) => {
                // console.log(err)
                ToastAndroid.show(err.message, ToastAndroid.SHORT);

            });
        setLoading(false)

    }
    const [secureTextEntry, setsecureTextEntry] = useState(true)
    const [newPassword, setNewPassword] = useState('');
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.root, { minheight: height, height: height }]}>
                <Image source={SignLogo}
                    style={[styles.logo, { height: 440 }]} resizeMode="cover" />

                <Text style={styles.title}>Reset Password</Text>
                <CustomInput name='code' placeholder='Enter Verification Code'
                    control={control} rules={{ required: { value: true, message: "Code is required" } }} errors={errors} />
                <CustomInput name='new_password' placeholder="Create New Password" control={control}
                    secureTextEntry={secureTextEntry} errors={errors} setsecureTextEntry={setsecureTextEntry}
                    rules={{ required: { value: true, message: "Password is required" }, minLength: { value: 8, message: 'Password should be minimum of 8 characters long' }, maxLength: { value: 50, message: 'Maximum characters reached' } }}
                />
                <View style={{ marginVertical: 25 }}>
                    <CustomButton disabled={loading} text={loading ? `Updating..` : `Reset`} onPress={handleSubmit(onSetNewPasswordPressed)} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        // alignItems:'center',
        height: '100%',
        backgroundColor: 'white'

    },
    logo: {
        width: '100%',
        // maxWidth:'',
        maxHeight: 440,
    },
    title: {
        fontSize: 36,
        padding: 20,
        fontWeight: 900,
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

export default SetNewPassword;