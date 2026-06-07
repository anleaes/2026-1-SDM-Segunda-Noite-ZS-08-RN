import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'CriaAnamnese'>;

const CriaAnamneseScreen = ({ navigation }: Props) => {
  const [listaAlunos, setListaAlunos] = useState<{id: number, nome: string, sobrenome: string}[]>([]);

  const [alunoId, setAlunoId] = useState('');
  const [pressaoArterial, setPressaoArterial] = useState('');
  const [alergias, setAlergias] = useState('');
  const [restricoesFisicas, setRestricoesFisicas] = useState('');
  const [medicamentosEmUso, setMedicamentosEmUso] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [problemasCardiacos, setProblemasCardiacos] = useState(false);
  const [cirurgiasRecentes, setCirurgiasRecentes] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [fumante, setFumante] = useState(false);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/alunos/')
      .then(res => res.json())
      .then(data => setListaAlunos(data))
      .catch(() => console.log("Erro ao carregar alunos"));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setAlunoId(''); setPressaoArterial(''); setAlergias('');
      setRestricoesFisicas(''); setMedicamentosEmUso(''); setObservacoes('');
      setProblemasCardiacos(false); setCirurgiasRecentes(false);
      setDiabetes(false); setFumante(false);
    }, [])
  );

  const handleSave = async () => {
    if (!alunoId) {
      alert("Por favor, selecione um aluno.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('http://localhost:8000/anamneses/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          aluno: alunoId,
          pressao_arterial: pressaoArterial,
          alergias,
          restricoes_fisicas: restricoesFisicas,
          medicamentos_em_uso: medicamentosEmUso,
          observacoes,
          problemas_cardiacos: problemasCardiacos,
          cirurgias_recentes: cirurgiasRecentes,
          diabetes,
          fumante
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar (O aluno já possui ficha.): \n' + JSON.stringify(err));
      } else {
        navigation.navigate('Anamneses');  
      }
    } catch (error) {
      alert("Erro de comunicação.");
    }
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Nova Anamnese</Text>
      
      <Text style={styles.label}>Aluno</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={alunoId} onValueChange={setAlunoId}>
          <Picker.Item label="Selecione o Aluno..." value="" color="#999" />
          {listaAlunos.map(a => <Picker.Item key={a.id} label={`${a.nome} ${a.sobrenome}`} value={a.id.toString()} />)}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>Condições Clínicas</Text>
      
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Problemas Cardíacos?</Text>
        <Switch value={problemasCardiacos} onValueChange={setProblemasCardiacos} trackColor={{ true: '#4B7BE5' }} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Cirurgias Recentes?</Text>
        <Switch value={cirurgiasRecentes} onValueChange={setCirurgiasRecentes} trackColor={{ true: '#4B7BE5' }} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Diabetes?</Text>
        <Switch value={diabetes} onValueChange={setDiabetes} trackColor={{ true: '#4B7BE5' }} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Fumante?</Text>
        <Switch value={fumante} onValueChange={setFumante} trackColor={{ true: '#4B7BE5' }} />
      </View>

      <Text style={styles.sectionTitle}>Detalhes Adicionais</Text>

      <TextInput placeholder="Pressão Arterial (Ex: 120/80)" value={pressaoArterial} onChangeText={setPressaoArterial} style={styles.input} />
      <TextInput placeholder="Alergias" value={alergias} onChangeText={setAlergias} style={[styles.input, { height: 60 }]} multiline />
      <TextInput placeholder="Restrições Físicas" value={restricoesFisicas} onChangeText={setRestricoesFisicas} style={[styles.input, { height: 60 }]} multiline />
      <TextInput placeholder="Medicamentos em Uso" value={medicamentosEmUso} onChangeText={setMedicamentosEmUso} style={[styles.input, { height: 60 }]} multiline />
      <TextInput placeholder="Observações Gerais" value={observacoes} onChangeText={setObservacoes} style={[styles.input, { height: 80 }]} multiline />

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar ficha média" onPress={handleSave} color="#4B7BE5" />}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Anamneses')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 10, color: '#333' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  switchLabel: { fontSize: 16, color: '#444' },
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default CriaAnamneseScreen;