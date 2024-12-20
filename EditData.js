import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const EditData = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  // Fetch data from API
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  // Handle form submission for add/edit
  const submit = () => {
    const data = { first_name, last_name, kelas, gender, email };
    const method = selectedUser ? 'PATCH' : 'POST';
    const url = selectedUser ? `${jsonUrl}/${selectedUser.id}` : jsonUrl;

    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(selectedUser ? 'Order Updated!' : 'Order Successfully added!');
        resetForm();
        refreshPage();
      })
      .catch((error) => console.error(error));
  };

  // Handle item selection for editing
  const selectItem = (item) => {
    setSelectedUser(item);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setKelas(item.kelas);
    setGender(item.gender);
    setEmail(item.email);
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedUser(null);
    setFirstName('');
    setLastName('');
    setKelas('');
    setGender('');
    setEmail('');
  };

  // Delete user data
  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        alert('Order Deleted');
        refreshPage();
      })
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          {selectedUser ? 'Edit Orders' : 'Edit Orders'}
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Sender"
            value={first_name}
            onChangeText={(value) => setFirstName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Receiver"
            value={last_name}
            onChangeText={(value) => setLastName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Item"
            value={kelas}
            onChangeText={(value) => setKelas(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Receiver Contact"
            value={gender}
            onChangeText={(value) => setGender(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Button title={selectedUser ? 'Update Data' : 'Update Data'} onPress={submit} />
          {selectedUser && <Button title="Batal" color="red" onPress={resetForm} />}
        </View>

        <FlatList
          style={{ marginTop: 20 }}
          data={dataUser}
          onRefresh={refreshPage}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <FontAwesomeIcon icon={faGraduationCap} size={50} />
              </View>
              <View>
                <Text style={styles.cardtitle}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text>{item.kelas}</Text>
                <Text>{item.gender}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <FontAwesomeIcon icon={faPenToSquare} size={20} style={{ marginHorizontal: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Delete data', 'This action can not be undone, are you sure?', [
                      { text: 'No', onPress: () => {} },
                      { text: 'Yes', onPress: () => deleteData(item.id) },
                    ])
                  }>
                  <FontAwesomeIcon icon={faTrash} size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    marginRight: 15,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
});

export default EditData;
