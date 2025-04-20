import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { ThemedText } from '@/components/element/ThemedText';
import { ThemedView } from '@/components/element/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

function NotFoundScreenShadcn() {
  return (
      <>
        <Stack.Screen options={{ title: 'Oops!' }} />
        <View>
          <Text>This screen doesn't exist.</Text>

          <Link href='/'>
            <Text>Go to home screen!</Text>
          </Link>
        </View>
      </>
  );
}