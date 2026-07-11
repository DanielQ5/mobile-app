import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Service } from '../data/mockData';

type Props = {
  services: Service[];
  onBookService: (service: Service) => void;
};

export default function ServicesScreen({ services, onBookService }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Our Services</Text>
      {services.map((service) => (
        <View key={service.id} style={styles.card}>
          <Text style={styles.icon}>{service.icon}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
            <Text style={styles.cardPrice}>{service.price}</Text>
          </View>
          <Pressable style={styles.bookButton} onPress={() => onBookService(service)}>
            <Text style={styles.bookButtonText}>Book</Text>
          </Pressable>
        </View>
      ))}
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
    color: '#1B4332',
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8F2',
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
    color: '#1B4332',
  },
  cardDescription: {
    fontSize: 13,
    color: '#5C6B5D',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
