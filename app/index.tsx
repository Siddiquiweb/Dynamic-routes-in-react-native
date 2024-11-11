// app/index.tsx
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'; // Importing icons

interface Item {
  name: string;
  id: number;
}

const Index = () => {
  const [users, setUsers] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setUsers(json);
      } catch (err) {
        setError(err.message  );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User  List</Text>
      {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {users.map((item: Item) => (
        <TouchableOpacity key={item.id} style={styles.itemContainer} activeOpacity={0.7}>
          <View style={styles.userInfo}>
            <MaterialIcons name="person" size={24} color="#007BFF" />
            <Text style={styles.userName}>{item.name}</Text>
          </View>
          <Link href={`/user/${item.id}`} style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </Link>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    margin: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
    flexDirection: "column", // Align items vertically
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Space between name and button
  },
  title: {
    
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#007BFF',
    borderBottomWidth: 2,
    borderBottomColor: '#FF0000',
 
    marginVertical: 10,
    fontSize: 36,
    // 
    fontWeight: "bold",
    backgroundColor:"#0039",
    borderStyle: 'solid',
    borderRadius: 10,
    
    color: "#ffffff", 
    textAlign: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4a4a4a",
    marginLeft: 10, // Space between icon and name
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#FF0000",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Index;