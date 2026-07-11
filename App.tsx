import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BottomTabBar, { TabKey } from './components/BottomTabBar';
import HomeScreen from './components/HomeScreen';
import ServicesScreen from './components/ServicesScreen';
import ScheduleScreen from './components/ScheduleScreen';
import ProfileScreen from './components/ProfileScreen';
import {
  Appointment,
  Service,
  customer,
  initialAppointments,
  services,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  function handleBookService(service: Service) {
    const newAppointment: Appointment = {
      id: `a${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      date: 'To be scheduled',
      status: 'upcoming',
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    Alert.alert('Service booked', `${service.name} has been added to your schedule.`);
    setActiveTab('schedule');
  }

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'home' && (
        <HomeScreen
          customer={customer}
          appointments={appointments}
          onRequestService={() => setActiveTab('services')}
        />
      )}
      {activeTab === 'services' && (
        <ServicesScreen services={services} onBookService={handleBookService} />
      )}
      {activeTab === 'schedule' && <ScheduleScreen appointments={appointments} />}
      {activeTab === 'profile' && <ProfileScreen customer={customer} />}

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
