import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button,TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera/next";

export default class TransactionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          domState: "normal",
          hasCameraPermissions: null,
          scanned: false,
          scannedData: ""
        };
      }

     
    
      getCameraPermissions = async (domState) => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        // const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({
          //status === "granted" is true when user has granted permission
           //   status === "granted" is false when user has not granted the permission
            
          hasCameraPermissions: status === "granted",
          domState:domState,
          scanned: false
        });
      };
 
  

 handleBarCodeScanned = ({ type, data }) => {
    this.setState({
        scannedData: data,
        domState: "normal",
        scanned: true
      });
   
  };

  render(){
   if(this.state.domState=="scanner"){
    return(
        <CameraView
        onBarcodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
        barcodeScannerSettings={{
          barCodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
    )
   }
  

  return (
    <View style={styles.container}>
       <Text style={styles.text}>
          {this.state.hasCameraPermissions ? this.state.scannedData : "Request for Camera Permission"}
        </Text>
  
    <TouchableOpacity
       style={[styles.button, { marginTop: 25 }]}
      onPress={() => this.getCameraPermissions("scanner")}
       >
      <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
     
    </View>
  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#5653D4"
    },
    text: {
      color: "#ffff",
      fontSize: 15
    },
    button: {
      width: "43%",
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F48D20",
      borderRadius: 15
    },
    buttonText: {
      fontSize: 24,
      color: "#FFFFFF"
    }
  });
