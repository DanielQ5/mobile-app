import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appointment, GardenZoneHealth } from '../data/mockData';
import { colors, lawnHealthDisplay } from '../constants/theme';

type Props = {
  appointments: Appointment[];
  gardenZones: GardenZoneHealth[];
};

export default function ProgressScreen({ appointments, gardenZones }: Props) {
  const healthHistory = appointments.filter((a) => a.status === 'completed' && a.lawnHealth);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Progress</Text>

      <Text style={styles.sectionTitle}>Garden Zones</Text>
      <Text style={styles.sectionHint}>Noted by your provider — helps them see which areas need attention.</Text>
      <View style={styles.zoneGrid}>
        {gardenZones.map((zone) => {
          const status = lawnHealthDisplay[zone.status];
          return (
            <View key={zone.zone} style={[styles.zoneTile, { backgroundColor: status.bg }]}>
              <Text style={[styles.zoneLabel, { color: status.text }]}>{zone.label}</Text>
              <Text style={[styles.zoneStatus, { color: status.text }]}>{status.label}</Text>
              <Text style={[styles.zoneRecommendation, { color: status.text }]}>{zone.recommendation}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>Lawn Health History</Text>
      <View style={styles.historyCard}>
        <Text style={styles.historyHint}>Noted by your provider after each visit.</Text>
        {healthHistory.length === 0 ? (
          <Text style={styles.emptyText}>No visits rated yet.</Text>
        ) : (
          healthHistory.map((appt) => {
            const status = lawnHealthDisplay[appt.lawnHealth!];
            return (
              <View key={appt.id} style={styles.historyRow}>
                <View>
                  <Text style={styles.historyDate}>{appt.date}</Text>
                  <Text style={styles.historyService}>{appt.serviceName}</Text>
                </View>
                <View style={[styles.healthPill, { backgroundColor: status.bg }]}>
                  <Text style={[styles.healthPillText, { color: status.text }]}>{status.label}</Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
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
    color: colors.text,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginTop: 12,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: -4,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  zoneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  zoneTile: {
    width: '47%',
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  zoneLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  zoneStatus: {
    fontSize: 12,
    fontWeight: '700',
  },
  zoneRecommendation: {
    fontSize: 11,
    marginTop: 2,
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  historyHint: {
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  historyDate: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  historyService: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  healthPill: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  healthPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
