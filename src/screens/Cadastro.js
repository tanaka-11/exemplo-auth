import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  Vibration,
  View,
} from "react-native";
import { useState } from "react";

import { auth } from "../../firebase.config"; // Recursos de autenticação
import { createUserWithEmailAndPassword } from "firebase/auth"; // Função do firebase para cadastrar usuario

export default function Cadastro({ navigation }) {
  // State de Email e Senha
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função de cadastrar
  const cadastrar = async () => {
    if (!email || !senha) {
      Vibration.vibrate(300);
      Alert.alert("Ops!", "Preencha todos os campos");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha); // Função com parametros de autenticação, email e senha
      Alert.alert("Sucesso!", "Conta cadastrada com sucesso", [
        {
          style: "cancel",
          text: "Okay",
          onPress: () => {
            return;
          },
        },
        {
          style: "default",
          text: "Ir para área logada",
          onPress: () => navigation.replace("AreaLogada"),
        },
      ]); // Alert com botões personalizados
    } catch (error) {
      console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/email-already-in-use":
          mensagem = "E-mail já cadastrado";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido";
          break;
        case "auth/weak-password":
          mensagem = "Senha fraca (mínimo de 6 caracteres)";
          break;
        default:
          mensagem = "Houve um erro, tente novamente";
          break;
      }
      Alert.alert("Ops!", mensagem);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.formulario}>
        <TextInput
          onChangeText={(valor) => setEmail(valor)} // Capturando texto digitado e o passando para o state
          placeholder="E-mail"
          style={estilos.input}
          keyboardType="email-address"
        />

        <TextInput
          onChangeText={(valor) => setSenha(valor)}
          placeholder="Senha"
          style={estilos.input}
          secureTextEntry
        />

        <View style={estilos.botoes}>
          <Button onPress={cadastrar} title="Cadastre-se" color="blue" />
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  formulario: {
    marginVertical: 16,
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
