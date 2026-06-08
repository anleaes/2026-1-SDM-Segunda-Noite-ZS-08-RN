import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'EditaPlanoMensalidade'>;

const EditaPlanoMensalidadeScreen = ({ route, navigation }: Props) => {
  const { plano } = route.params;

  const [nome, setNome] = useState(plano.nome);
  const [descricao, setDescricao] = useState(plano.descricao);
  const [valor, setValor] = useState(plano.valor.toString());
  const [duracaoDias, setDuracaoDias] = useState(plano.duracao_dias);
  const [ativo, setAtivo] = useState(plano.ativo);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(plano.nome);
    setDescricao(plano.descricao);
    setValor(plano.valor.toString());
    setDuracaoDias(plano.duracao_dias);
    setAtivo(plano.ativo);
  }, [plano]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`http://localhost:8000/planosmensalidade/${plano.id}/`, {
        method: 'PUT',
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
      <Text style={styles.title}>Editar plano de mensalidade</Text>
      
      <TextInput placeholder="Nome do plano" value={nome} onChangeText={setNome} style={styles.input} />
      
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={[styles.input, { height: 80 }]} multiline />
      
      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Vigência do plano</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={duracaoDias} onValueChange={(itemValue) => setDuracaoDias(Number(itemValue))}>
          <Picker.Item label="Mensal" value={30} />
          <Picker.Item label="Trimestral" value={90} />
          <Picker.Item label="Semestral" value={180} />
          <Picker.Item label="Anual" value={365} />
        </Picker>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Plano Ativo?</Text>
        <Switch value={ativo} onValueChange={setAtivo} trackColor={{ true: '#4B7BE5' }} />
      </View>

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar Alterações" onPress={handleSave} color="#4B7BE5" />}
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

export default EditaPlanoMensalidadeScreen;