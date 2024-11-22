// import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
// import React, { useEffect, useState } from 'react';

// const CategoriItem = ({ onSelectCategory }: { onSelectCategory: (categoryId: number | null) => void }) => {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://10.18.7.18:8080/api/categories'); // Thay đổi URL tới API của bạn
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json(); 
//         setCategories(data.content); 
//       } catch (error) {
//         console.error("Error fetching categories data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View style={styles.tabContainer}>  
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
//       <TouchableOpacity 
//         style={styles.tab}
//         onPress={() => onSelectCategory(null)} // Hiển thị tất cả sản phẩm khi không chọn danh mục
//       >
//         <Text style={styles.tabText}>All         |</Text>
//       </TouchableOpacity>

//       {categories.length > 0 ? (
//         categories.map((category) => (
//           <TouchableOpacity
//             key={category.id}
//             style={styles.tab}
//             onPress={() => onSelectCategory(category.id)} // Gửi categoryId khi bấm
//           >
//             <Text style={styles.tabText}>{category.title}      |</Text>
//           </TouchableOpacity>
//         ))
//       ) : (
//         <Text style={styles.noDataText}>Không có danh mục nào</Text>
//       )}
//       </ScrollView>
//     </View>
//   );
// };

// export default CategoriItem;

// const styles = StyleSheet.create({
//   tab: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     // backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 0,
//     // borderColor: "#e10505",
//   },
//   tabText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#DCBEB6",
//     // textShadowColor: "#000",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 1,
//   },
//   tabContainer: {
//     flexDirection: "row",
//   },
//   noDataText: {
//     fontSize: 14,
//     color: "#888",
//     textAlign: 'center', 
//     paddingVertical: 20, 
//   },
// });
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

const CategoriItem = ({ onSelectCategory }: { onSelectCategory: (categoryId: number | null) => void }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://10.18.7.18:8080/api/categories'); // Thay đổi URL tới API của bạn
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); 
        setCategories(data.content); 
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.tabContainer}>  
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => onSelectCategory(null)} // Hiển thị tất cả sản phẩm khi không chọn danh mục
      >
        <Text style={styles.tabText}>All         |</Text>
      </TouchableOpacity>

      {categories.length > 0 ? (
        categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.tab}
            onPress={() => onSelectCategory(category.id)} // Gửi categoryId khi bấm
          >
            <Text style={styles.tabText}>{category.title}      |</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noDataText}>Không có danh mục nào</Text>
      )}
      </ScrollView>
    </View>
  );
};

export default CategoriItem;

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DCBEB6",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  noDataText: {
    fontSize: 14,
    color: "#888",
    textAlign: 'center', 
    paddingVertical: 20, 
  },
});
