import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QueueItem } from '../types';

interface Props {
    queue: QueueItem[];
    onShare: (uri: string) => void;
    onClear: () => void;
    defMin?: boolean
}

export const DownloadQueueList = ({ queue, defMin = false, onShare, onClear }: Props) => {
    const [minimize, setMinimize] = useState(defMin);

    if (queue.length === 0) return null;

    if (minimize) return (
        <TouchableOpacity onPress={() => setMinimize(false)} style={styles.btnList}>
            <FontAwesome name="th-list" size={24} color="black" />
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Downloads ({queue.length})</Text>
                <TouchableOpacity onPress={onClear}>
                    <Text style={styles.clearText}>Limpar Concluídos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMinimize(true)}>
                    <Text style={styles.clearText}>Minimizar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={queue}
                keyExtractor={(item, ind) => item.video.videoId + ind}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.statusIcon}>
                            {item.status === 'downloading' && <ActivityIndicator color="#dc2626" size="small" />}
                            {item.status === 'completed' && <Ionicons name="checkmark-circle" size={24} color="#059669" />}
                            {item.status === 'error' && <Ionicons name="alert-circle" size={24} color="#dc2626" />}
                        </View>
                        <Text style={styles.itemTitle} numberOfLines={1}>{item.video.title}</Text>
                        <Text style={styles.itemFormat}>{item.format.toUpperCase()}</Text>

                        {item.status === 'completed' && item.localUri && (
                            <TouchableOpacity style={styles.shareButton} onPress={() => onShare(item.localUri!)}>
                                <Ionicons name="share-social" size={16} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    btnList: {
        position: 'fixed',
        zIndex: 1,
        bottom: 105,
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        color: '#000'
    },
    container: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
        maxHeight: 200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    clearText: {
        fontSize: 12,
        color: '#6b7280',
    },
    card: {
        width: 140,
        backgroundColor: '#f3f4f6',
        padding: 10,
        borderRadius: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIcon: {
        marginBottom: 4,
        height: 24,
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 2,
        textAlign: 'center',
    },
    itemFormat: {
        fontSize: 10,
        color: '#6b7280',
        marginBottom: 4,
    },
    shareButton: {
        backgroundColor: '#2563eb',
        padding: 6,
        borderRadius: 50,
        marginTop: 4,
    }
});