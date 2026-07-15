import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appointment, Customer } from '../data/mockData';
import { colors } from '../constants/theme';

type Props = {
  customer: Customer;
  appointments: Appointment[];
  rewardAvailable: boolean;
};

export default function ProfileScreen({ customer, appointments, rewardAvailable }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.avatarCircle}>
        <Text style={styles.avatarInitials}>
          {customer.name
            .split(' ')
            .map((part) => part[0])
            .join('')}
        </Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Name" value={customer.name} />
        <InfoRow label="Address" value={customer.address} />
        <InfoRow label="Phone" value={customer.phone} />
        <InfoRow label="Email" value={customer.email} />
        <InfoRow label="Plan" value={customer.plan} />
      </View>

      <View style={styles.card}>
        <InfoRow label="Maintenances Booked" value={String(appointments.length)} />
        <InfoRow label="Free Maintenance" value={rewardAvailable ? 'Available 🎉' : 'Not yet earned'} />
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    alignSelf: 'flex-start',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  infoRow: {
    gap: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
});
