import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { Heart, Send } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

interface Comment {
    id: string;
    username: string;
    text: string;
    likes: number;
    isLiked?: boolean;
}

interface CommentSheetProps {
    isVisible: boolean;
    onClose: () => void;
    videoId: string;
}

export function CommentSheet({ isVisible, onClose, videoId }: CommentSheetProps) {
    const insets = useSafeAreaInsets();
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            username: 'sarah_dance',
            text: 'This is amazing! 🔥',
            likes: 234,
        },
        {
            id: '2',
            username: 'dance_lover',
            text: 'Great moves! Keep it up 👏',
            likes: 156,
        },
        {
            id: '3',
            username: 'pro_dancer',
            text: 'The transition at 0:15 is everything ✨',
            likes: 89,
        },
    ]);

    const handleLikeComment = (commentId: string) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? {
                        ...comment,
                        likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                        isLiked: !comment.isLiked,
                    }
                    : comment
            )
        );
    };

    const handlePostComment = () => {
        if (newComment.trim()) {
            const newCommentObj: Comment = {
                id: Date.now().toString(),
                username: 'user123',
                text: newComment.trim(),
                likes: 0,
                isLiked: false,
            };
            setComments(prev => [newCommentObj, ...prev]);
            setNewComment('');
        }
    };

    if (!isVisible) return null;

    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
            style={[styles.container, { paddingBottom: insets.bottom }]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Comments</Text>
                <TouchableOpacity onPress={onClose} hitSlop={20}>
                    <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
            </View>

            <FlashList
                data={comments}
                estimatedItemSize={80}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <View style={styles.commentContent}>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.commentText}>{item.text}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleLikeComment(item.id)}
                            style={styles.likeButton}
                            hitSlop={20}
                        >
                            <Heart
                                size={16}
                                color={item.isLiked ? '#FF4365' : '#666'}
                                fill={item.isLiked ? '#FF4365' : 'none'}
                            />
                            <Text style={[
                                styles.likeCount,
                                item.isLiked && styles.likedText
                            ]}>
                                {item.likes}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        placeholderTextColor="#666"
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                        maxLength={200}
                    />
                    <TouchableOpacity
                        onPress={handlePostComment}
                        disabled={!newComment.trim()}
                        hitSlop={20}
                    >
                        <Send
                            size={24}
                            color={newComment.trim() ? '#007AFF' : '#666'}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '60%',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#333',
    },
    title: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        color: '#FFF',
        fontSize: 20,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#333',
    },
    commentContent: {
        flex: 1,
        marginRight: 10,
    },
    username: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    commentText: {
        color: '#FFF',
        fontSize: 14,
        lineHeight: 20,
    },
    likeButton: {
        alignItems: 'center',
        paddingLeft: 10,
    },
    likeCount: {
        color: '#666',
        fontSize: 12,
        marginTop: 4,
    },
    likedText: {
        color: '#FF4365',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#333',
        backgroundColor: '#000',
    },
    input: {
        flex: 1,
        marginRight: 12,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1A1A1A',
        color: '#FFF',
        fontSize: 14,
        maxHeight: 100,
    },
});
