import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function HomePage({ navigation }) {
    const [hasPermision, setHasPermision] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            
            setHasPermision(status === 'granted');
        })();

        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            
            setHasPermision(status === 'granted');
        })();
    }, []);

    if(hasPermision == null) {
        return <View />;
    }

    if(!hasPermision) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={givePermission}
                    style={[styles.button, { width: '60%' }]}
                >
                    <Text style={styles.txtButton}>Press to give permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    async function givePermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if(status === 'granted') {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasPermision(status === 'granted');
        }
    }

    function accessCamera() {
        navigation.navigate('Camera');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Press the button below to access the camera</Text>
            <TouchableOpacity
                onPress={accessCamera}
                style={styles.button}
            >
                <Text style={styles.txtButton}>Press here</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16
    },
    button: {
        marginTop: 20,
        padding: 15,
        width: '40%',
        backgroundColor: '#009688',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton: {
        fontSize: 16,
        color: '#fff'
    }
});