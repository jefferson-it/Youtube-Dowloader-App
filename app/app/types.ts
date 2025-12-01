export interface YTResult {
    type: string;
    videoId: string;
    url: string;
    title: string;
    description: string;
    image: string;
    thumbnail: string;
    seconds: number;
    timestamp: string;
    duration?: {
        seconds: number;
        timestamp: string;
    };
    ago: string;
    views: number;
    author?: {
        name: string;
        url: string;
    };
}

export interface QueueItem {
    id: string; // videoId + format
    video: YTResult;
    format: string;
    status: 'pending' | 'downloading' | 'completed' | 'error';
    localUri?: string;
}