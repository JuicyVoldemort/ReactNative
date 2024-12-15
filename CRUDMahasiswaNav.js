import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPen, faPlusCircle, faEdit, faMap } from '@fortawesome/free-solid-svg-icons'; // Add faMap for the map icon
import Createdata from './Createdata';
import Listdata from './Listdata';
import EditData from './EditData'; // Import the EditData component
import MapScreen from './MapScreen'; // Import the MapScreen component

function HomeScreen() {
  return <Createdata />;
}

function SettingsScreen() {
  return <Listdata />;
}

function EditdataScreen() {
  return <EditData />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Tab for adding data
        <Tab.Screen
          name="Tambah"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faPlusCircle} color={color} size={20} />
            ),
          }}
        /> */}
        {/* Tab for listing data */}
        <Tab.Screen
          name="Orders"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
            ),
          }}
        />
        {/* Tab for displaying the map */}
        <Tab.Screen
          name="Mark Location"
          component={MapScreen} // Ini tampilan peta nya jangan lupa namanya MapScreen
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMap} color={color} size={20} />
            ),
          }}
        />
        {/* Tab for editing data */}
        <Tab.Screen
          name="Edit Orders"
          component={EditdataScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faEdit} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
