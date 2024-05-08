import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

import { tokenCache } from "@/lib/clerk";
import { CLERK_PUBLISHABLE_KEY } from "@/lib/constants";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY as string}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ClerkProvider>
  );
}
