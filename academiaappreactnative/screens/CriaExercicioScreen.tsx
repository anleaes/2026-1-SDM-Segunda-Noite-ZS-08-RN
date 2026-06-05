import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'CriaExercicio'>;

const CriaExercicioScreen = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [instrucoes, setInstrucoes] = useState('');
  const [dificuldade, setDificuldade] = useState('F');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome(''); setDescricao(''); setInstrucoes(''); setDificuldade('F');
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/exercicios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome: nome,
        descricao: descricao,
        instrucoes: instrucoes,
        dificuldade: dificuldade
      }),
    });
    navigation.navigate('Exercicios');  
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Novo Exercício</Text>
      
      <Text style={styles.label}>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 80 }]} multiline />

      <Text style={styles.label}>Instruções de Execução</Text>
      <TextInput value={instrucoes} onChangeText={setInstrucoes} style={[styles.input, { height: 80 }]} multiline />

      <Text style={styles.label}>Dificuldade: (F)ácil, (M)édio, (D)ifícil</Text>
      <TextInput value={dificuldade} onChangeText={setDificuldade} style={styles.input} maxLength={1} autoCapitalize="characters" />

      <View style={styles.buttonContainer}>
        {saving
          ? <ActivityIndicator size="large" color="#4B7BE5" />
          : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
        }
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Exercicios')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  buttonContainer: { marginTop: 20, marginBottom: 10 }
});

export default CriaExercicioScreen;