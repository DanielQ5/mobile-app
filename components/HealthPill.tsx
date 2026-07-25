import { StyleSheet, Text, View } from 'react-native';
import { LawnHealthStatus } from '../data/mockData';
import { lawnHealthDisplay } from '../constants/theme';

type Props = {
  status: LawnHealthStatus;
};

export default function HealthPill({ status }: Props) {
  const display = lawnHealthDisplay[status];
  return (
    <View style={[styles.pill, { backgroundColor: display.bg }]}>
      <Text style={[styles.pillText, { color: display.text }]}>{display.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
