import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList, Alimento } from '../navigation/types'

type Props = DrawerScreenProps<DrawerParamList, 'EditaAlimentos'>;

const EditaAlimentosScreen = ({ route, navigation }: Props) => {
  const { alimento } = route.params;
  const [nome, setName] = useState(alimento.nome);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(alimento.nome);
  }, [alimento]);  

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch(
      `http://localhost:8000/alimentos/${alimento.id}/`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      }
    );
    navigation.navigate('Alimentos');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Descrição</Text>
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Alimentos')} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditaAlimentosScreen;