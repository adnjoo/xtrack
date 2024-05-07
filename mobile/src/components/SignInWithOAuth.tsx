import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

/**
 * A component that renders a "Sign in with Google" button using OAuth authentication.
 * @returns {JSX.Element} The rendered component.
 */
const SignInWithOAuth = () => {
    // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignIn = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        if (setActive) {
          setActive({ session: createdSessionId });
        }
      } else {
        // Handle next steps such as MFA using signIn or signUp
      }
    } catch (error) {
      console.error("OAuth error", error);
    }
  }, [startOAuthFlow]);

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
      {/* <Image
        source={require("../../assets/google.jpg")}
        style={styles.icon}
        resizeMode="contain"
      /> */}
      <Text style={styles.buttonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 240,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default SignInWithOAuth;
