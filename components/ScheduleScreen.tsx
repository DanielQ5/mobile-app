import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appointment } from '../data/mockData';

type Props = {
  appointments: Appointment[];
};

export default function ScheduleScreen({ appointments }: Props) {
  const upcoming = appointments.filter((a) => a.status === 'upcoming');
  const completed = appointments.filter((a) => a.status === 'completed');

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Schedule</Text>

      <Text style={styles.sectionTitle}>Upcoming</Text>
      {upcoming.length === 0 && <Text style={styles.emptyText}>Nothing scheduled.</Text>}
      {upcoming.map((appt) => (
        <AppointmentRow key={appt.id} appointment={appt} />
      ))}

      <Text style={styles.sectionTitle}>Completed</Text>
      {completed.length === 0 && <Text style={styles.emptyText}>No history yet.</Text>}
      {completed.map((appt) => (
        <AppointmentRow key={appt.id} appointment={appt} />
      ))}
    </ScrollView>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const isUpcoming = appointment.status === 'upcoming';
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.rowTitle}>{appointment.serviceName}</Text>
        <Text style={styles.rowDate}>{appointment.date}</Text>
      </View>
      <View style={[styles.badge, isUpcoming ? styles.badgeUpcoming : styles.badgeCompleted]}>
        <Text style={[styles.badgeText, isUpcoming ? styles.badgeTextUpcoming : styles.badgeTextCompleted]}>
          {isUpcoming ? 'Upcoming' : 'Completed'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B4332',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C6B5D',
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#8A9A8C',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F8F2',
    borderRadius: 12,
    padding: 14,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B4332',
  },
  rowDate: {
    fontSize: 13,
    color: '#5C6B5D',
    marginTop: 2,
  },
  badge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeUpcoming: {
    backgroundColor: '#DCEDC8',
  },
  badgeCompleted: {
    backgroundColor: '#E0E0E0',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextUpcoming: {
    color: '#2E7D32',
  },
  badgeTextCompleted: {
    color: '#616161',
  },
});
