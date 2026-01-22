import * as Network from "expo-network";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

interface IWebMainProps {
    navigation?: any;
}

const WebViewMain = ({ navigation }: IWebMainProps) => {
    const [isConnected, setIsConnected] = useState<any>(null);

    useEffect(() => {
        const checkConnection = async () => {
            const status = await Network.getNetworkStateAsync();
            setIsConnected(status.isInternetReachable);
        };

        checkConnection();

        const interval = setInterval(checkConnection, 5000);
        return () => clearInterval(interval);
    }, []);

    if (isConnected === null) {
        return (
            <ActivityIndicator/>
        )
    }

    if (!isConnected) {
        return (
            <View style={styles.centered}>
                <Text style={styles.offlineText}>You're offline</Text>
                <Text style={{ alignSelf: "center" }}>
                    Please connect to the internet to view the content
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: "https://skcify.netlify.app" }}
                startInLoadingState={true}
                style={styles.webview}
            />
        </View>
    );
};

export default WebViewMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    webview: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    offlineText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "red",
    },
});