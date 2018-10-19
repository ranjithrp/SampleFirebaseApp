import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Backend from '../Backend';

export default class Home extends React.Component {
  state = {
    email: '',
    password:''
  };
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Image source={require('../images/connect-plus-logo.png')} 
                style={styles.logo}/>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder='Enter your email :'
            style={styles.textInput}
            autoCapitalize = 'none'
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
            value={this.state.email}
          />
          <TextInput
            placeholder='passwords'
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize = 'none'
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            value={this.state.password}
          />
          <TouchableOpacity style={styles.signin}
            onPress={() => {
                Backend.signInWithEmail(this.state.email, this.state.password);
                if (Backend.getUid()){
                    Actions.chat({
                    id: Backend.getUid(),
                    });
                }
            }}
            >
            <Text style={styles.label}>
                Sign In
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>

            <TouchableOpacity
              onPress={() => {
                  Actions.register();
                  //Backend.signUpWithEmail(this.state.email, this.state.password);
              }}
              >
              <Text style={styles.label}>
                  Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#bdc3c7'
  },
  logo :{
    width:200,
    height:40,
  },
  logoContainer : {
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center',
  },
  formContainer :{
    padding:20,
  },
  buttonView:{
        paddingVertical:10,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',  
        justifyContent:'space-around'
    },
  label: {
    textAlign:'center',
    color:'#FFF'
  },
  signin: {
    backgroundColor:'#2c3e50',
    paddingVertical : 15,
  },
  textInput: {
    height: 40,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    marginBottom :20,
    color:'#FFF',
    paddingHorizontal:10,
  },
});