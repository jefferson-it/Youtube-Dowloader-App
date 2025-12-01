import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Imports Modulares
import { YTResult } from '../types';
import { API_URL, getNumColumns } from '../utils/helpers';
import { DownloadQueueList } from './DownloadQueueList';
import { DownloadScreen } from './DownloadScreen';
import { HomeScreen } from './HomeScreen';
import { VideoCard } from './components/VideoCard';
import { useDownloader } from './components/useDownloader';

// Pequeno style local para a ResultsScreen que não foi separada totalmente para economizar espaço
const CONTAINER_PADDING = 16;
const CARD_MARGIN = 8;

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<'home' | 'results' | 'download'>('home');

  // Data State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<YTResult[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YTResult | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Custom Hook para Lista de Espera
  const { queue, addToQueue, shareFile, clearCompleted } = useDownloader();

  // --- Actions ---
  async function searchFromApi(page = 0) {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_URL}/api/yt?q=${encodeURIComponent(searchQuery)}&p=${page}`
      );
      const arr = Array.isArray(res.data) ? res.data : res.data.all;
      setSearchResults(arr || []);
      setCurrentPage(page);
      if (currentScreen === 'home') setCurrentScreen('results');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar vídeos');
    } finally {
      setIsLoading(false);
    }
  }

  const handleVideoSelect = (video: YTResult) => {
    setSelectedVideo(video);
    setCurrentScreen('download');
  };

  const handleAddToQueue = (video: YTResult, format: string) => {
    addToQueue(video, format);
    Alert.alert('Sucesso', 'Adicionado à lista de downloads!');
    setCurrentScreen('results'); // Volta para resultados ou fica na tela? Optei por voltar
  };

  // --- Renders ---

  // Renderiza Resultados (Pode ser movido para src/screens/ResultsScreen.tsx)
  const renderResults = () => {
    const { width } = Dimensions.get('window');
    const numColumns = getNumColumns();
    const cardWidth = (width - (CONTAINER_PADDING * 2) - (CARD_MARGIN * (numColumns + 1))) / numColumns;

    return (
      <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>

        {isLoading ? (
          <ActivityIndicator size="large" color="#dc2626" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item, idx) => `${item.videoId}-${idx}`}
            numColumns={numColumns}
            key={numColumns} // Força re-render ao mudar colunas
            contentContainerStyle={{ padding: CONTAINER_PADDING }}
            renderItem={({ item }) => (
              <VideoCard
                item={item}
                width={cardWidth}
                margin={CARD_MARGIN}
                onPress={handleVideoSelect}
              />
            )}
            ListFooterComponent={() => (
              <View style={styles.pagination}>
                <TouchableOpacity onPress={() => searchFromApi(currentPage - 1)} disabled={currentPage === 0}>
                  <Text style={{ color: currentPage === 0 ? '#ccc' : '#dc2626' }}>Anterior</Text>
                </TouchableOpacity>
                <Text>Pág {currentPage + 1}</Text>
                <TouchableOpacity onPress={() => searchFromApi(currentPage + 1)}>
                  <Text style={{ color: '#dc2626' }}>Próxima</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentScreen('home')} style={{ padding: 8 }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Resultados ({searchResults.length})</Text>
        </View>

      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      {currentScreen === 'home' && (
        <HomeScreen
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={() => searchFromApi(0)}
          isLoading={isLoading}
        />
      )}

      {currentScreen === 'results' && renderResults()}

      {currentScreen === 'download' && selectedVideo && (
        <DownloadScreen
          video={selectedVideo}
          onBack={() => setCurrentScreen('results')}
          onAddToQueue={handleAddToQueue}
        />
      )}

      {/* Lista de Espera Flutuante - Sempre visível se houver itens e não estiver na home (ou sempre, como preferir) */}
      (
      <DownloadQueueList
        defMin={currentScreen === 'home'}
        queue={queue}
        onShare={shareFile}
        onClear={clearCompleted}
      />
      )
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
    position: 'fixed',
    zIndex: 1
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 16 },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 }
});