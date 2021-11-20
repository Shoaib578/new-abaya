import React, {useState, useEffect} from "react";
import { Text, 
    SafeAreaView, 
    StyleSheet, 
    Image, 
    TextInput, 
    Dimensions, 
    TouchableOpacity, 
    View, ScrollView,
    Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')

    useEffect(() => {
        GetProfileData()
    }, [])

    const GetProfileData = async () => {
        const values = await AsyncStorage.getItem('UserData')
        const userData = JSON.parse(values)
        setFirstName(userData.fname);
        setLastName(userData.lname);
        setEmail(userData.email)

    }

    const Logout = async () => {
        await AsyncStorage.removeItem('UserData')
        navigation.navigate('SignIn')
    }

    const Home = () => {
        navigation.navigate('root')
    }
    return(
        <SafeAreaView style={styles.container}>
            
            <View style={{flexDirection:'row', width:'60%', justifyContent:'space-between', marginTop:'10%'}}>
            <View style={{ alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {Logout()}} style={styles.LogoutButton}>
                    <Text style={{color:'#ba942d', fontSize:17}}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {Home()}} style={styles.LogoutButton}>
                    <Text style={{color:'#ba942d', fontSize:17}}>Home</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:'7.5%'}}>
                <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>{FirstName} </Text>
                {LastName == "null" ? null:
                <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>{LastName}</Text>
                }
            </View>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:'3%'}}>
                <Text style={{color:'#FFFFFF', fontSize:20, fontWeight:'bold'}}>{Email}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#ba942d'
    },

    LogoutButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        width:100,
        height:40,
        borderRadius:25,
    }
    
})

export default ProfileScreen