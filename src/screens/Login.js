import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  Vibration,
  View,
} from "react-native";
import { useState } from "react";

// Importação dos recursos de autenticação
import { auth } from "../../firebase.config";
// Importação da função de login com email e senha
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  // State de Email e Senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função de Login
  const login = async () => {
    if (!email || !senha) {
      Vibration.vibrate(300);
      Alert.alert("Ops!", "Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha); // Função com parametros de autenticação, email e senha
      navigation.replace("AreaLogada"); // Encaminhando para area logada
    } catch (error) {
      console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/invalid-credential":
          mensagem = "Dados inválidos!";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido";
          break;
        default:
          mensagem = "Houve um erro, tente novamente";
          break;
      }
      Alert.alert("Ops!", mensagem);
    } // Tratativa de mensagem para usuario de erros possiveis
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setEmail(valor)}
          placeholder="E-mail"
          style={estilos.input}
        />
        <TextInput
          onChangeText={(valor) => setSenha(valor)}
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
        />
        <View style={estilos.botoes}>
          <Button onPress={login} title="Entre" color="green" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginBottom: 32,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    marginVertical: 8,
    padding: 8,
    borderRadius: 4,
  },
  botoes: {
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
