import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { Anton_400Regular } from '@expo-google-fonts/anton';
import { Bungee_400Regular } from '@expo-google-fonts/bungee';
import { Oswald_400Regular, Oswald_600SemiBold } from '@expo-google-fonts/oswald';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    Bungee_400Regular,
    Oswald_400Regular,
    Oswald_600SemiBold,
    Roboto_400Regular,
    // TODO: add custom font files then uncomment lines below
    // Komsomol_400Regular: require('./assets/fonts/Komsomol-Regular.ttf'),
    // HelveticaWorld_400Regular: require('./assets/fonts/HelveticaWorld-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Optionally render a splash or loader here
  }

  return <AppNavigator />;
}
