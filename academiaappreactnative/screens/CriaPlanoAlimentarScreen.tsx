import { Picker } from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Aluno, DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'CriaPlanoAlimentar'>;

const CriaPlanoAlimentarScreen = ({ navigation }: Props) => {
  const [titulo, setTitulo] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [calorias, setCalorias] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [descricao, setDescricao] = useState('');
  const [alunoId, setAlunoId] = useState<number>(0);

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTitulo(''); setObjetivo(''); setCalorias(''); setDataInicio(''); setDataFim(''); setDescricao(''); 
      
      const fetchAlunos = async () => {
        try {
          const res = await fetch('http://localhost:8000/alunos/');
          const data = await res.json();
          setAlunos(data);
          if (data.length > 0) setAlunoId(data[0].id);
        } catch (error) {
          console.log("Erro ao carregar alunos", error);
        }
      };
      fetchAlunos();
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:8000/planosalimentares/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          objetivo,
          data_inicio: dataInicio,
          data_fim: dataFim ? dataFim : null,
          calorias_diarias: parseInt(calorias) || 0,
          aluno: alunoId
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar: \n' + JSON.stringify(err));
      } else {
        navigation.navigate('PlanosAlimentares');
      }
    } catch (error) {
      alert("Erro de comunicação.");
    }
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Novo plano alimentar</Text>
      
      <TextInput placeholder="Título do plano" value={titulo} onChangeText={setTitulo} style={styles.input} />
      
      <TextInput placeholder="Objetivo" value={objetivo} onChangeText={setObjetivo} style={styles.input} />
      
      <TextInput placeholder="Calorias diárias" value={calorias} onChangeText={setCalorias} style={styles.input} keyboardType="numeric" />

      <TextInput placeholder="Data de início" value={dataInicio} onChangeText={setDataInicio} style={styles.input} />

      <TextInput placeholder="Data de fim" value={dataFim} onChangeText={setDataFim} style={styles.input} />

      <TextInput placeholder="Descrição/observações" value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 80 }]} multiline />

      <Text style={styles.label}>Aluno do plano</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={alunoId} onValueChange={(itemValue) => setAlunoId(Number(itemValue))}>
          {alunos.map(a => (
            <Picker.Item key={a.id} label={`${a.nome} ${a.sobrenome}`} value={a.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar Plano" onPress={handleSave} color="#4B7BE5" />}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('PlanosAlimentares')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default CriaPlanoAlimentarScreen;