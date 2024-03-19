import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase.config"; // Recursos de autenticação

export default function AreaLogada() {
  // Acessando dados do usuario logado
  console.log(auth.currentUser);

  // Extraindo a propriedade de email do currentUser
  const { email } = auth.currentUser;

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Text style={estilos.bemVindo}>Bem-vindo(a)</Text>
        <Text>E-mail cadastrado: </Text>
        <Text style={{ fontWeight: "bold" }}>{email}</Text>
        <Button title="Logout" color="#D35400" />
      </View>

      <View style={estilos.geral}>
        <Text>Você está na área logada.</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF3CF",
    padding: 16,
  },
  topo: {
    marginVertical: 32,
  },
  bemVindo: {
    fontSize: 24,
    marginVertical: 16,
  },
});
