import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

type Props = {
  value?: number;
  onRate?: (rating: number) => void;
  size?: number;
};

export default function StarRating({ value = 0, onRate, size = 18 }: Props) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={onRate ? () => onRate(star) : undefined} hitSlop={4}>
          <Text style={[styles.star, { fontSize: size, color: star <= value ? colors.starFilled : colors.starEmpty }]}>
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontWeight: '700',
  },
});
