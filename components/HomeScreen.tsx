import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appointment, Customer } from '../data/mockData';

type Props = {
  customer: Customer;
  appointments: Appointment[];
  onRequestService: () => void;
};

export default function HomeScreen({ customer, appointments, onRequestService }: Props) {
  const nextAppointment = appointments.find((a) => a.status === 'upcoming');

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hi {customer.name.split(' ')[0]} 👋</Text>
      <Text style={styles.subGreeting}>Here's what's happening with your lawn.</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Next Service</Text>
        {nextAppointment ? (
          <>
            <Text style={styles.cardTitle}>{nextAppointment.serviceName}</Text>
            <Text style={styles.cardSubtitle}>{nextAppointment.date}</Text>
            <Text style={styles.cardSubtitle}>{customer.address}</Text>
          </>
        ) : (
          <Text style={styles.cardTitle}>No upcoming service</Text>
        )}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>92</Text>
          <Text style={styles.statLabel}>Lawn Health</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Days to Mow</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{customer.plan.split(' ')[0]}</Text>
          <Text style={styles.statLabel}>Plan</Text>
        </View>
      </View>

      <Pressable style={styles.ctaButton} onPress={onRequestService}>
        <Text style={styles.ctaButtonText}>Request a Service</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B4332',
  },
  subGreeting: {
    fontSize: 14,
    color: '#5C6B5D',
    marginTop: -8,
  },
  card: {
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  cardLabel: {
    color: '#C8E6C9',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#E8F5E9',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F1F8F2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#5C6B5D',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#1B4332',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
