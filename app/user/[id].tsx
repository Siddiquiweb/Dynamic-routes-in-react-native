  // app/user/[id].tsx
  import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useLocalSearchParams, Link } from "expo-router";

  const UserDetail = () => {
    const { id } = useLocalSearchParams(); // Get the user ID from the URL parameters
    const [user, setUser] = useState<null | any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((json) => {
          setUser(json);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [id]);

    if (loading) {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }

    if (error) {
      return <Text style={styles.errorText}>Error occurred</Text>;
    }

    return (
      <View style={styles.container}>
        {user && (
          <View style={styles.card}>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.detailText}>Email: {user.email}</Text>
            <Text style={styles.detailText}>Phone: {user.phone}</Text>
            <Text style={styles.detailText}>Website: {user.website}</Text>
            <Text style={styles.detailText}>Address:</Text>
            <Text style={styles.detailText}>
              {user.address.street}, {user.address.suite}, {user.address.city},{" "}
              {user.address.zipcode}
            </Text>
            <Text style={styles.detailText}>Company: {user.company.name}</Text>
            <Text style={styles.detailText}>
              Catchphrase: {user.company.catchPhrase}
            </Text>

            {/* Back Button */}
            <Link href="/" style={styles.backButton}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Link>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#f0f0f0", // Light background for better contrast
      justifyContent: "center",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#ffffff", // Card background color
      padding: 20,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      justifyContent: "center",
      textAlign: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 12,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 8,
      color: "#333",
      fontWeight: "bold",
    },
    loadingText: {
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },
    errorText: {
      fontSize: 18,
      color: "#FF0000",
      textAlign: "center",
      marginTop: 20,
    },
    backButton: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: "#007BFF",
      borderRadius: 8,
    },
    backButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  });

  export default UserDetail;
