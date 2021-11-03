import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import CustomList from '../components/CustomList';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Beacon",
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { fontWeight: 'bold', color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <TouchableOpacity activeOpacity={0.5} >
          <Avatar rounded source={ {uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
    ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 80,
            marginRight: 20,
          }}
          >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" style={{marginRight: 20}}/>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
          </View>
      ),
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
