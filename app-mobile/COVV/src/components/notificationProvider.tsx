import * as Battery from 'expo-battery';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const BatteryMonitor = () => {
  useEffect(() => {
    const checkBatteryLevel = async () => {
      const batteryInfo = await Battery.getBatteryLevelAsync();
      if (batteryInfo < 0.25) {
        await handleLowBatteryNotification();
      }
    };

    // Vérifiez le niveau de la batterie au démarrage
    checkBatteryLevel();

    // Vous pouvez également utiliser un intervalle pour vérifier régulièrement
    const intervalId = setInterval(checkBatteryLevel, 60000); // toutes les 60 secondes

    return () => clearInterval(intervalId); // Nettoyage à la désinstallation
  }, []);

  const handleLowBatteryNotification = async () => {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Vérifiez si une notification a déjà été envoyée aujourd'hui
    const lastNotificationDate = await AsyncStorage.getItem('lastBatteryNotificationDate');

    if (lastNotificationDate !== today) {
      // Si la notification n'a pas été envoyée aujourd'hui, envoyez-la et mettez à jour la date
      await sendLowBatteryNotification();
      await AsyncStorage.setItem('lastBatteryNotificationDate', today);
    }
  };

  const sendLowBatteryNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Batterie faible",
        body: "Venez recharger votre appareil dans un de nos établissements partenaires !",
      },
      trigger: null, // Envoie immédiatement
    });
  };

  return null; // Composant ne rend rien
};

export default BatteryMonitor;
