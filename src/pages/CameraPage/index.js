import React, { useRef, useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from "expo-camera";

export default function CameraPage({ navigation }) {
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedPhoto, setCapturedPhoto] = useState('');
    const [open, setOpen] = useState(false);

    async function takePicture() {
        if(camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
        }
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={camRef}
                type={type}
                style={{ flex: 1 }}
            >
                <View
                    style={styles.backButton}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-outline" size={30} />
                    </TouchableOpacity>
                </View>
                <View style={styles.areaButtons}>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={styles.capture}
                    >
                        <Ionicons name="camera-outline" size={30} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                        style={styles.repeat}
                    >
                        <Ionicons name="repeat-outline" size={30} color='#fff' />
                    </TouchableOpacity>
                </View>
            </Camera>
            { capturedPhoto &&
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={open}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <Image
                            style={{ width: '100%', height: '90%', borderRadius: 20 }}
                            source={{ uri: capturedPhoto }}
                        />
                        <TouchableOpacity
                            onPress={() => setOpen(false)}
                            style={styles.close}
                        >
                            <Ionicons name="close-outline" size={30} color='#fff' />
                        </TouchableOpacity>
                    </View>
                </Modal>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    backButton: {
        position: 'absolute',
        padding: 10,
        top: 40,
        left: 10,
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    areaButtons: {
        flexDirection: 'row',
        position: 'absolute',
        width: '100%',
        height: '12%',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    capture: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        width: '50%',
        backgroundColor: '#000',
        marginRight: 40
    },
    repeat: {
        padding: 15,
        borderRadius: 50,
        backgroundColor: '#000'
    },
    close: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#000',
        marginTop: 20
    }
});