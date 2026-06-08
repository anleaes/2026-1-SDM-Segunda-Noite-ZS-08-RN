import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'CriaPlanoMensalidade'>;

const CriaPlanoMensalidadeScreen = ({ navigation }: Props) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [duracaoDias, setDuracaoDias] = useState(30);
  const [ativo, setAtivo] = useState(true);

  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setNome(''); setDescricao(''); setValor(''); setDuracaoDias(30); setAtivo(true);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:8000/planosmensalidade/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome,
          descricao,
          valor: valor.replace(',', '.') || '0.00',
          duracao_dias: duracaoDias,
          ativo
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar: \n' + JSON.stringify(err));
      } else {
        navigation.navigate('PlanosMensalidade');  
      }
    } catch (error) {
      alert("Erro de comunicação.");
    }
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Novo plano de mensalidade</Text>
      
      <TextInput placeholder="Nome do plano" value={nome} onChangeText={setNome} style={styles.input} />
      
      <TextInput placeholder="Descrição / Benefícios" value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 80 }]} multiline />
      
      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Vigência do plano</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={duracaoDias} onValueChange={(itemValue) => setDuracaoDias(Number(itemValue))}>
          <Picker.Item label="30 dias (Mensal)" value={30} />
          <Picker.Item label="90 dias (Trimestral)" value={90} />
          <Picker.Item label="180 dias (Semestral)" value={180} />
          <Picker.Item label="365 dias (Anual)" value={365} />
        </Picker>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Plano ativo</Text>
        <Switch value={ativo} onValueChange={setAtivo} trackColor={{ true: '#4B7BE5' }} />
      </View>

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar Plano" onPress={handleSave} color="#4B7BE5" />}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('PlanosMensalidade')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  switchLabel: { fontSize: 16, color: '#444' },
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default CriaPlanoMensalidadeScreen;