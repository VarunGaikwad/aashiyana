import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  SignedIn,
  SignedOut,
  useAuth,
  useOAuth,
  useUser,
} from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/styles/default";

export default function ProfileScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" }),
    { signOut } = useAuth(),
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
        <View style={styles.signInContainer}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
            <Text>{[user?.firstName].join(" ")}</Text>
            <View>
              <Text>{user?.emailAddresses[0].emailAddress}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.signOutButton}
              onPress={signOut as any}
            >
              <Ionicons name="log-out" size={24} />
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SignedIn>
      <SignedOut>
        <View style={styles.signOutContainer}>
          <TouchableOpacity style={styles.buttonBody} onPress={onLoginPress}>
            <Ionicons name="logo-google" size={24} />
            <Text>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </SignedOut>
    </>
  );
}
