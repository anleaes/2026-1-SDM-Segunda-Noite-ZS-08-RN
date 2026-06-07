import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, usuário.</Text>
        <Text style={styles.subtitle}>Seja bem vindo!</Text>
      </View>

      <View style={styles.projectContainer}>
        <Text style={styles.projectTitle}>
          Aplicativo de Gerenciamento de Academias, Exercícios e Plano alimentar
        </Text>
        <Text style={styles.projectDescription}>
          Plataforma centralizada para controle de fichas de alunos, anamneses, 
          montagem de treinos e acompanhamento da rotina nutricional.
        </Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  projectContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4B7BE5',
    marginBottom: 32,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  projectDescription: {
    fontSize: 14,
    color: '#555565',
    marginTop: 8,
    lineHeight: 20,
    fontWeight: '400',
  },
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 50,
  },
  greeting: {
    fontSize: 36, 
    fontWeight: '800',
    color: '#1A1A2E', 
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: '#A0A0B0',
    marginTop: 8,
    fontWeight: '400',
  },
});

export default HomeScreen;