import { DrawerScreenProps } from '@react-navigation/drawer';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList, ItemTreino } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'CriaTreino'>;

type ElementoBasico = { id: number; nome: string };

interface ItemCarrinho extends ItemTreino {
  exercicioNome: string;
}

const CriaTreinoScreen = ({ navigation }: Props) => {
  const [listaAlunos, setListaAlunos] = useState<ElementoBasico[]>([]);
  const [listaInstrutores, setListaInstrutores] = useState<ElementoBasico[]>([]);
  const [listaExercicios, setListaExercicios] = useState<ElementoBasico[]>([]);
  const [loadingDados, setLoadingDados] = useState(true);

  const [alunoId, setAlunoId] = useState('');
  const [instrutorId, setInstrutorId] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracao, setDuracao] = useState('');

  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [exercicioId, setExercicioId] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [carga, setCarga] = useState('');
  const [intervalo, setIntervalo] = useState('');

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const carregarDadosEstaticos = async () => {
      try {
        const [resAlunos, resInstrutores, resExercicios] = await Promise.all([
          fetch('http://localhost:8000/alunos/'),
          fetch('http://localhost:8000/instrutores/'),
          fetch('http://localhost:8000/exercicios/')
        ]);
        
        setListaAlunos(await resAlunos.json());
        setListaInstrutores(await resInstrutores.json());
        setListaExercicios(await resExercicios.json());
      } catch (error) {
        alert("Erro ao carregar listas do banco de dados.");
      } finally {
        setLoadingDados(false);
      }
    };
    carregarDadosEstaticos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setAlunoId(''); setInstrutorId(''); setNome(''); setDescricao(''); setDuracao('');
      setCarrinho([]);
      limparCamposDoItem();
    }, [])
  );

  const limparCamposDoItem = () => {
    setExercicioId(''); setSeries(''); setRepeticoes(''); setCarga(''); setIntervalo('');
  };

  const adicionarAoCarrinho = () => {
    if (!exercicioId || exercicioId === '') {
      alert("Por favor, selecione um exercício válido da lista!");
      return;
    }

    const exercicioSelecionado = listaExercicios.find(e => e.id.toString() === exercicioId);
    
    const novoItem: ItemCarrinho = {
      exercicio: exercicioId,
      exercicioNome: exercicioSelecionado ? exercicioSelecionado.nome : 'Desconhecido',
      series: series || '0',
      repeticoes: repeticoes || '0',
      carga_kg: carga.replace(',', '.') || '0',
      intervalo_segundos: intervalo || '0'
    };
    
    setCarrinho([...carrinho, novoItem]);
    limparCamposDoItem(); 
  };

  const handleSaveFinal = async () => {
    if (!alunoId || !instrutorId) {
      alert("Selecione o Aluno e o Instrutor antes de salvar.");
      return;
    }
    if (carrinho.length === 0) {
      alert("Adicione pelo menos um exercício ao treino.");
      return;
    }

    setSaving(true);
    
    try {
      const resTreino = await fetch('http://localhost:8000/treinos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          aluno: alunoId,
          instrutor: instrutorId,
          nome: nome,
          descricao: descricao,
          duracao_minutos: duracao || '0'
        }),
      });

      if (!resTreino.ok) {
        const error = await resTreino.json();
        alert("Erro ao criar Treino: " + JSON.stringify(error));
        setSaving(false);
        return;
      }

      const treinoCriado = await resTreino.json();
      const novoTreinoId = treinoCriado.id;

      for (const item of carrinho) {
        await fetch('http://localhost:8000/itemtreino/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            treino: novoTreinoId,
            exercicio: item.exercicio,
            series: item.series,
            repeticoes: item.repeticoes,
            carga_kg: item.carga_kg,
            intervalo_segundos: item.intervalo_segundos,
            observacoes: ""
          }),
        });
      }

      navigation.navigate('Treinos');  
    } catch (error) {
      alert("Erro de conexão com a API ao salvar o treino.");
    }

    setSaving(false);
  };

  if (loadingDados) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4B7BE5" />
        <Text style={{ marginTop: 10 }}>Carregando dados do servidor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>1. Dados do Treino</Text>
        
        <TextInput placeholder="Nome do Treino (Ex: Peito e Tríceps)" value={nome} onChangeText={setNome} style={styles.input} />
        
        <Text style={styles.label}>Aluno</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={alunoId} onValueChange={(val) => setAlunoId(val)}>
            <Picker.Item label="Selecione o Aluno..." value="" color="#999" />
            {listaAlunos.map(a => <Picker.Item key={a.id} label={a.nome} value={a.id.toString()} />)}
          </Picker>
        </View>

        <Text style={styles.label}>Instrutor Responsável</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={instrutorId} onValueChange={(val) => setInstrutorId(val)}>
            <Picker.Item label="Selecione o Instrutor..." value="" color="#999" />
            {listaInstrutores.map(i => <Picker.Item key={i.id} label={i.nome} value={i.id.toString()} />)}
          </Picker>
        </View>

        <TextInput placeholder="Duração (Minutos)" value={duracao} onChangeText={setDuracao} style={styles.input} keyboardType="numeric" />
        <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={styles.input} />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>2. Adicionar Exercício</Text>
        
        <Text style={styles.label}>Selecione o Exercício</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={exercicioId} onValueChange={(val) => setExercicioId(val)}>
            <Picker.Item label="Escolha um exercício..." value="" color="#999" />
            {listaExercicios.map(e => <Picker.Item key={e.id} label={e.nome} value={e.id.toString()} />)}
          </Picker>
        </View>

        <View style={styles.rowInputs}>
          <TextInput placeholder="Séries" value={series} onChangeText={setSeries} style={[styles.input, { flex: 1, marginRight: 5 }]} keyboardType="numeric" />
          <TextInput placeholder="Repetições" value={repeticoes} onChangeText={setRepeticoes} style={[styles.input, { flex: 1, marginLeft: 5 }]} keyboardType="numeric" />
        </View>
        <View style={styles.rowInputs}>
          <TextInput placeholder="Carga (Kg)" value={carga} onChangeText={setCarga} style={[styles.input, { flex: 1, marginRight: 5 }]} keyboardType="numeric" />
          <TextInput placeholder="Intervalo (Seg)" value={intervalo} onChangeText={setIntervalo} style={[styles.input, { flex: 1, marginLeft: 5 }]} keyboardType="numeric" />
        </View>
        
        <Button title="+ Adicionar ao Carrinho" onPress={adicionarAoCarrinho} color="#28a745" />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>🛒 Itens no Treino ({carrinho.length})</Text>
        {carrinho.length === 0 && <Text style={{ color: '#999', fontStyle: 'italic' }}>Nenhum exercício adicionado ainda.</Text>}
        {carrinho.map((item, index) => (
          <View key={index} style={styles.cartItemContainer}>
            <Text style={styles.cartItemName}>• {item.exercicioNome}</Text>
            <Text style={styles.cartItemDetails}>{item.series}x{item.repeticoes} - {item.carga_kg}Kg ({item.intervalo_segundos}s desc.)</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {saving
          ? <ActivityIndicator size="large" color="#4B7BE5" />
          : <Button title="SALVAR TREINO COMPLETO" onPress={handleSaveFinal} color="#0D47A1" />
        }
      </View>
      <Button title="Cancelar" onPress={() => navigation.navigate('Treinos')} color="#E54848" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  sectionCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, backgroundColor: '#fafafa' },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },
  cartItemContainer: { marginBottom: 8, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  cartItemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cartItemDetails: { fontSize: 14, color: '#666', marginLeft: 10 },
  buttonContainer: { marginTop: 10, marginBottom: 10 }
});

export default CriaTreinoScreen;