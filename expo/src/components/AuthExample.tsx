import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";

export default function AuthExample() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <>
      <Text>
        {/* Hello, {userId} your current active session is {sessionId} */}
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Hello, {user?.firstName} welcome to Clerk
      </Text>
    </>
  );
}
