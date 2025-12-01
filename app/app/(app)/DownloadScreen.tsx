import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { YTResult } from '../types';
import { formatViews } from '../utils/helpers';

interface Props {
    video: YTResult;
    onBack: () => void;
    onAddToQueue: (video: YTResult, format: string) => void;
}

export const DownloadScreen = ({ video, onBack, onAddToQueue }: Props) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.preview}>
                    <Image source={{ uri: video.thumbnail }} style={styles.image} />
                    <View style={styles.info}>
                        <Text style={styles.title}>{video.title}</Text>
                        <Text style={styles.channel}>{video.author?.name}</Text>
                        <Text style={styles.meta}>
                            {formatViews(video.views)} visualizações • {video.duration?.timestamp}
                        </Text>
                    </View>
                </View>

                <View style={styles.options}>
                    <DownloadOption
                        title="Vídeo MP4"
                        desc="Vídeo com áudio"
                        color="#2563eb"
                        icon="videocam"
                        onPress={() => onAddToQueue(video, 'mp4')}
                    />
                    <DownloadOption
                        title="Áudio MP3"
                        desc="Apenas áudio"
                        color="#059669"
                        icon="musical-notes"
                        onPress={() => onAddToQueue(video, 'mp3')}
                    />
                    <DownloadOption
                        title="Capa"
                        desc="Imagem PNG"
                        color="#9333ea"
                        icon="image"
                        onPress={() => onAddToQueue(video, 'thumbnail')}
                    />
                </View>
            </ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Opções de Download</Text>
            </View>
        </View>
    );
};

const DownloadOption = ({ title, desc, color, icon, onPress }: any) => (
    <View style={styles.card}>
        <View style={[styles.circle, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon} size={36} color={color} />
        </View>
        <Text style={styles.optTitle}>{title}</Text>
        <Text style={styles.optDesc}>{desc}</Text>
        <TouchableOpacity style={[styles.btn, { backgroundColor: color }]} onPress={onPress}>
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text style={styles.btnText}>Adicionar à Fila</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    header: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        zIndex: 2,
        position: 'fixed'
    },
    backButton: { padding: 8 },
    headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 16 },
    content: { padding: 16 },
    preview: { backgroundColor: 'white', borderRadius: 12, marginBottom: 24, overflow: 'hidden' },
    image: { width: '100%', height: 200 },
    info: { padding: 16 },
    title: { fontSize: 18, fontWeight: 'bold' },
    channel: { color: '#6b7280', marginVertical: 4 },
    meta: { fontSize: 12, color: '#9ca3af' },
    options: { gap: 16, paddingBottom: 40 },
    card: { backgroundColor: 'white', padding: 24, borderRadius: 12, alignItems: 'center' },
    circle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    optTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
    optDesc: { color: '#6b7280', marginBottom: 16 },
    btn: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, gap: 8 },
    btnText: { color: 'white', fontWeight: '600' }
});