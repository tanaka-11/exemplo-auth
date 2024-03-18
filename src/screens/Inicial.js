import { Button, StyleSheet, Text, View } from 'react-native'

export default function Inicial({ navigation }) {
    return (
        <View style={estilos.container}>
            <View style={estilos.introducao}>
                <Text style={estilos.titulo}>React Native</Text>
                <Text style={estilos.subtitulo}>Autenticação com Firebase</Text>
            </View>
            <View style={estilos.botoes}>
                <Button title='Entre' color="green" onPress={() => navigation.navigate("Login")} />
                <Button title='Cadastre-se' color="blue" onPress={() => navigation.navigate("Cadastro")} />
            </View>

        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    introducao: {
        backgroundColor: "#4A235A",
        width: "100%",
        padding: 8,
        borderRadius: 4
    },
    titulo: {
        textAlign: "center",
        fontSize: 32,
        color: "white",
    },
    subtitulo: {
        textAlign: "center",
        color: "white"
    },
    botoes: {
        marginVertical: 8,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})