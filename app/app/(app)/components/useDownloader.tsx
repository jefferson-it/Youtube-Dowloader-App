import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { Alert } from 'react-native';
import { QueueItem, YTResult } from '../../types';
import { API_URL, sanitizeFilename } from '../../utils/helpers';

export function useDownloader() {
    const [queue, setQueue] = useState<QueueItem[]>([]);

    const addToQueue = async (video: YTResult, format: string) => {
        const id = `${video.videoId}-${format}`;

        // Evita duplicados na fila ativa
        if (queue.find(q => q.id === id && q.status !== 'error')) {
            Alert.alert('Aviso', 'Este vídeo já está na fila de download.');
            return;
        }

        const newItem: QueueItem = {
            id,
            video,
            format,
            status: 'pending'
        };

        setQueue(prev => [newItem, ...prev]);
        processDownload(newItem);
    };

    const processDownload = async (item: QueueItem) => {
        try {
            updateStatus(item.id, 'downloading');

            const uri = `${API_URL}/api/yt/${item.format}?id=${item.video.videoId}`;
            const extension = item.format === 'thumbnail' ? 'png' : item.format;

            const fileName = `${sanitizeFilename(item.video.title.replace(/[^a-z0-9]/gi, '_'))}.${extension}`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            const downloadResult = await FileSystem.downloadAsync(uri, fileUri);

            if (downloadResult.status === 200) {
                updateStatus(item.id, 'completed', downloadResult.uri);
                // Opcional: Auto-share ao finalizar
                // shareFile(downloadResult.uri); 
            } else {
                throw new Error('Status code not 200');
            }
        } catch (error) {
            console.error(error);
            updateStatus(item.id, 'error');
        }
    };

    const updateStatus = (id: string, status: QueueItem['status'], localUri?: string) => {
        setQueue(prev => prev.map(item =>
            item.id === id ? { ...item, status, localUri } : item
        ));
    };

    const shareFile = async (uri: string) => {
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
        }
    };

    const clearCompleted = () => {
        setQueue(prev => prev.filter(item => item.status === 'downloading' || item.status === 'pending'));
    };

    return { queue, addToQueue, shareFile, clearCompleted };
}