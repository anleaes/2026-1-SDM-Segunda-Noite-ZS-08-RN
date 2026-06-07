import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList, Anamnese } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'Anamneses'>;

const AnamnesesScreen = ({ navigation }: Props) => {
  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnamneses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/anamneses/');
      const data = await response.json();
      setAnamneses(data);
    } catch (error) {
      console.log("Erro ao carregar anamneses", error);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAnamneses();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/anamneses/${id}/`, { method: 'DELETE' });
    setAnamneses(prev => prev.filter(a => a.id !== id));
  };

  const renderItem = ({ item }: { item: Anamnese }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Ficha do Aluno (ID: {item.aluno})</Text>
      <Text style={styles.description}>Última atualização: {item.ultima_atualizacao}</Text>
      
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditaAnamnese', { anamnese: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Anamneses</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={anamneses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CriaAnamnese')}>
        <Ionicons name="add" size={28} color="#fff"  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333', alignSelf: 'center' },
  card: { backgroundColor: '#f0f4ff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  description: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 10 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14, elevation: 4 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  row: { flexDirection: 'row', marginTop: 8 },
});

export default AnamnesesScreen;