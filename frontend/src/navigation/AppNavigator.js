import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SkillExchangeScreen from '../screens/SkillExchangeScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import RatingReviewScreen from '../screens/RatingReviewScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SkillExchange" component={SkillExchangeScreen} />
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>SkillSwap</Text>
        <Text style={styles.drawerSubtitle}>Campus Exchange</Text>
      </View>

      <DrawerItem
        label="Main"
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate('Main')}
      />
      <DrawerItem
        label="Ratings"
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate('Ratings')}
      />
      <DrawerItem
        label="Bookings"
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate('Bookings')}
      />

      <View style={styles.drawerFooter}>
        <DrawerItem
          label="Profile"
          labelStyle={styles.drawerLabel}
          onPress={() => props.navigation.navigate('Profile')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#04050E' },
        headerTintColor: '#FFFFFF',
        drawerStyle: { backgroundColor: '#04050E' },
      }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      <Drawer.Screen name="Ratings" component={RatingReviewScreen} />
      <Drawer.Screen name="Bookings" component={BookingScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#04050E',
    paddingTop: 20,
  },
  drawerHeader: {
    marginBottom: 24,
    marginLeft: 16,
  },
  drawerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  drawerSubtitle: {
    color: '#A7A7BC',
    fontSize: 14,
    marginTop: 4,
  },
  drawerLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  drawerFooter: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#2A2A42',
  },
});

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}