import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "../../firebase.config"; // Recursos de autenticação
import { signOut } from "firebase/auth"; // Função do firebase para logout

export default function AreaLogada({ navigation }) {
  // Acessando dados do usuario logado atraves do currentUser
  console.log(auth.currentUser);

  // Extraindo a propriedade de email e displayName do currentUser
  const { email, displayName } = auth.currentUser;

  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth); // Chamada da função com unico parametro de autenticação
      navigation.replace("Inicial"); // Voltando para pagina inicial
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.topo}>
        <Text style={estilos.bemVindo}>Bem-vindo(a) {displayName} </Text>
        <Text>E-mail cadastrado: </Text>
        <Text style={{ fontWeight: "bold" }}>{email}</Text>
        <Button onPress={logout} title="Logout" color="#D35400" />
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
