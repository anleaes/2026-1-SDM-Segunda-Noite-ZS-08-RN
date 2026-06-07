import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'EditaInstrutor'>;

const EditaInstrutorScreen = ({ route, navigation }: Props) => {
  const { instrutor } = route.params;

  const [nome, setNome] = useState(instrutor.nome);
  const [sobrenome, setSobrenome] = useState(instrutor.sobrenome);
  const [cpf, setCpf] = useState(instrutor.cpf);
  const [email, setEmail] = useState(instrutor.email || '');
  const [telefone, setTelefone] = useState(instrutor.telefone || '');
  const [dataNascimento, setDataNascimento] = useState(instrutor.data_nascimento || '');
  
  const [cref, setCref] = useState(instrutor.cref);
  const [especialidade, setEspecialidade] = useState(instrutor.especialidade || 'MUSC');
  const [salario, setSalario] = useState(instrutor.salario?.toString() || '');
  const [dataAdmissao, setDataAdmissao] = useState(instrutor.data_admissao || '');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(instrutor.nome); setSobrenome(instrutor.sobrenome); setCpf(instrutor.cpf);
    setEmail(instrutor.email || ''); setTelefone(instrutor.telefone || ''); setDataNascimento(instrutor.data_nascimento || '');
    setCref(instrutor.cref); setEspecialidade(instrutor.especialidade || 'MUSC');
    setSalario(instrutor.salario?.toString() || ''); setDataAdmissao(instrutor.data_admissao || '');
  }, [instrutor]);

  const handleSave = async () => {
    setSaving(true);

    let dataNascFormatada = dataNascimento;
    if (dataNascimento.includes('/')) {
      const partes = dataNascimento.split('/');
      if (partes.length === 3) dataNascFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    let dataAdmissaoFormatada = dataAdmissao;
    if (dataAdmissao.includes('/')) {
      const partes = dataAdmissao.split('/');
      if (partes.length === 3) dataAdmissaoFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    }

    try {
      const res = await fetch(`http://localhost:8000/instrutores/${instrutor.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome, sobrenome, cpf, email, telefone,
          data_nascimento: dataNascFormatada,
          cref, especialidade,
          salario: salario.replace(',', '.') || '0',
          data_admissao: dataAdmissaoFormatada || null
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar: ' + JSON.stringify(err));
      } else {
        navigation.navigate('Instrutores');  
      }
    } catch (error) {
      alert("Erro de comunicação.");
    }
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Editar Instrutor</Text>
      
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} style={styles.input} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Data Nascimento (DD/MM/AAAA)" value={dataNascimento} onChangeText={setDataNascimento} style={styles.input} maxLength={10} />
      
      <Text style={styles.sectionTitle}>Dados Profissionais</Text>
      <TextInput placeholder="CREF" value={cref} onChangeText={setCref} style={styles.input} autoCapitalize="characters" />
      
      <Text style={styles.label}>Especialidade</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={especialidade} onValueChange={setEspecialidade}>
          <Picker.Item label="Musculação" value="MUSC" />
          <Picker.Item label="Treinamento Funcional" value="FUNC" />
          <Picker.Item label="Pilates" value="PILA" />
          <Picker.Item label="Cross Training" value="CROS" />
          <Picker.Item label="Dança / Ritmos" value="DANC" />
          <Picker.Item label="Artes Marciais" value="LUTA" />
          <Picker.Item label="Natação" value="NATA" />
          <Picker.Item label="Ginástica Geral" value="GERA" />
        </Picker>
      </View>

      <TextInput placeholder="Salário (R$)" value={salario} onChangeText={setSalario} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Data Admissão (DD/MM/AAAA)" value={dataAdmissao} onChangeText={setDataAdmissao} style={styles.input} maxLength={10} />

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar Alterações" onPress={handleSave} color="#4B7BE5" />}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Instrutores')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 12, color: '#333' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default EditaInstrutorScreen;