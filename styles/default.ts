import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    padding: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutContainer: {
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
  signOutButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "lightgray",
    backgroundColor: "lightgray",
  },
  profileContainer: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
