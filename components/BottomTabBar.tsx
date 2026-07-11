import { Pressable, StyleSheet, Text, View } from 'react-native';

export type TabKey = 'home' | 'services' | 'schedule' | 'profile';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'services', label: 'Services', icon: '🌱' },
  { key: 'schedule', label: 'Schedule', icon: '📅' },
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
    borderTopColor: '#DCE7DD',
    backgroundColor: '#FFFFFF',
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
    color: '#8A9A8C',
  },
  labelActive: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});
