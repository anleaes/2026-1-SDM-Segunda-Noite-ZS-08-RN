import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/types';

type Props = DrawerScreenProps<DrawerParamList, 'EditaAlimentos'>;

const EditaAlimentosScreen = ({ route, navigation }: Props) => {
  const { alimento } = route.params;
  
  const [nome, setNome] = useState(alimento.nome);
  const [calorias, setCalorias] = useState(alimento.calorias_por_100g?.toString() || '');
  const [proteinas, setProteinas] = useState(alimento.proteinas_g?.toString() || '');
  const [carboidratos, setCarboidratos] = useState(alimento.carboidratos_g?.toString() || '');
  const [gorduras, setGorduras] = useState(alimento.gorduras_g?.toString() || '');
  const [fibras, setFibras] = useState(alimento.fibras_g?.toString() || '0');
  
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(alimento.nome);
    setCalorias(alimento.calorias_por_100g?.toString() || '');
    setProteinas(alimento.proteinas_g?.toString() || '');
    setCarboidratos(alimento.carboidratos_g?.toString() || '');
    setGorduras(alimento.gorduras_g?.toString() || '');
    setFibras(alimento.fibras_g?.toString() || '0');
  }, [alimento]);  

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/alimentos/${alimento.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: nome,
          calorias_por_100g: calorias,
          proteinas_g: proteinas,
          carboidratos_g: carboidratos,
          gorduras_g: gorduras,
          fibras_g: fibras
        }),
      }
    );
    navigation.navigate('Alimentos');        
    setSaving(false);  
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Editar Alimento</Text>
      
      <Text style={styles.label}>Nome do Alimento</Text>
      <TextInput value={nome} onChangeText={setNome} style={styles.input} />
      
      <Text style={styles.label}>Calorias (por 100g)</Text>
      <TextInput value={calorias} onChangeText={setCalorias} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Proteínas (g)</Text>
      <TextInput value={proteinas} onChangeText={setProteinas} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Carboidratos (g)</Text>
      <TextInput value={carboidratos} onChangeText={setCarboidratos} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Gorduras (g)</Text>
      <TextInput value={gorduras} onChangeText={setGorduras} style={styles.input} keyboardType="numeric" />

      <Text style={styles.label}>Fibras (g)</Text>
      <TextInput value={fibras} onChangeText={setFibras} style={styles.input} keyboardType="numeric" />

      <View style={styles.buttonContainer}>
        {saving ? (
          <ActivityIndicator size="large" color="#4B7BE5" />
        ) : (
          <Button title="Salvar Alterações" onPress={handleSave} color="#4B7BE5" />
        )}
      </View>
      <Button title="Voltar" onPress={() => navigation.navigate('Alimentos')} color="#666" />
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

export default EditaAlimentosScreen;