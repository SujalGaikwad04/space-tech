import React, { createContext, useState, useContext, useEffect } from 'react';
import { blogData as initialBlogData } from '../components/learn/blogData';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    // Comments: object with blogId as key, array of comments as value
    const [comments, setComments] = useState({});
    // Likes: object with blogId as key, object with {likeCount, dislikeCount} as value
    const [likes, setLikes] = useState({});

    useEffect(() => {
        // Initialize blogs
        setBlogs(initialBlogData);
    }, []);

    const addBlog = (newBlog) => {
        const blogWithId = {
            ...newBlog,
            id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
            date: new Date().toLocaleDateString('en-GB'), // Format: DD/MM/YYYY
            likes: 0,
            image: newBlog.image || 'default-space.jpg' // Fallback image
        };
        setBlogs([blogWithId, ...blogs]);
    };

    const addComment = (blogId, comment) => {
        setComments(prev => {
            const blogComments = prev[blogId] || [];
            return {
                ...prev,
                [blogId]: [...blogComments, {
                    id: Date.now(),
                    date: new Date().toLocaleDateString('en-GB'),
                    ...comment
                }]
            };
        });
    };

    const getBlogComments = (blogId) => {
        return comments[blogId] || [];
    };

    const toggleLike = (blogId, type) => {
        setLikes(prev => {
            const currentLikes = prev[blogId] || { likeCount: 0, dislikeCount: 0 };
            if (type === 'like') {
                return {
                    ...prev,
                    [blogId]: { ...currentLikes, likeCount: currentLikes.likeCount + 1 }
                };
            } else if (type === 'dislike') {
                return {
                    ...prev,
                    [blogId]: { ...currentLikes, dislikeCount: currentLikes.dislikeCount + 1 }
                };
            }
            return prev;
        });
    };

    const getBlogLikes = (blogId) => {
        return likes[blogId] || { likeCount: 0, dislikeCount: 0 };
    };

    const value = {
        blogs,
        addBlog,
        addComment,
        getBlogComments,
        toggleLike,
        getBlogLikes
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};
