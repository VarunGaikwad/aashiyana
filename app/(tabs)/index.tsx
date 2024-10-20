import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SignedIn, SignedOut, useOAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" }),
    router = useRouter(),
    { user } = useUser(),
    onLoginPress = async () => {
      try {
        const { createdSessionId, setActive } = await startOAuthFlow();
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.navigate("/(tabs)/");
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    };
  return (
    <>
      <SignedIn>
        <Text>{user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonBody} onPress={onLoginPress}>
            <Ionicons name="logo-google" size={24} />
            <Text>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </SignedOut>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "lightgray",
    backgroundColor: "lightgray",
  },
});
