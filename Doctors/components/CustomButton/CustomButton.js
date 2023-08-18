import { View, Text, Pressable,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import CheckBox from 'react-native-check-box'
const CustomButton = ({onPress,text,type="PRIMARY", bgColor, fgColor,checkBox,isChecked,setIsChecked,rememberFxn,disabled,textColor}) => {
  // const [isChecked,setIsChecked] = useState(false);
  return (
    <Pressable onPress = {onPress} style={[styles.container,styles[`container_${type}`],checkBox ? {alignItems:'flex-start'}:'center'
    , bgColor ? {backgroundColor:bgColor}:{}]}>
      <View style={styles.checkboxContainer}>
      {checkBox ?
        (<>
            <CheckBox
            style={{paddingBottom:5,position:'relative',top:-2,}}
          isChecked={isChecked}
          onClick={()=> { rememberFxn()}}
          checkBoxColor={"#3B71F3"}
        />
        <Text style={{color:"#3B71F3",alignContent:'center'}} > {text} </Text>
        </>)
      
        :
     (  <Text  style={[styles.text, styles[`text_${type}`],textColor?{color:textColor}:{},
       ,fgColor?{backgroundColor:fgColor}:{}]} disabled={disabled}> {text} </Text>)
      }
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        // marginBottom: 20,
      },
      checkbox: {
        // alignSelf: 'center',
        color:'#3B71F3',
        borderColor:'#3B71F3',
      },
    container:{
        backgroundColor: '#3B71F3',
        // width:'100%',
        padding:15,
        marginVertical:5,
        alignItems:'center',
        // borderRadius:5,
    },
    container_PRIMARY:{
        backgroundColor:'#3B71F3',
        // width:'100%',
        marginHorizontal:20,
        borderRadius:40,
        padding:10,
        
    },
    container_TERTIARY:{
        backgroundColor:'transparent',
        paddingHorizontal:15,
        marginVertical:0,
        // alignItems:'flex-start',
    },
    text:{
        fontWeight:900,
        alignItems:'center',
        color:'white',
        fontSize:25,
    },
    container_SECONDARY:{
        borderColor:'#3B71F3',
        borderWidth:2
    },

    test_SECONDARY:{
        color:'#3B71F3',
      },
      text_TERTIARY:{
        color:'#3B71F3', 
        fontSize:15,
        fontWeight:500,
    }
    
})

export default CustomButton