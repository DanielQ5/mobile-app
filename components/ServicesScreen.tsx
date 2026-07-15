import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Service } from '../data/mockData';
import { colors } from '../constants/theme';

type Props = {
  services: Service[];
  rewardAvailable: boolean;
  onBookService: (service: Service, notes: string, useReward: boolean) => void;
};

export default function ServicesScreen({ services, rewardAvailable, onBookService }: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [notes, setNotes] = useState('');
  const [useReward, setUseReward] = useState(true);

  function openBooking(service: Service) {
    setSelectedService(service);
    setNotes('');
    setUseReward(true);
  }

  function confirmBooking() {
    if (!selectedService) return;
    onBookService(selectedService, notes, useReward);
    setSelectedService(null);
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Our Services</Text>
      {rewardAvailable && (
        <View style={styles.rewardBanner}>
          <Text style={styles.rewardBannerText}>🎉 A free maintenance is ready to redeem on your next booking!</Text>
        </View>
      )}
      {services.map((service) => (
        <View key={service.id} style={styles.card}>
          <Text style={styles.icon}>{service.icon}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
            <Text style={styles.cardPrice}>{service.price}</Text>
          </View>
          <Pressable style={styles.bookButton} onPress={() => openBooking(service)}>
            <Text style={styles.bookButtonText}>Book</Text>
          </Pressable>
        </View>
      ))}

      <Modal visible={selectedService !== null} transparent animationType="slide" onRequestClose={() => setSelectedService(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Book {selectedService?.name}</Text>
            <Text style={styles.modalLabel}>Notes for your provider (optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="e.g. bring large gardening shears, soil is loose"
              placeholderTextColor={colors.textMuted}
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            {rewardAvailable && (
              <View style={styles.rewardToggleRow}>
                <Text style={styles.rewardToggleLabel}>Use my free maintenance 🎉</Text>
                <Switch value={useReward} onValueChange={setUseReward} />
              </View>
            )}

            <View style={styles.modalActions}>
              <Pressable style={styles.cancelButton} onPress={() => setSelectedService(null)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmButton} onPress={confirmBooking}>
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  rewardBanner: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 12,
  },
  rewardBannerText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 13,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },
  icon: {
    fontSize: 28,
  },
  cardBody: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.textMuted,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  bookButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  modalLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    minHeight: 70,
    textAlignVertical: 'top',
    color: colors.text,
  },
  rewardToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 10,
    marginTop: 4,
  },
  rewardToggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
});
