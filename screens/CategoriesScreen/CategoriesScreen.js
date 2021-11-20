import React,{useState, useEffect} from "react";
import { Text, SafeAreaView, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, View, FlatList } from 'react-native';

const CategoriesScreen = ({navigation}) => {
    const [categories, setCategories] = useState([])
    const [showSubCat, setShowSubCat] = useState(false)
    const [subCategory, setSubCategory] = useState([])
    const [toShowSubCategory, setToShowSubCategory] = useState('')

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        await fetch('http://ime.geu.mybluehost.me/api/getcategories', {
            method:'GET',
            "Content-Type":"application/json"
        }).then((response) => response.json().then(
            
            response => setCategories(response),
        ))
    }

    const ShowSubCategories = async (categoryId) => {
        setToShowSubCategory(categoryId)
        setShowSubCat(!showSubCat)

        await fetch(`http://ime.geu.mybluehost.me/api/getsubcategoriesbyId/${categoryId}`, {
            method:'GET',
            "Content-Type":"application/json"
        }).then((response) => response.json().then(
            response => {
                setSubCategory(response);
                console.log(response)
            }
        ))

    }
    return(
        <SafeAreaView style={styles.screen}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={categories}
            renderItem={({item, index}) => (
                
                <TouchableOpacity onPress={() => {navigation.navigate('CategoryProducts', {"id": item.id, "CategoryName":item.CategoryName})}} style={styles.Category} key={item.id} 
                >
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', width:'100%', }}>
                    <Text style={styles.CategoryName}>{item.CategoryName}</Text>
                    <TouchableOpacity style={{position:'relative', elevation:-1}} onPress={() => ShowSubCategories(item.id)} style={{marginLeft:'15%'}}>
                    <Image style={{width:7, height:12,}} source={require('./assets/arrow.png')}/>
                    </TouchableOpacity>
                </View>
            
                {showSubCat == true && toShowSubCategory == item.id ?
                <View style={{flex:1, flexDirection:'column'}}>
                {subCategory.map((cat) => (
                    
                    <TouchableOpacity style={{width:'60%', marginLeft:'39%', paddingBottom:'2%', 
                    paddingTop:'2%', 
                    borderBotttomColor:'gray', 
                    borderBottomWidth:0.5, 
                    justifyContent:'center', 
                    position:'absolute',
                    backgroundColor:'#FFFFFF', 
                    elevation:3,
                    alignItems:'center'
                       }}>
                    <Text>{cat.SubCategoryName}</Text>
                    </TouchableOpacity>
                    
                ))}
                </View>
                :null}
                
                </TouchableOpacity>
            )}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'#E5E5E5',
        
    },
    Category:{
        marginTop:'5%',
        height:50,
        borderBottomColor:'gray',
        borderBottomWidth:1,
        position:'relative'
        
    },
    
    CategoryName:{
        fontSize:20,
        color:'#000000',
    }
})

export default CategoriesScreen;
