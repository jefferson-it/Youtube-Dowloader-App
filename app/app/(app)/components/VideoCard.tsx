import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { YTResult } from '../../types';
import { formatViews } from '../../utils/helpers';

interface Props {
    item: YTResult;
    width: number;
    margin: number;
    onPress: (video: YTResult) => void;
}

export const VideoCard = ({ item, width, margin, onPress }: Props) => (
    <TouchableOpacity
        style={[styles.videoCard, { width, margin }]}
        onPress={() => onPress(item)}
    >
        <View style={styles.thumbnailContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{item?.duration?.timestamp}</Text>
            </View>
        </View>

        <View style={styles.videoInfo}>
            <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.videoChannel} numberOfLines={1}>{item.author?.name}</Text>
            <Text style={styles.videoViews}>{formatViews(item.views)} views</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    videoCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    thumbnailContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e5e7eb',
    },
    durationBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
    },
    durationText: {
        color: 'white',
        fontSize: 11,
        fontWeight: '600',
    },
    videoInfo: {
        padding: 10,
    },
    videoTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#111827',
    },
    videoChannel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 2,
    },
    videoViews: {
        fontSize: 11,
        color: '#9ca3af',
    },
});