import React from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    CameraRoll,
    Button,
    Modal,
} from 'react-native';


import Backend from '../Backend';

export class Registration extends React.Component {
    state = {
        userName :'',
        email : '',
        password : '',
        photos : [],
        modalVisible: false,
    }
    getPhotos = () => {
        CameraRoll.getPhotos({
            first: 20,
        })
        .then(r => this.setState({ photos: r.edges }))
    }

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder='Name :'
                        style={styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText={(text) => {
                        this.setState({
                            userName: text,
                        });
                        }}
                        value={this.state.userName}
                    />
                    <Button
                        title='View Photos'
                        onPress={() => { this.toggleModal(); this.getPhotos() }}
                        />
                        <Button
                        title='Browse Images'
                        onPress={this.navigate}
                        />
                        <Modal
                        animationType={"slide"}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => console.log('closed')}
                        >
                        <View style={styles.modalContainer}>
                            <Button
                            title='Close'
                            onPress={this.toggleModal}
                            />
                            <ScrollView
                            contentContainerStyle={styles.scrollView}>
                            {
                                this.state.photos.map((p, i) => {
                                return (
                                    <TouchableHighlight
                                    style={{opacity: i === this.state.index ? 0.5 : 1}}
                                    key={i}
                                    underlayColor='transparent'
                                    onPress={() => this.setIndex(i)}
                                    >
                                    <Image
                                        style={{
                                        width: width/3,
                                        height: width/3
                                        }}
                                        source={{uri: p.node.image.uri}}
                                    />
                                    </TouchableHighlight>
                                )
                                })
                            }
                            </ScrollView>
                            {
                            this.state.index !== null  && (
                                <View style={styles.shareButton}>
                                <Button
                                    title='Share'
                                    onPress={this.share}
                                    />
                                </View>
                            )
                            }
                        </View>
                        </Modal>



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
                        
                        >
                        <Text style={styles.label}>
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#bdc3c7'
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
    marginBottom:20, 
  },
  textInput: {
    height: 40,
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    marginBottom :20,
    color:'#FFF',
    paddingHorizontal:10,
  },
});