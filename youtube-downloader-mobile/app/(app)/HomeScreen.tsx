import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView, Platform,
    SafeAreaView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

interface Props {
    searchQuery: string;
    setSearchQuery: (t: string) => void;
    handleSearch: () => void;
    isLoading: boolean;
}

export const HomeScreen = ({ searchQuery, setSearchQuery, handleSearch, isLoading }: Props) => {
    return (
        <LinearGradient colors={['#dc2626', '#991b1b']} style={styles.gradient}>
            <SafeAreaView style={styles.safeArea}>
                {/* CORREÇÃO AQUI: KeyboardAvoidingView para subir o input */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.content}>
                            <View style={styles.logoContainer}>
                                <Ionicons name="logo-youtube" size={48} color="#dc2626" />
                            </View>
                            <Text style={styles.appTitle}>YT Downloader</Text>
                            <Text style={styles.appSubtitle}>
                                Baixe seus vídeos favoritos facilmente
                            </Text>

                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Cole o link ou pesquise..."
                                    placeholderTextColor="#9ca3af"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    onSubmitEditing={handleSearch}
                                />
                                <TouchableOpacity
                                    style={styles.searchButton}
                                    onPress={handleSearch}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Ionicons name="search" size={24} color="white" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        backgroundColor: 'white',
        borderRadius: 48,
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        elevation: 8,
    },
    appTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    appSubtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 48,
    },
    searchContainer: {
        width: '100%',
        maxWidth: 500,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        maxWidth: 500,
        minWidth: 250,
        backgroundColor: 'white',
        borderRadius: 50,
        paddingVertical: 16,
        paddingHorizontal: 24,
        paddingRight: 60,
        fontSize: 16,
        elevation: 5,
    },
    searchButton: {
        position: 'absolute',
        right: 50,
        backgroundColor: '#dc2626',
        borderRadius: 50,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
});