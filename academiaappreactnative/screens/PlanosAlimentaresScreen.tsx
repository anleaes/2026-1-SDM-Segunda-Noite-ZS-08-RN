import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// 👇 Aqui está o caminho ajustado apontando para a pasta navigation!
import { PlanoAlimentar } from '../navigation/types'; 

export default function PlanosAlimentaresScreen() {
  const [planos, setPlanos] = useState<PlanoAlimentar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🚨 Se o IP do seu computador mudou, atualize o número abaixo:
    fetch('http://192.168.1.15:8000/api/planosalimentares/')
      .then((response) => response.json())
      .then((data) => {
        setPlanos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar planos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando planos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={planos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.texto}>🎯 Objetivo: {item.objetivo}</Text>
            <Text style={styles.texto}>🔥 Calorias Diárias: {item.calorias_diarias} kcal</Text>
            <Text style={styles.texto}>📅 Início: {item.data_inicio}</Text>
            {item.descricao && <Text style={styles.textoDescricao}>{item.descricao}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 8 },
  texto: { fontSize: 16, color: '#34495e', marginBottom: 4 },
  textoDescricao: { fontSize: 14, color: '#7f8c8d', marginTop: 8, fontStyle: 'italic' }
});