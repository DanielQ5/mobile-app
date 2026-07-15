import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export type TabKey = 'home' | 'services' | 'schedule' | 'progress' | 'profile';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'services', label: 'Services', icon: '🌱' },
  { key: 'schedule', label: 'Schedule', icon: '📅' },
  { key: 'progress', label: 'Progress', icon: '📈' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

type Props = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
};

export default function BottomTabBar({ activeTab, onChangeTab }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onChangeTab(tab.key)}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
});
