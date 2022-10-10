import React, { useContext } from 'react';
import { View } from 'react-native';
import {
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Iconn from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './drawerContent.style';
import { AuthContext } from '../../services/firebase/authProvider';
import colors from '../../assets/colors/colors';
  
export function DrawerContent(props) {
    const {user, login, register, logout} = useContext(AuthContext);
    return(
        <View style={{flex:1}}>
            <View style={{flex:10}}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flex:1,marginTop: 15 }}>
                            <Icon 
                                name="account-outline" 
                                size={50}
                                color={colors.white}
                            />
                            <View style={{flex:1, justifyContent:"flex-end"}}>
                                {user?.res_name ?<Title style={styles.title}>{user?.res_name}</Title>:
                                <Title style={styles.title}> @Username</Title>}
                                {user?.res_email ?<Caption style={styles.caption}>{user?.res_email}</Caption>:
                                <Caption style={styles.caption}>user_email@gmail.com</Caption>}
                            </View>
                        </View>
                    </View>
                    <View style={{flex:3}}>
                        <DrawerContentScrollView {...props}>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="home" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Dashboard"
                                onPress={() => {props.navigation.navigate('HomeScreen')}} 
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="history" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Recent Orders"
                                onPress={() => {props.navigation.navigate('History')}}
                            />
                            {/* <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="bike" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Deliveries"
                                onPress={() => {props.navigation.navigate('Deliveries')}}
                            /> */}
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Iconn 
                                    name="ios-notifications-sharp" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Notifications"
                                onPress={() => {props.navigation.navigate('Notifications')}}
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="credit-card" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Wallet"
                                onPress={() => {props.navigation.navigate('Wallet')}}
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Iconn 
                                    name="settings-sharp" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Settings"
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                    name="account-check-outline" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Support"
                            />
                        </Drawer.Section>
                        </DrawerContentScrollView>
                    </View>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:colors.primary}}>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="exit-to-app" 
                            color={colors.white}
                            size={size}
                            />
                        )}
                        label="Sign Out"
                        labelStyle={{color:colors.white}}
                        onPress={() => logout()}
                    />
                </Drawer.Section>
            </View>
        </View>
    );
}


