import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,Image } from 'react-native';

const paymentMethods = [
    { id: '1', type: 'Credit Card', info: '••• ••• ••67', icon: '💳' },
    { id: '2', type: 'Apple Play', icon: '🍏' },
    { id: '3', type: 'Paypal', icon: '💵' },
    { id: '4', type: 'Cash', icon: '💰' },
];

const PaymentMethod = ({ navigation }: { navigation: any }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    return (
        <View style={styles.container}>
            {/* Tab Navigation */}
      <TouchableOpacity 
                onPress={() => navigation.goBack()}
               >
      <Image source={require('../../assets/images/icon_back.png')}/>

     
      </TouchableOpacity>
            <Text style={styles.title}>Payment Methods</Text>
            <FlatList
                data={paymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item.id)} style={styles.method}>
                        <Text style={styles.icon}>{item.icon}</Text>
                        <Text style={styles.methodText}>{item.info || item.type}</Text>
                        <View style={[styles.checkCircle, selectedId === item.id && styles.selected]}>
                            {selectedId === item.id && <View style={styles.innerCircle} />}
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity style={styles.addButton}onPress={() => navigation.navigate('addcard')}>
                <Text style={styles.addButtonText}>Add New Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        color: '#FF6F61',
        marginBottom: 20,
    },
    method: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    icon: {
        fontSize: 24,
        marginRight: 10,
    },
    methodText: {
        flex: 1,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FF6F61',
    },
    selected: {
        borderColor: '#FF6F61',
    },
    addButton: {
        backgroundColor: '#FF6F61',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default PaymentMethod;