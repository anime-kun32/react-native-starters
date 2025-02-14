import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Share2, MessageCircle } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { CommentSheet } from './CommentSheet';

const { width, height } = Dimensions.get('window');

interface VideoItemProps {
    videoUrl: string;
    username: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
}

const VideoItem = ({ videoUrl, username, description, likes, comments, shares }: VideoItemProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [localLikes, setLocalLikes] = useState(likes);
    const [showComments, setShowComments] = useState(false);

    const heartStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(isLiked ? 1.2 : 1)
                }
            ]
        };
    });

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <View style={styles.videoContainer}>
            <Video
                source={{ uri: videoUrl }}
                style={styles.video}
                resizeMode="cover"
                shouldPlay
                isLooping
                isMuted={false}
            />

            <View style={styles.overlay}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>@{username}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleLike} hitSlop={20}>
                        <Animated.View style={heartStyle}>
                            <Heart size={28} color={isLiked ? '#FF4365' : '#FFF'} fill={isLiked ? '#FF4365' : 'none'} />
                        </Animated.View>
                        <Text style={styles.actionText}>{localLikes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments(true)} hitSlop={20}>
                        <MessageCircle size={28} color="#FFF" />
                        <Text style={styles.actionText}>{comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} hitSlop={20}>
                        <Share2 size={28} color="#FFF" />
                        <Text style={styles.actionText}>{shares}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CommentSheet
                isVisible={showComments}
                onClose={() => setShowComments(false)}
                videoId={videoUrl}
            />
        </View>
    );
};

export function VideoFeed() {
    const mockVideos = [
        {
            videoUrl: 'https://videos.pexels.com/video-files/7722388/7722388-sd_360_640_25fps.mp4',
            username: 'dancepro',
            description: '✨ Living my best life! #dance #viral',
            likes: 1234,
            comments: 88,
            shares: 44
        },
        {
            videoUrl: 'https://videos.pexels.com/video-files/30641809/13114932_360_640_25fps.mp4',
            username: 'masterchef',
            description: '🍳 Quick and easy recipe! #cooking #food',
            likes: 2345,
            comments: 120,
            shares: 67
        },
        {
            videoUrl: 'https://videos.pexels.com/video-files/6707470/6707470-sd_360_640_25fps.mp4',
            username: 'yogalife',
            description: '🧘‍♀️ Morning routine #yoga #wellness',
            likes: 3456,
            comments: 156,
            shares: 89
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={mockVideos}
                renderItem={({ item }) => <VideoItem {...item} />}
                pagingEnabled
                snapToInterval={height - 49}
                snapToAlignment="start"
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoContainer: {
        width,
        height: height - 49,
        backgroundColor: '#000',
    },
    video: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    username: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    description: {
        color: '#FFF',
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    actions: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        color: '#FFF',
        fontSize: 12,
        marginTop: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    }
});
