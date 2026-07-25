import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { careTipFallback, careTips } from '../data/mockData';
import { colors } from '../constants/theme';

type ChatMessage = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
};

const GREETING = "Hi! Tell me what's going on with your lawn and I'll try to help.";

function initialMessages(): ChatMessage[] {
  return [{ id: 'greeting', sender: 'assistant', text: GREETING }];
}

function matchCareTip(message: string): string {
  const lower = message.toLowerCase();
  const tip = careTips.find((t) => t.keywords.some((keyword) => lower.includes(keyword)));
  return tip ? tip.response : careTipFallback;
}

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CareChatModal({ visible, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  function handleClose() {
    setMessages(initialMessages());
    setDraft('');
    onClose();
  }

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { id: `u${Date.now()}`, sender: 'user', text: trimmed };
    const assistantMessage: ChatMessage = {
      id: `a${Date.now()}`,
      sender: 'assistant',
      text: matchCareTip(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setDraft('');
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat with us</Text>
          <Pressable onPress={handleClose} hitSlop={8}>
            <Text style={styles.closeText}>Done</Text>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.bubble, message.sender === 'user' ? styles.bubbleUser : styles.bubbleAssistant]}
            >
              <Text style={message.sender === 'user' ? styles.bubbleTextUser : styles.bubbleTextAssistant}>
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            placeholder="Describe your lawn..."
            placeholderTextColor={colors.textMuted}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  closeText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  messages: {
    padding: 16,
    gap: 10,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryDark,
  },
  bubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
  },
  bubbleTextUser: {
    color: colors.white,
    fontSize: 14,
  },
  bubbleTextAssistant: {
    color: colors.text,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primaryDark,
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
