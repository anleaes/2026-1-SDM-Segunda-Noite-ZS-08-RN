import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { DrawerParamList } from '../navigation/types';

// Ajuste a interface conforme os campos que você tem no seu banco de dados
interface PlanoAlimentar {
  id: number;
  titulo: string;
  descricao: string;
  calorias: number;
}

type Props = DrawerScreenProps<DrawerParamList, 'PlanosAlimentares'>;

const PlanosAlimentaresScreen = ({ navigation }: Props) => {
  const [planos, setPlanos] = useState<PlanoAlimentar[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlanos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/planosalimentares/');
      const data = await response.json();
      setPlanos(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os planos alimentares.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlanos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir este plano?", [
      { text: "Cancelar" },
      { 
        text: "Excluir", 
        style: "destructive",
        onPress: async () => {
          await fetch(`http://localhost:8000/planosalimentares/${id}/`, {
            method: 'DELETE',
          });
          setPlanos(prev => prev.filter(p => p.id !== id));
        } 
      }
    ]);
  };

  const renderItem = ({ item }: { item: PlanoAlimentar }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.titulo}</Text>
      <Text style={styles.description}>Calorias: {item.calorias} kcal</Text>
      <Text style={styles.description}>{item.descricao}</Text>
      
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditaPlanosAlimentares', { plano: item })}
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
      <Text style={styles.title}>Planos Alimentares</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={planos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CriaPlanosAlimentares')}
      >
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
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14, elevation: 4 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  row: { flexDirection: 'row', marginTop: 8 },
});

export default PlanosAlimentaresScreen;