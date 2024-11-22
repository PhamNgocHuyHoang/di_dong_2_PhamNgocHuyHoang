import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Thay đổi tên biến
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://10.18.7.18:8080/api/users");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đã xảy ra lỗi trong quá trình đăng nhập!");
      }

      const data = await response.json();
      // Kiểm tra cả email và username
      const user = data.content.find(
        (user: { email: string; username: string; pass: string; }) => 
          (user.email === usernameOrEmail || user.username === usernameOrEmail) && 
          user.pass === password
      );

      if (!user) {
        throw new Error("Email hoặc username hoặc mật khẩu không đúng!");
      }

      console.log("Đăng nhập thành công:", user);
      navigation.navigate("Home");
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

  const handleForgotPasswordPress = () => {
    console.log("Forgot Password pressed!");
    navigation.navigate("Forget");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          value={usernameOrEmail}
          onChangeText={(text) => setUsernameOrEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999999"  // Màu placeholder mờ đi
          secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        />
      </View>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => { /* Add forgot password navigation */ }}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.inBut}>
        <View>
        <Button
          title={loading ? "Đang đăng nhập..." : "Login"}
          onPress={handleLogin}
          color="#fa6a0a"
          disabled={loading}
        />
        </View>
      </TouchableOpacity>

      {/* Or Login with */}
      <Text style={styles.orText}>or login with</Text>

      {/* Sign Up */}
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Singup')}>
          <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
        </TouchableOpacity>
      </Text>
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
  forgotPassword: {
    textAlign: 'right',
    color: '#999',
    fontSize: 14,
    textDecorationLine: 'underline',
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
  signUpText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
});

export default LoginScreen;
