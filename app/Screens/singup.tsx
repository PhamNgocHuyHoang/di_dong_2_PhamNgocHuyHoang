import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';

const CreateAccountScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [numphone, setNumphone] = useState("");
    const [pass, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleRegister = async () => {
      if (!username || !email || !numphone || !pass) {
        setErrorMessage("Vui lòng điền đầy đủ thông tin!");
        return;
      }
  
      if (!validateEmail(email)) {
        setErrorMessage("Email không hợp lệ!");
        return;
      }
  
      setLoading(true);
      setErrorMessage("");
  
      try {
        const response = await fetch('http://10.18.7.18:8080/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, numphone, pass }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Lỗi: ${errorData.message || 'Đã xảy ra lỗi! Đăng ký không thành công.'}`);
        }
  
        const data = await response.json();
        console.log(data);
        navigation.navigate("Login");
      }
      catch (error: unknown) {
        console.error("Lỗi đăng nhập:", error);
  
        // Kiểm tra kiểu dữ liệu của `error` trước khi truy cập thuộc tính `message`
        let errorMessage = "Có lỗi xảy ra trong quá trình đăng nhập.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
  
        setErrorMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    };
  
    const validateEmail = (email: string) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    };
  
    const handleForgotPasswordPress = () => {
      console.log("Forgot Password pressed!");
    };

    




  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          value={username}
        onFocus={() => setUsername("")}
        onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          value={email}
        onFocus={() => setEmail("")}
        onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={numphone}
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          onFocus={() => setNumphone("")}
          onChangeText={setNumphone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          value={pass}
        onFocus={() => setPassword("")}
        onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          placeholder="Confirm Password"
       
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Terms and Policy */}
      <Text style={styles.terms}>
        By continuing, you agree to Terms of Use and Privacy Policy.
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.inBut} >
        <View>
        <Button
          title={loading ? "Loading..." : "Register"}
          onPress={handleRegister}
          color="#fa6a0a"
          disabled={loading}
        />
        </View>
      </TouchableOpacity>
     

      {/* Log In */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#999',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#FF6B6B',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  terms: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
  },
  inBut: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  textSign: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
  loginText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF6B6B',
    textDecorationLine: 'underline',
  },
});

export default CreateAccountScreen;
