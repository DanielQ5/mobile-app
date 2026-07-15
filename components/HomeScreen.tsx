import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appointment, Customer } from '../data/mockData';
import { colors, lawnHealthDisplay } from '../constants/theme';

type Props = {
  customer: Customer;
  appointments: Appointment[];
  rewardAvailable: boolean;
  onRequestService: () => void;
};

export default function HomeScreen({ customer, appointments, rewardAvailable, onRequestService }: Props) {
  const nextAppointment = appointments.find((a) => a.status === 'upcoming');
  const lastRatedVisit = appointments.find((a) => a.status === 'completed' && a.lawnHealth);
  const lawnHealth = lastRatedVisit?.lawnHealth ? lawnHealthDisplay[lastRatedVisit.lawnHealth] : null;

  const filledSlots = rewardAvailable ? 5 : appointments.length % 5;
  const remaining = 5 - filledSlots;

  let challengeText: string;
  if (rewardAvailable) {
    challengeText = '🎉 Free maintenance unlocked! Redeem it on your next booking.';
  } else if (remaining === 1) {
    challengeText = 'Just 1 more maintenance before a free one — almost there!';
  } else {
    challengeText = `${remaining} more maintenances until a free one!`;
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hi {customer.name.split(' ')[0]} 👋</Text>
      <Text style={styles.subGreeting}>Here's what's happening with your lawn.</Text>

      {!nextAppointment && (
        <View style={styles.retentionBanner}>
          <Text style={styles.retentionText}>
            Nothing scheduled — your garden could use some love 🌱
          </Text>
        </View>
      )}

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

      <View style={styles.loyaltyCard}>
        <Text style={styles.loyaltyLabel}>Reward Progress</Text>
        <View style={styles.grassRow}>
          {Array.from({ length: 5 }, (_, i) => i < filledSlots).map((filled, i) => (
            <View key={i} style={[styles.grassSlot, filled && styles.grassSlotFilled]}>
              <Text style={[styles.grassEmoji, !filled && styles.grassEmojiDim]}>🌿</Text>
            </View>
          ))}
        </View>
        <Text style={styles.loyaltyText}>{challengeText}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          {lawnHealth ? (
            <View style={[styles.healthPill, { backgroundColor: lawnHealth.bg }]}>
              <Text style={[styles.healthPillText, { color: lawnHealth.text }]}>{lawnHealth.label}</Text>
            </View>
          ) : (
            <Text style={styles.statValue}>—</Text>
          )}
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
    color: colors.text,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: -8,
  },
  retentionBanner: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
  },
  retentionText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 13,
  },
  card: {
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  cardLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: colors.white,
    fontSize: 14,
  },
  loyaltyCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  loyaltyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  grassRow: {
    flexDirection: 'row',
    gap: 10,
  },
  grassSlot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grassSlotFilled: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  grassEmoji: {
    fontSize: 20,
  },
  grassEmojiDim: {
    opacity: 0.25,
  },
  loyaltyText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  healthPill: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  healthPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
