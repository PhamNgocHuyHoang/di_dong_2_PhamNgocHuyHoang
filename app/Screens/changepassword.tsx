import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';

const ChangePasswordScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!usernameOrEmail || !oldPassword || !newPassword) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://10.18.7.18:8080/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail,
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đã xảy ra lỗi trong quá trình đổi mật khẩu!");
      }

      Alert.alert("Thành công", "Đổi mật khẩu thành công!");
      navigation.navigate("Login");
    } catch (error) {
      let errorMessage = "Có lỗi xảy ra trong quá trình đổi mật khẩu.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Email hoặc Tên người dùng"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu cũ"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Đang xử lý..." : "Đổi mật khẩu"}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF6B6B',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
