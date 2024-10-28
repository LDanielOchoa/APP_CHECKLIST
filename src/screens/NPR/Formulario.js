import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const secciones = [
  {
    titulo: "1. SEGURIDAD ACTIVA",
    items: [
      { id: 1, texto: "Mecanismo y Freno de parqueo", estado: null },
      { id: 2, texto: "Pedal y Freno de Servicio", estado: null },
      { id: 3, texto: "Frenos Telma", estado: null },
      { id: 4, texto: "Estado de suspensión", estado: null },
      { id: 5, texto: "Estado dirección Volante y bocina", estado: null },
      { id: 6, texto: "Estado Llantas y rines", estado: null },
      { id: 7, texto: "Luces Externas", estado: null },
      { id: 8, texto: "Luces Internas", estado: null },
      { id: 9, texto: "Testigos tablero de instrumentos", estado: null },
      { id: 10, texto: "Instrumentos de control en el tablero", estado: null },
      { id: 11, texto: "Niveles y fluidos", estado: null },
    ]
  },
  {
    titulo: "2. SEGURIDAD PASIVA",
    items: [
      { id: 12, texto: "Silla de Operador y Cinturón de Seguridad", estado: null },
      { id: 13, texto: "Cinturón de Seguridad PMR", estado: null },
      { id: 14, texto: "Mecanismos y salidas de emergencia", estado: null },
      { id: 15, texto: "Estado Sillas de Pasajeros", estado: null },
      { id: 16, texto: "Estado de Pasamanos", estado: null },
      { id: 17, texto: "Estado panorámicos ventanas y claraboyas", estado: null },
      { id: 18, texto: "Estado Espejos Internos y externos", estado: null },
    ]
  },
  {
    titulo: "3. CONTROLES",
    items: [
      { id: 19, texto: "Control y funcionamiento limpiabrisa", estado: null },
      { id: 20, texto: "Control, timbre y operación del PMR", estado: null },
      { id: 21, texto: "Estado palanca de cambios", estado: null },
      { id: 22, texto: "Apertura Cierre y Alarma de Puertas", estado: null },
      { id: 23, texto: "Extractores-Ventiladores", estado: null },
    ]
  },
  {
    titulo: "4. INSPECCIÓN Y ESTADO DE EQUIPO DE EMERGENCIA Y CARRETERA",
    items: [
      { id: 24, texto: "Extintores Carga - Estado", estado: null },
      { id: 25, texto: "Botiquín con elementos Básicos", estado: null },
      { id: 26, texto: "Herramienta para vial", estado: null },
    ]
  },
  {
    titulo: "5. INSPECCIÓN Y ESTADO DE DOCUMENTOS COMUNICACIÓN Y RECAUDO",
    items: [
      { id: 27, texto: "Estado T.T - Radio Comunicación", estado: null },
      { id: 28, texto: "Estado Unidad Lógica", estado: null },
      { id: 29, texto: "Estado del Validador", estado: null },
      { id: 30, texto: "Módulo Control ROC", estado: null },
      { id: 31, texto: "Ruteros", estado: null },
      { id: 32, texto: "Disco Tacógrafo", estado: null },
      { id: 33, texto: "Señalética Interna - Externa", estado: null },
    ]
  },
  {
    titulo: "6. IDENTIFICACIÓN FECHAS DE VIGENCIA DOCUMENTOS DE LA UNIDAD",
    items: [
      { id: 34, texto: "Licencia de tránsito", estado: null },
      { id: 35, texto: "Póliza RC - RCE", estado: null },
      { id: 36, texto: "Seguro Obligatorio (original)", estado: null },
      { id: 37, texto: "Tarjeta Operación (original)", estado: null },
      { id: 38, texto: "Certificado Revisión Tecnicomecánica", estado: null },
    ]
  },
];

const ItemCheckComponent = ({ item, onPress }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{item.texto}</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, item.estado === 'OK' ? styles.buttonSelected : {}]}
        onPress={() => onPress(item.id, 'OK')}
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, item.estado === 'OB' ? styles.buttonSelected : {}]}
        onPress={() => onPress(item.id, 'OB')}
      >
        <Text style={styles.buttonText}>OB</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SeccionComponent = ({ seccion, onItemPress }) => (
  <View style={styles.seccionContainer}>
    <Text style={styles.seccionTitulo}>{seccion.titulo}</Text>
    {seccion.items.map(item => (
      <ItemCheckComponent key={item.id} item={item} onPress={onItemPress} />
    ))}
  </View>
);

export default function Formulario() {
  const [formulario, setFormulario] = useState(secciones);

  const handleItemPress = (id, estado) => {
    setFormulario(prevFormulario => 
      prevFormulario.map(seccion => ({
        ...seccion,
        items: seccion.items.map(item => 
          item.id === id ? { ...item, estado } : item
        )
      }))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {formulario.map((seccion, index) => (
          <SeccionComponent key={index} seccion={seccion} onItemPress={handleItemPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  seccionContainer: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginLeft: 8,
  },
  buttonSelected: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
});
