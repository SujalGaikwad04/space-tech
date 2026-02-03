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

    // Track user votes: { [blogId]: { [username]: 'like' | 'dislike' } }
    const [userVotes, setUserVotes] = useState({});

    const addBlog = (newBlog) => {
        const blogWithId = {
            ...newBlog,
            id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
            date: new Date().toLocaleDateString('en-GB'),
            likes: 0,
            image: newBlog.image || 'default-space.jpg'
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

    const toggleLike = (blogId, type, username) => {
        if (!username) return;

        setUserVotes(prevVotes => {
            const blogVotes = prevVotes[blogId] || {};
            const currentVote = blogVotes[username];

            let newVote = type;
            if (currentVote === type) {
                // Clicking same button again removes the vote
                newVote = null;
            }

            const newBlogVotes = { ...blogVotes, [username]: newVote };

            // Recalculate counts based on all votes for this blog
            const allUsernames = Object.keys(newBlogVotes);
            const likeCount = allUsernames.filter(u => newBlogVotes[u] === 'like').length;
            const dislikeCount = allUsernames.filter(u => newBlogVotes[u] === 'dislike').length;

            setLikes(prevLikes => ({
                ...prevLikes,
                [blogId]: { likeCount, dislikeCount }
            }));

            return {
                ...prevVotes,
                [blogId]: newBlogVotes
            };
        });
    };

    const getUserVote = (blogId, username) => {
        if (!username || !userVotes[blogId]) return null;
        return userVotes[blogId][username] || null;
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
        getBlogLikes,
        getUserVote
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};
