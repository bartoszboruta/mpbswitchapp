import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Home }from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile, EditUser } from '../pages/Profile';
import { Devices, AddDevice, Device } from '../pages/Device';

export const _LoggedOut = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'MBPSwitch',
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login',
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: 'Register',
            }
        },
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#004881',
            },
            headerTitleStyle: {
                color: 'white'
            },
        }
    }
);

export const _Device = StackNavigator({
    Device: { screen: Device },
});

export const _AddDevice = StackNavigator({
    AddDevice: { screen: AddDevice },
});

export const _EditUser = StackNavigator({
    EditUser: { screen: EditUser },
});

export const _LoggedIn = TabNavigator(
    {
        Devices: {
            screen: Devices,
            navigationOptions: {
                tabBarLabel: "Devices",
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: "Profile",
            }
        },
    },
    {
        tabBarOptions: {
            indicatorStyle: {
                borderBottomColor: '#ffffff',
                borderBottomWidth: 2,
            },
            showIcon: true,
            style: {
                backgroundColor: '#004881',
            },
        },
    }
);

export const createRootNavigator = (loggedIn = false) => {
    return StackNavigator(
        {
            LoggedIn: {
                screen: _LoggedIn,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            },
            LoggedOut: {
                screen: _LoggedOut,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            },
            AddDevices: {
                screen: _AddDevice,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            },
            Device: {
                screen: _Device,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            },
            EditUser: {
                screen: _EditUser,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            }
        },
        {
            headerMode: 'none',
            mode: 'modal',
            initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut'
        }
    )
};