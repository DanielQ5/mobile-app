import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BottomTabBar, { TabKey } from './components/BottomTabBar';
import HomeScreen from './components/HomeScreen';
import ServicesScreen from './components/ServicesScreen';
import ScheduleScreen from './components/ScheduleScreen';
import ProgressScreen from './components/ProgressScreen';
import ProfileScreen from './components/ProfileScreen';
import {
  Appointment,
  REWARD_THRESHOLD,
  Service,
  customer,
  initialAppointments,
  initialGardenZones,
  services,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [rewardAvailable, setRewardAvailable] = useState(false);

  function handleBookService(service: Service, notes: string, useReward: boolean) {
    const redeeming = useReward && rewardAvailable;
    const newAppointment: Appointment = {
      id: `a${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      date: 'To be scheduled',
      status: 'upcoming',
      notes: notes.trim() ? notes.trim() : undefined,
      isFree: redeeming || undefined,
    };
    const nextAppointments = [newAppointment, ...appointments];
    setAppointments(nextAppointments);

    if (redeeming) {
      setRewardAvailable(false);
    } else if (nextAppointments.length % REWARD_THRESHOLD === 0) {
      setRewardAvailable(true);
      Alert.alert(
        "You've earned a reward! 🎉",
        `That's ${REWARD_THRESHOLD} maintenances — your next booking can be free!`
      );
    }

    Alert.alert('Service booked', `${service.name} has been added to your schedule.`);
    setActiveTab('schedule');
  }

  function handleRateAppointment(id: string, rating: number, comment: string) {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, rating, comment: comment.trim() ? comment.trim() : undefined } : appt
      )
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'home' && (
        <HomeScreen
          customer={customer}
          appointments={appointments}
          rewardAvailable={rewardAvailable}
          onRequestService={() => setActiveTab('services')}
        />
      )}
      {activeTab === 'services' && (
        <ServicesScreen
          services={services}
          rewardAvailable={rewardAvailable}
          onBookService={handleBookService}
        />
      )}
      {activeTab === 'schedule' && (
        <ScheduleScreen appointments={appointments} onRateAppointment={handleRateAppointment} />
      )}
      {activeTab === 'progress' && (
        <ProgressScreen appointments={appointments} gardenZones={initialGardenZones} />
      )}
      {activeTab === 'profile' && (
        <ProfileScreen customer={customer} appointments={appointments} rewardAvailable={rewardAvailable} />
      )}

      <BottomTabBar activeTab={activeTab} onChangeTab={setActiveTab} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
