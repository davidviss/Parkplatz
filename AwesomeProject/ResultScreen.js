import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { generateSchedule } from './logic';


const ResultScreen = () => {
  // Erstelle eine Liste von Anwärtern
  const attendees = ["Dr.Luxem","Dr.Heuel", "Prowatke","Kelterborn", "Offizier", "Gierlich", "Fisch","Wölki", "Förster", "Zopes", 'Anwärter1', 'Anwärter2'];
  
  // Erstelle die Tabelle mit den zugewiesenen Parkplätzen und Anwärtern
  const tableData = generateSchedule(attendees);
  const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
  const numRows = 8; // Anzahl der Parkplatzzeilen
  const numCols = daysOfWeek.length;

  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 16,
    },
    tableHeader: {
      height: 40,
      backgroundColor: '#f1f8ff',
    },
    tableHeaderText: {
      margin: 6,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    tableRow: {
      height: 30,
    },
    tableRowText: {
      margin: 6,
      textAlign: 'center',
    },
    tableContainer: {
        marginBottom: 4,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
      },
    namesContainer: {
      marginTop: 32,
      backgroundColor: '#fff',
      padding: 8,
      borderRadius: 10,
    },
    namesTitle: {
      fontWeight: 'bold',
      fontSize: 25,
      marginBottom: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
  });

  const tableData1 = tableData.map(row => row.slice(0, 3));
  const tableData2 = tableData.map(row => row.slice(3));

  return (
    
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Text style={styles.namesTitle}>Montag bis Mittwoch</Text>
        <Table>
          <Row data={['', ...daysOfWeek.slice(0, 3)]} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
          {tableData1.map((rowData, index) => (
            <Row key={index} data={[`P ${index+1}`, ...rowData]} style={styles.tableRow} textStyle={[styles.tableRowText]} />
          ))}
        </Table>
      </View>
      <View style={styles.tableContainer}>
        <Text style={styles.namesTitle}>Donnerstag bis Freitag</Text>
        <Table>
          <Row data={['', ...daysOfWeek.slice(3)]} style={styles.tableHeader} textStyle={styles.tableHeaderText} />
          {tableData2.map((rowData, index) => (
            <Row key={index} data={[`P ${index+1}`, ...rowData]} style={styles.tableRow} textStyle={styles.tableRowText} />
          ))}
        </Table>
      </View>
    </View>
    
  );
};

export default ResultScreen;
