import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/Home/ParticleBackground';
import './CreateBlog.css'; // Will create this css file as well for basic styling

const CreateBlog = () => {
    const navigate = useNavigate();
    const { addBlog } = useBlog();
    const { user, isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        category: 'Mission Updates',
        description: '',
        content: '',
        image: '' // URL or placeholder
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.description || !formData.content) {
            setError('Please fill in all required fields.');
            return;
        }

        const newBlog = {
            ...formData,
            authName: isAuthenticated ? (user.username || user.fullName) : 'Anonymous',
            // Simple content wrapping if not HTML
            content: formData.content.startsWith('<') ? formData.content : `<p>${formData.content}</p>`
        };

        addBlog(newBlog);
        navigate('/learn');
    };

    return (
        <div className="create-blog-page">
            <ParticleBackground />
            <div className="create-blog-container">
                <h1>Write a New Blog Post</h1>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="create-blog-form">
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a catchy title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Mission Updates">Mission Updates</option>
                            <option value="Space Facts">Space Facts</option>
                            <option value="Technology">Technology</option>
                            <option value="Science">Science</option>
                            <option value="Cosmology">Cosmology</option>
                            <option value="Community">Community</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL (Optional)</label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="e.g., https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Short Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="2"
                            placeholder="A brief summary of your post"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content * (HTML supported)</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="10"
                            placeholder="Write your article here..."
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate('/learn')}>Cancel</button>
                        <button type="submit" className="submit-btn" disabled={!formData.title || !formData.description || !formData.content}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
