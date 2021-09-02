import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import FlashMessage,{showMessage,hideMessage } from "react-native-flash-message";

export function dispatchDefaultMessage(titulo,mensaje){
    showMessage({
        message: titulo,
        description: mensaje,
        type: "default",
        position: "bottom",
        textStyle:styles.flashTextoStyle,
        titleStyle:styles.flashTitleStyle
    });
}

const styles = StyleSheet.create({
flashTitleStyle:{
  fontSize:18,
	color: '#ffffff',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Bold',
  marginBottom:5,
},
flashTextoStyle:{
  fontSize:16,
  color: '#ffffff',
	textAlign: 'left',
  fontFamily: 'Ubuntu-Light',  
  marginTop: 1,
  marginBottom: 1,
},  
});