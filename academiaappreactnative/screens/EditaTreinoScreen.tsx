import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList, Aluno, Instrutor } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'EditaTreino'>;

const EditaTreinoScreen = ({ route, navigation }: Props) => {
  const { treino } = route.params;

  const [nome, setNome] = useState(treino.nome);
  const [descricao, setDescricao] = useState(treino.descricao);
  const [duracaoMinutos, setDuracaoMinutos] = useState(treino.duracao_minutos.toString());
  const [alunoId, setAlunoId] = useState<number>(treino.aluno);
  const [instrutorId, setInstrutorId] = useState<number>(treino.instrutor);

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [instrutores, setInstrutores] = useState<Instrutor[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);
  const [saving, setSaving] = useState(false);

  const carregarDadosAuxiliares = async () => {
    try {
      const [resAlunos, resInstrutores] = await Promise.all([
        fetch('http://localhost:8000/alunos/'),
        fetch('http://localhost:8000/instrutores/')
      ]);
      
      const dataAlunos = await resAlunos.json();
      const dataInstrutores = await resInstrutores.json();
      
      setAlunos(dataAlunos);
      setInstrutores(dataInstrutores);
    } catch (error) {
      console.log("Erro ao carregar dados auxiliares", error);
    } finally {
      setLoadingDados(false);
    }
  };

  useEffect(() => {
    carregarDadosAuxiliares();
  }, []);

  useEffect(() => {
    setNome(treino.nome);
    setDescricao(treino.descricao);
    setDuracaoMinutos(treino.duracao_minutos.toString());
    setAlunoId(treino.aluno);
    setInstrutorId(treino.instrutor);
  }, [treino]);

  const handleSave = async () => {
    if (!nome || !duracaoMinutos) {
      alert("Por favor, preencha o nome e a duração do treino.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8000/treinos/${treino.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao,
          duracao_minutos: parseInt(duracaoMinutos, 10) || 0,
          aluno: alunoId,
          instrutor: instrutorId,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar alterações: \n' + JSON.stringify(err));
      } else {
        navigation.navigate('Treinos');
      }
    } catch (error) {
      alert("Erro de comunicação com o servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingDados) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4B7BE5" />
        <Text style={styles.loadingText}>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Editar Treino</Text>

      <Text style={styles.label}>Nome do Treino</Text>
      <TextInput placeholder="Ex: Treino A - Hipertrofia" value={nome} onChangeText={setNome} style={styles.input} />

      <Text style={styles.label}>Descrição / Observações</Text>
      <TextInput placeholder="Ex: Foco em membros superiores" value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 70 }]} multiline />

      <Text style={styles.label}>Duração Estimada (minutos)</Text>
      <TextInput placeholder="Ex: 60" value={duracaoMinutos} onChangeText={setDuracaoMinutos} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Aluno</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={alunoId} onValueChange={(itemValue) => setAlunoId(Number(itemValue))}>
          {alunos.map(a => (
            <Picker.Item key={a.id} label={`${a.nome} ${a.sobrenome}`} value={a.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Instrutor Responsável</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={instrutorId} onValueChange={(itemValue) => setInstrutorId(Number(itemValue))}>
          {instrutores.map(i => (
            <Picker.Item key={i.id} label={`${i.nome} ${i.sobrenome}`} value={i.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar Alterações" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Treinos')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center', color: '#1A1A2E' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  buttonContainer: { marginTop: 16, marginBottom: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 8, color: '#666' }
});

export default EditaTreinoScreen;