import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddCardScreen = ({ navigation }: { navigation: any }) => {
  const [cardHolderName, setCardHolderName] = useState('Hoang Pham');
  const [cardNumber, setCardNumber] = useState('000 000 000 67');
  const [expiryDate, setExpiryDate] = useState('04/28');
  const [cvv, setCvv] = useState('0000');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Card</Text>
      </View>

      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <Text style={styles.cardNumber}>000 000 000 00</Text>
        <View style={styles.cardDetailsRow}>
          <Text style={styles.cardHolderName}>Card holder name</Text>
          <Text style={styles.expiryDate}>Expiry date</Text>
        </View>
        <View style={styles.cardDetailsRow}>
          <Text style={styles.cardHolderNameValue}>{cardHolderName}</Text>
          <Text style={styles.expiryDateValue}>{expiryDate}</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          style={styles.input}
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Card</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backIcon: {
    fontSize: 24,
    color: '#999',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#FF6B6B',
  },
  cardPreview: {
    backgroundColor: '#FDECEC',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#333',
    marginBottom: 10,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderName: {
    color: '#999',
    fontSize: 12,
  },
  expiryDate: {
    color: '#999',
    fontSize: 12,
  },
  cardHolderNameValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expiryDateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 'auto',
  },
  navIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
});

export default AddCardScreen;
