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
import * as MediaLibrary from 'expo-media-library';

export default function CameraPage({ navigation }) {
    const camRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedPhoto, setCapturedPhoto] = useState('');
    const [open, setOpen] = useState(false);
    const [photoSaved, setPhotoSaved] = useState(false);

    function toggleCameraType() {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    async function takePicture() {
        if(camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
        }
    }

    async function savePhoto() {
        const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
            .then(() => {
                alert('Photo saved successfully!');
                setPhotoSaved(true);
            })
            .catch(err => {
                console.log('error: '+err);
            });
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={camRef}
                type={type}
                style={{ flex: 1 }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back-outline" size={30} />
                </TouchableOpacity>
                <View style={styles.areaButtons}>
                    <TouchableOpacity
                        onPress={takePicture}
                        style={styles.capture}
                    >
                        <Ionicons name="camera-outline" size={30} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={toggleCameraType}
                        style={styles.repeat}
                    >
                        <Ionicons name="repeat-outline" size={24} color='#fff' />
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
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={savePhoto}
                                disabled={photoSaved}
                                style={[styles.buttonPhoto, {
                                    backgroundColor: photoSaved ? '#dfd' : '#dfdfdf',
                                }]}
                            >
                                <Ionicons name="download-outline" size={30} color={photoSaved ? '#fff' : '#000'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setOpen(false)}
                                style={[styles.buttonPhoto, { backgroundColor: '#ff0000' }]}
                            >
                                <Ionicons name="close-outline" size={30} color='#fff' />
                            </TouchableOpacity>
                        </View>
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
        width: '60%',
        backgroundColor: '#000',
        marginRight: 40
    },
    repeat: {
        padding: 15,
        borderRadius: 50,
        backgroundColor: '#000'
    },
    buttonPhoto: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        marginTop: 20,
        marginHorizontal: 10
    }
});