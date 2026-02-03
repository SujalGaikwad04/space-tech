import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { blogData } from '../components/learn/blogData'; 
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blogs, addComment, getBlogComments, toggleLike, getBlogLikes, getUserVote } = useBlog();
    const { user, isAuthenticated } = useAuth();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [commentError, setCommentError] = useState("");

    // Get live data
    const comments = post ? getBlogComments(post.id) : [];
    const likesData = post ? getBlogLikes(post.id) : { likeCount: 0, dislikeCount: 0 };
    const userVote = post && user ? getUserVote(post.id, user.username) : null;

    useEffect(() => {
        if (blogs.length > 0) {
            const foundPost = blogs.find(p => p.id === parseInt(id));
            if (foundPost) {
                setPost(foundPost);
                window.scrollTo(0, 0);
            }
        }
    }, [id, blogs]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setCommentError("Please login to comment.");
            return;
        }
        if (!newComment.trim()) return;

        addComment(post.id, {
            author: user.username || user.fullName || "Anonymous",
            text: newComment
        });
        setNewComment("");
        setCommentError("");
    };

    const handleLike = () => {
        if (!isAuthenticated) {
            setCommentError("Please login to vote.");
            return;
        }
        toggleLike(post.id, 'like', user.username);
    };
    const handleDislike = () => {
        if (!isAuthenticated) {
            setCommentError("Please login to vote.");
            return;
        }
        toggleLike(post.id, 'dislike', user.username);
    };

    if (!post) {
        return (
            <div className="blog-post-page">
                <div className="not-found">
                    <p>Blog post not found.</p>
                    <button className="back-btn" onClick={() => navigate('/learn')}>Go Back to Learn</button>
                </div>
            </div>
        );
    }

    return (
        <div className="blog-post-page">
            <div className="blog-container">
                <img src={`/${post.image}`} alt={post.title} className="blog-header-image" onError={(e) => e.target.style.display = 'none'} />

                <div className="blog-content-wrapper">
                    <header className="blog-meta-header">
                        <span className="blog-category">{post.category}</span>
                        <span className="blog-date">{post.date}</span>
                        <h1 className="blog-title">{post.title}</h1>
                    </header>

                    <article className="blog-body" dangerouslySetInnerHTML={{ __html: post.content }}>
                    </article>

                    <div className="blog-interactions">
                        <div className="vote-buttons">
                            <button
                                onClick={handleLike}
                                className={`vote-btn like-btn ${userVote === 'like' ? 'active' : ''}`}
                            >
                                <span className="icon">👍</span> {likesData.likeCount}
                            </button>
                            <button
                                onClick={handleDislike}
                                className={`vote-btn dislike-btn ${userVote === 'dislike' ? 'active' : ''}`}
                            >
                                <span className="icon">👎</span> {likesData.dislikeCount}
                            </button>
                        </div>
                    </div>

                    <div className="comments-section">
                        <h3>Comments ({comments.length})</h3>

                        <div className="comments-list">
                            {comments.length === 0 ? (
                                <p className="no-comments">No comments yet. Be the first!</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id} className="comment-card">
                                        <div className="comment-header">
                                            <span className="comment-author">{comment.author}</span>
                                            <span className="comment-date">{comment.date}</span>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <h4>Leave a Reply</h4>
                            {commentError && <p className="error-text">{commentError}</p>}
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={isAuthenticated ? "Share your thoughts..." : "Please login to comment"}
                                disabled={!isAuthenticated}
                                rows="3"
                            />
                            <button type="submit" disabled={!isAuthenticated || !newComment.trim()}>
                                Post Comment
                            </button>
                        </form>
                    </div>

                    <div className="back-btn-container">
                        <button className="back-btn" onClick={() => navigate('/learn')}>
                            ← Back to Learn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
