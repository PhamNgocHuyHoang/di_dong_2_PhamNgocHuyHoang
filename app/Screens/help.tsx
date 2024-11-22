import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Thêm icon cho mũi tên và kính lúp

const HelpScreen = ({ navigation }: { navigation: any }) => {
  const [expanded, setExpanded] = useState(null);

  const faqData = [
    { id: 1, question: "Lorem ipsum dolor sit amet?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque,make it easier for (someone) to do something by offering one's services or resources." },
    { id: 2, question: "Lorem ipsum dolor sit amet?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque.make it easier for (someone) to do something by offering one's services or resources" },
    { id: 3, question: "Lorem ipsum dolor sit amet?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque.make it easier for (someone) to do something by offering one's services or resources" },
  ];

  const toggleExpand = (id) => {
    setExpanded(prev => prev === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <TouchableOpacity 
               onPress={() => navigation.navigate("Home")} 
               >
      <Image source={require('../../assets/images/icon_back.png')}>

      </Image>
      </TouchableOpacity>
      <Text style={styles.headerText}>Help & FAQs</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabTextActive}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.inactiveTab]}>
          <Text style={styles.tabTextInactive}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.inactiveTab]}>
          <Text style={styles.tabTextInactive}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.inactiveTab]}>
          <Text style={styles.tabTextInactive}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.inactiveTab]}>
          <Text style={styles.tabTextInactive}>Services</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Icon name="search" size={20} color="#FF7043" style={styles.searchIcon} />
      </View>

      {/* FAQ List */}
      <ScrollView style={styles.faqList}>
        {faqData.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleExpand(faq.id)} style={styles.faqQuestion}>
              <Text style={styles.questionText}>{faq.question}</Text>
              <Icon name={expanded === faq.id ? "chevron-up" : "chevron-down"} size={20} color="#000" />
            </TouchableOpacity>
            {expanded === faq.id && <Text style={styles.answerText}>{faq.answer}</Text>}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    headerText: {
        padding:20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    tabContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',  // Cho phép các nút tự động xuống dòng
      justifyContent: 'space-between',
      marginBottom: 16,
      // Xóa màu nền cho container
      // backgroundColor: '#FDEEE8',
      padding: 10,
      borderRadius: 10,
    },
    tab: {
      width: '48%', // Chia chiều rộng mỗi nút để vừa hai nút trên một dòng
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 15,
      marginBottom: 8, // Tạo khoảng cách giữa các nút
    },
    activeTab: {
      backgroundColor: '#FF7043',
    },
    inactiveTab: {
      backgroundColor: '#FCEBE7',
    },
    tabTextActive: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center', // Canh giữa nội dung của nút
    },
    tabTextInactive: {
      color: '#FF7043',
      fontWeight: 'bold',
      textAlign: 'center', // Canh giữa nội dung của nút
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FCEBE7',
      padding: 10,
      borderRadius: 20,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    searchIcon: {
      marginLeft: 8,
    },
    faqList: {
      flex: 1,
    },
    faqItem: {
      marginBottom: 16,
    },
    faqQuestion: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 16,
      backgroundColor: '#FCEBE7',
      borderRadius: 10,
    },
    questionText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    answerText: {
      marginTop: 8,
      paddingHorizontal: 16,
      fontSize: 14,
      color: '#333',
    },
  });
  

export default HelpScreen;
