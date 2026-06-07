import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList, Instrutor } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'Instrutores'>;

const especialidadeMap: Record<string, string> = {
  'MUSC': 'Musculação',
  'FUNC': 'Treinamento Funcional',
  'PILA': 'Pilates',
  'CROS': 'Cross Training',
  'DANC': 'Dança / Ritmos',
  'LUTA': 'Artes Marciais',
  'NATA': 'Natação',
  'GERA': 'Ginástica Geral',
};

const InstrutoresScreen = ({ navigation }: Props) => {
  const [instrutores, setInstrutores] = useState<Instrutor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstrutores = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/instrutores/');
    const data = await response.json();
    setInstrutores(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchInstrutores();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/instrutores/${id}/`, { method: 'DELETE' });
    setInstrutores(prev => prev.filter(i => i.id !== id));
  };

  const renderItem = ({ item }: { item: Instrutor }) => {
    const especialidadeFormatada = especialidadeMap[item.especialidade] || item.especialidade;

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.nome} {item.sobrenome}</Text>
        <Text style={styles.description}>CREF: {item.cref} | Especialidade: {especialidadeFormatada}</Text>
        
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditaInstrutor', { instrutor: item })}
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
  };

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Instrutores</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={instrutores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CriaInstrutor')}>
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

export default InstrutoresScreen;