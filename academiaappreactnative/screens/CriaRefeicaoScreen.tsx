import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'CriaRefeicao'>;

const CriaRefeicaoScreen = ({ navigation }: Props) => {
  const [listaPlanos, setListaPlanos] = useState<{id: number, titulo: string}[]>([]);
  const [listaAlimentos, setListaAlimentos] = useState<{id: number, nome: string}[]>([]);

  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState('');
  const [descricao, setDescricao] = useState('');
  const [planoId, setPlanoId] = useState('');
  
  const [alimentosSelecionados, setAlimentosSelecionados] = useState<number[]>([]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/planosalimentares/'),
      fetch('http://localhost:8000/alimentos/')
    ])
    .then(async ([resPlanos, resAlimentos]) => {
      setListaPlanos(await resPlanos.json());
      setListaAlimentos(await resAlimentos.json());
    })
    .catch(() => console.log("Erro ao buscar dados do servidor"));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setNome(''); setHorario(''); setDescricao(''); setPlanoId('');
      setAlimentosSelecionados([]);
    }, [])
  );

  const toggleAlimento = (id: number) => {
    setAlimentosSelecionados(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const res = await fetch('http://localhost:8000/refeicoes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome,
          horario: horario.length === 5 ? `${horario}:00` : horario,
          descricao,
          plano_alimentar: planoId || null,
          alimentos: alimentosSelecionados
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar: ' + JSON.stringify(err));
      } else {
        navigation.navigate('Refeicoes');  
      }
    } catch (error) {
      alert("Erro de comunicação.");
    }
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Nova Refeição</Text>
      
      <TextInput placeholder="Nome da Refeição" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Horário" value={horario} onChangeText={setHorario} style={styles.input} maxLength={5} keyboardType="numbers-and-punctuation" />
      
      <Text style={styles.label}>Plano Alimentar</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={planoId} onValueChange={setPlanoId}>
          <Picker.Item label="Nenhum" value="" />
          {listaPlanos.map(p => <Picker.Item key={p.id} label={p.titulo} value={p.id.toString()} />)}
        </Picker>
      </View>

      {}
      <Text style={styles.label}>Selecione os Alimentos ({alimentosSelecionados.length} selecionados)</Text>
      <View style={styles.multiSelectBox}>
        {listaAlimentos.map(a => {
          const isSelected = alimentosSelecionados.includes(a.id);
          return (
            <TouchableOpacity 
              key={a.id} 
              style={[styles.itemAlimento, isSelected && styles.itemAlimentoSelecionado]}
              onPress={() => toggleAlimento(a.id)}
            >
              <Text style={isSelected ? styles.textoAlimentoSelecionado : styles.textoAlimento}>
                {isSelected ? '✓ ' : ''}{a.nome}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 80 }]} multiline />

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Refeicoes')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  multiSelectBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12, maxHeight: 200 },
  itemAlimento: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemAlimentoSelecionado: { backgroundColor: '#e3ebfc', borderRadius: 6, borderBottomWidth: 0 },
  textoAlimento: { color: '#444' },
  textoAlimentoSelecionado: { color: '#0D47A1', fontWeight: 'bold' },
  
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default CriaRefeicaoScreen;