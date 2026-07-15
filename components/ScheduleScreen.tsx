import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Appointment } from '../data/mockData';
import { colors } from '../constants/theme';
import StarRating from './StarRating';

type Props = {
  appointments: Appointment[];
  onRateAppointment: (id: string, rating: number, comment: string) => void;
};

export default function ScheduleScreen({ appointments, onRateAppointment }: Props) {
  const upcoming = appointments.filter((a) => a.status === 'upcoming');
  const completed = appointments.filter((a) => a.status === 'completed');

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Schedule</Text>

      <Text style={styles.sectionTitle}>Upcoming</Text>
      {upcoming.length === 0 && <Text style={styles.emptyText}>Nothing scheduled.</Text>}
      {upcoming.map((appt) => (
        <AppointmentRow key={appt.id} appointment={appt} onRateAppointment={onRateAppointment} />
      ))}

      <Text style={styles.sectionTitle}>Completed</Text>
      {completed.length === 0 && <Text style={styles.emptyText}>No history yet.</Text>}
      {completed.map((appt) => (
        <AppointmentRow key={appt.id} appointment={appt} onRateAppointment={onRateAppointment} />
      ))}
    </ScrollView>
  );
}

function AppointmentRow({
  appointment,
  onRateAppointment,
}: {
  appointment: Appointment;
  onRateAppointment: (id: string, rating: number, comment: string) => void;
}) {
  const isUpcoming = appointment.status === 'upcoming';
  const [pendingRating, setPendingRating] = useState(appointment.rating ?? 0);
  const [pendingComment, setPendingComment] = useState(appointment.comment ?? '');

  const hasChanges =
    pendingRating !== (appointment.rating ?? 0) || pendingComment !== (appointment.comment ?? '');

  return (
    <View style={styles.row}>
      <View style={styles.rowHeader}>
        <View>
          <Text style={styles.rowTitle}>
            {appointment.serviceName}
            {appointment.isFree ? ' 🎉' : ''}
          </Text>
          <Text style={styles.rowDate}>{appointment.date}</Text>
        </View>
        <View style={[styles.badge, isUpcoming ? styles.badgeUpcoming : styles.badgeCompleted]}>
          <Text style={[styles.badgeText, isUpcoming ? styles.badgeTextUpcoming : styles.badgeTextCompleted]}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </Text>
        </View>
      </View>

      {appointment.notes && (
        <Text style={styles.notes}>📝 {appointment.notes}</Text>
      )}

      {!isUpcoming && (
        <View style={styles.ratingBlock}>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Your rating</Text>
            <StarRating value={pendingRating} onRate={setPendingRating} />
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Leave a comment for this visit (optional)"
            placeholderTextColor={colors.textMuted}
            value={pendingComment}
            onChangeText={setPendingComment}
            multiline
          />
          {hasChanges && pendingRating > 0 && (
            <Pressable
              style={styles.saveButton}
              onPress={() => onRateAppointment(appointment.id, pendingRating, pendingComment)}
            >
              <Text style={styles.saveButtonText}>Save Rating</Text>
            </Pressable>
          )}
        </View>
      )}
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
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  row: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  rowDate: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  notes: {
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
  },
  ratingBlock: {
    gap: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  commentInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    fontSize: 13,
    color: colors.text,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  saveButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  saveButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 12,
  },
  badge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeUpcoming: {
    backgroundColor: colors.badgeUpcomingBg,
  },
  badgeCompleted: {
    backgroundColor: colors.badgeCompletedBg,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextUpcoming: {
    color: colors.badgeUpcomingText,
  },
  badgeTextCompleted: {
    color: colors.badgeCompletedText,
  },
});
