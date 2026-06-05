import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'EditaExercicio'>;

const EditaExercicioScreen = ({ route, navigation }: Props) => {

  const { exercicio } = route.params;
  

  const [nome, setNome] = useState(exercicio.nome);
  const [descricao, setDescricao] = useState(exercicio.descricao || '');
  const [instrucoes, setInstrucoes] = useState(exercicio.instrucoes || '');
  const [dificuldade, setDificuldade] = useState(exercicio.dificuldade || 'F');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(exercicio.nome);
    setDescricao(exercicio.descricao || '');
    setInstrucoes(exercicio.instrucoes || '');
    setDificuldade(exercicio.dificuldade || 'F');
  }, [exercicio]);  

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `http://localhost:8000/exercicios/${exercicio.id}/`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nome: nome,
            descricao: descricao,
            instrucoes: instrucoes,
            dificuldade: dificuldade
          }),
        }
      );
      
      if (!res.ok) {
        const errorData = await res.json();
        alert('Erro ao atualizar: ' + JSON.stringify(errorData));
      } else {
        navigation.navigate('Exercicios');        
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
    setSaving(false);  
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Editar Exercício</Text>
      
      <Text style={styles.label}>Nome</Text>
      <TextInput 
        value={nome} 
        onChangeText={setNome} 
        style={styles.input} 
      />
      
      <Text style={styles.label}>Descrição</Text>
      <TextInput 
        value={descricao} 
        onChangeText={setDescricao} 
        style={[styles.input, { height: 80 }]} 
        multiline 
      />

      <Text style={styles.label}>Instruções de Execução</Text>
      <TextInput 
        value={instrucoes} 
        onChangeText={setInstrucoes} 
        style={[styles.input, { height: 80 }]} 
        multiline 
      />

      <Text style={styles.label}>Dificuldade (F, M, D)</Text>
      <TextInput 
        value={dificuldade} 
        onChangeText={setDificuldade} 
        style={styles.input} 
        maxLength={1} 
        autoCapitalize="characters" 
      />

      <View style={styles.buttonContainer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar Alterações" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Exercicios')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  buttonContainer: { marginTop: 20, marginBottom: 10 }
});

export default EditaExercicioScreen;