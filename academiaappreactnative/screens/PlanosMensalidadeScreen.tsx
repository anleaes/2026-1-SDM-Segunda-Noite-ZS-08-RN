import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList, PlanoMensalidade } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'PlanosMensalidade'>;

const vigenciaMap: Record<number, string> = {
  30: 'Mensal',
  90: 'Trimestral',
  180: 'Semestral',
  365: 'Anual',
};

const PlanosMensalidadeScreen = ({ navigation }: Props) => {
  const [planos, setPlanos] = useState<PlanoMensalidade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlanos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/planosmensalidade/');
      const data = await response.json();
      setPlanos(data);
    } catch (error) {
      console.log("Erro ao carregar planos de mensalidade", error);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPlanos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/planosmensalidade/${id}/`, { method: 'DELETE' });
    setPlanos(prev => prev.filter(p => p.id !== id));
  };

  const renderItem = ({ item }: { item: PlanoMensalidade }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.nome}</Text>
        <View style={[styles.badge, { backgroundColor: item.ativo ? '#26A69A' : '#E54848' }]}>
          <Text style={styles.badgeText}>{item.ativo ? 'ATIVO' : 'INATIVO'}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{item.descricao}</Text>
      
      <Text style={styles.details}>
        Valor: R$ {item.valor} | Vigência: {vigenciaMap[item.duracao_dias] || `${item.duracao_dias} dias`}
      </Text>
      
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditaPlanoMensalidade', { plano: item })}
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
      <Text style={styles.title}>Planos de mensalidade</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={planos}
          keyExtractor={(item) => item?.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CriaPlanoMensalidade')}>
        <Ionicons name="add" size={28} color="#fff"  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#333', alignSelf: 'center' },
  card: { backgroundColor: '#f0f4ff', padding: 16, borderRadius: 10, marginBottom: 12, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: '600', color: '#222', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666', marginTop: 8, fontStyle: 'italic' },
  details: { fontSize: 15, fontWeight: '500', color: '#333', marginTop: 8, marginBottom: 10 },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14, elevation: 4 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  row: { flexDirection: 'row', marginTop: 8 },
});

export default PlanosMensalidadeScreen;