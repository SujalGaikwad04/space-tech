import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBlogById } = useBlog();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = getBlogById(id);
        if (foundPost) {
            setPost(foundPost);
            window.scrollTo(0, 0); // Scroll to top on load
        }
    }, [id, getBlogById]);

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
