import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'EditaAluno'>;

const EditaAlunoScreen = ({ route, navigation }: Props) => {
  const { aluno } = route.params;

  const [listaPlanos, setListaPlanos] = useState<{id: number, nome: string}[]>([]);

  const [nome, setNome] = useState(aluno.nome);
  const [sobrenome, setSobrenome] = useState(aluno.sobrenome);
  const [cpf, setCpf] = useState(aluno.cpf);
  const [email, setEmail] = useState(aluno.email || '');
  const [telefone, setTelefone] = useState(aluno.telefone || '');
  const [dataNascimento, setDataNascimento] = useState(aluno.data_nascimento || '');
  const [peso, setPeso] = useState(aluno.peso?.toString() || '');
  const [altura, setAltura] = useState(aluno.altura?.toString() || '');
  const [genero, setGenero] = useState(aluno.genero || 'N');
  const [objetivo, setObjetivo] = useState(aluno.objetivo || '');
  const [dataMatricula, setDataMatricula] = useState(aluno.data_matricula);
  const [planoId, setPlanoId] = useState(aluno.plano?.toString() || '');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/planosmensalidade/')
      .then(res => res.json())
      .then(data => setListaPlanos(data))
      .catch(() => console.log("Erro ao buscar planos"));
  }, []);

  useEffect(() => {
    setNome(aluno.nome); setSobrenome(aluno.sobrenome); setCpf(aluno.cpf);
    setEmail(aluno.email || ''); setTelefone(aluno.telefone || ''); setDataNascimento(aluno.data_nascimento || '');
    setPeso(aluno.peso?.toString() || ''); setAltura(aluno.altura?.toString() || '');
    setGenero(aluno.genero || 'N'); setObjetivo(aluno.objetivo || '');
    setDataMatricula(aluno.data_matricula); setPlanoId(aluno.plano?.toString() || '');
  }, [aluno]);

  const handleSave = async () => {
    setSaving(true);

    let formatarData = dataNascimento;
    if (dataNascimento.includes('/')){
        const partes = dataNascimento.split('/');
        if (partes.length===3){
            formatarData = `${partes[2]}-${partes[1]}-${partes[0]}`;
        }
    }

    try {
      const res = await fetch(`http://localhost:8000/alunos/${aluno.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome, 
          sobrenome, 
          cpf,
          email,
          telefone,
          data_nascimento: formatarData,
          peso: peso.replace(',', '.') || null,
          altura: altura.replace(',', '.') || null,
          genero, 
          objetivo, 
          data_matricula: dataMatricula,
          plano: planoId || null
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert('Erro ao salvar: ' + JSON.stringify(err));
      } else {
        navigation.navigate('Alunos');  
      }
    } catch (error) {
      alert("Erro de comunicação.");
    }
    setSaving(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Editar Aluno</Text>
      
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} style={styles.input} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />
      
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Telefone" value={telefone} onChangeText={setTelefone} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Data de Nascimento (AAAA-MM-DD)" value={dataNascimento} onChangeText={setDataNascimento} style={styles.input} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput placeholder="Peso (Kg)" value={peso} onChangeText={setPeso} style={[styles.input, { flex: 1, marginRight: 5 }]} keyboardType="numeric" />
        <TextInput placeholder="Altura (m)" value={altura} onChangeText={setAltura} style={[styles.input, { flex: 1, marginLeft: 5 }]} keyboardType="numeric" />
      </View>

      <Text style={styles.label}>Gênero</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={genero} onValueChange={setGenero}>
          <Picker.Item label="Masculino" value="M" />
          <Picker.Item label="Feminino" value="F" />
          <Picker.Item label="Outro" value="O" />
          <Picker.Item label="Prefiro não informar" value="N" />
        </Picker>
      </View>

      <Text style={styles.label}>Plano de Mensalidade</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={planoId} onValueChange={setPlanoId}>
          <Picker.Item label="Selecione um plano..." value="" />
          {listaPlanos.map(p => <Picker.Item key={p.id} label={p.nome} value={p.id.toString()} />)}
        </Picker>
      </View>

      <TextInput placeholder="Objetivo" value={objetivo} onChangeText={setObjetivo} style={[styles.input, { height: 80 }]} multiline />

      <View style={styles.buttonContainer}>
        {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar Alterações" onPress={handleSave} color="#4B7BE5" />}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Alunos')} color="#666" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 8, marginBottom: 4, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default EditaAlunoScreen;