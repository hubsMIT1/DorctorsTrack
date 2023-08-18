import React, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";

import AsyncStorage from "@react-native-async-storage/async-storage";
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.selectionColor = 'gray';
export default function App({ placeholder, name, control, rules = {}, secureTextEntry, errors, setPasswordInLS, setsecureTextEntry }) {
  const [savedPassword, setSavedPassword] = useState(null);
  const [inputData, setInputData] = useState("");
  const [changed, setChanged] = useState(false);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const pswrd = JSON.parse(value);
        setSavedPassword(pswrd);
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };


  useEffect(() => {
    if (name === "password") {
      getData("remPassword");
    }
  }, []);
  
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) =>{
        {name === "password" && !value && savedPassword ? onChange(savedPassword):null}
        
      return (
        <View>
          {errors[name] && (
            <Text style={styles.errorText}>{errors[name].message || "Some Error"}</Text>
          )}
          <View style={[styles.container, errors[name] && styles.containerError]}>
            <View style={styles.iconContainer}>
            {name === "code" && <FontAwesomeIcon name="file-code-o"  size={20} color="gray" style={styles.circleIcon} />}
              {name === "email" && <Fontisto name="email"  size={20} color="gray" style={styles.circleIcon} />}
              {(name === "password" || name === "new_password" || name === "signpassword" || name === "confirmpassword") && (
                <Icon name="ios-lock-closed-outline" size={20} color="gray" style={styles.circleIcon} />
              )}
              {name === "username" && <Icon name="md-person-outline" size={20} color="gray" style={styles.circleIcon} />}
            </View>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="gray"
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                name==="password"?setSavedPassword(value) : '';
                name === "password" ? setPasswordInLS(value) : "";
                setChanged(true);
              }}
              value={value}
              secureTextEntry={secureTextEntry}
             
            />
            { (name === "password" || name === "new_password" || name === "signpassword" || name === "confirmpassword") && (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>{ setsecureTextEntry(!secureTextEntry);  console.log(secureTextEntry)}}
              >
               {( <Icon name={secureTextEntry ?'eye-off':'eye'} size={25} color="gray" />)}
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}}
      name={name}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ebf0ed",
    borderRadius: 50,
    padding: 6,
    paddingHorizontal: 20,
    margin: 10,
  },
  containerError: {
    borderColor: "red",
  },
  circleIcon: {
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 50,
    padding: 4,
    // backgroundColor:'red',
    // borderColor: "gray",
    borderWidth: 0.5,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 18,
    fontFamily:'serif',
    
  },
  errorText: {
    color: "red",
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
});
