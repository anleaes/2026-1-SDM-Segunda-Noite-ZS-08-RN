import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList, Treino } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'Treinos'>;

const TreinosScreen = ({ navigation }: Props) => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 
  
  const fetchTreinos = async () => {
    try {
      const response = await fetch('http://localhost:8000/treinos/');
      const data = await response.json();
      setTreinos(data);
    } catch (error) {
      console.log("Erro ao buscar treinos:", error);
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    await fetchTreinos();
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTreinos();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [])
  );

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/treinos/${id}/`, { method: 'DELETE' });
      setTreinos(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.log("Erro ao deletar treino:", error);
    }
  };

  const renderItem = ({ item }: { item: Treino }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.description}>
        Duração: {item.duracao_minutos} min | Aluno ID: {item.aluno}
      </Text>
      
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditaTreino', { treino: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Treinos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={treinos}
          keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B7BE5']} />
          }
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CriaTreino')}>
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
  row: { flexDirection: 'row', marginTop: 8 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14, elevation: 4 },
});

export default TreinosScreen;