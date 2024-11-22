import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

interface ProductItemProps {
  navigation: any;
  selectedCategoryId: number | null;
  limit?: number;
  searchQuery: string; // Thêm thuộc tính searchQuery để tìm kiếm theo từ khóa
}

const ProductItem = ({ navigation, selectedCategoryId, limit = 100, searchQuery, sortAscending }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://10.18.7.18:8080/api/products');
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.content);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategoryId ? product.category.id === selectedCategoryId : true;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => sortAscending ? a.price - b.price : b.price - a.price); // Sắp xếp theo giá

  const displayedProducts = filteredProducts.slice(0, limit);

  return (
    <>
      {displayedProducts.map((product) => (
        <TouchableOpacity 
          style={styles.productContainer}
          key={product.id} 
          onPress={() => navigation.navigate("detail", { 
            id: product.id, 
            title: product.title, 
            price: product.price, 
            photo: product.photo,
            description: product.description 
          })}
        >
          <View style={styles.productCard}>
            <Image 
              source={{ uri: `http://10.18.7.18:8080/api/image/products/${product.photo}` }} 
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>{product.price.toLocaleString('en-US')} ₫</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};




{/* <TouchableOpacity
style={styles.productContainer}
onPress={() => navigation.navigate('detail', { product: item })} // Điều hướng đến ProductDetail với dữ liệu sản phẩm
>
<Image source={item.image} style={styles.productImage} />
<Text style={styles.productName}>{item.name}</Text>
<Text style={styles.productDescription}>{item.description}</Text>
<Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
</TouchableOpacity> */}
export default ProductItem;

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        color: '#FF6B6B',
      },
      searchInput: {
        flex: 1,
        marginLeft: 10,
        paddingHorizontal: 10,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
      },
      categories: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
      },
      category: {
        marginRight: 20,
        fontSize: 16,
        color: '#FF7F7F',
      },
      activeCategory: {
        fontWeight: 'bold',
        color: '#FF6B6B',
      },
      productList: {
        paddingHorizontal: 16,
      },
      productContainer: {
        backgroundColor: '#F9F9F9',
        padding: 16,
        margin: 8,
        borderRadius: 10,
        width: '45%',
        display:'flex',
    
      },
      productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
      },
      productDescription: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
      },
      productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6B6B',
        marginTop: 5,
      },
}); 