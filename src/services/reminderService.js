const API_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return `Bearer ${token}`;
    }
    return null;
};

// Add event reminder
export const addEventReminder = async (eventData) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('User not authenticated');
    }

    try {
        const response = await fetch(`${API_URL}/reminders/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to add reminder');
        }

        return data;
    } catch (error) {
        console.error('Error adding reminder:', error);
        throw error;
    }
};

// Get all user reminders
export const getUserReminders = async () => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('User not authenticated');
    }

    try {
        const response = await fetch(`${API_URL}/reminders`, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch reminders');
        }

        return data.reminders;
    } catch (error) {
        console.error('Error fetching reminders:', error);
        throw error;
    }
};

// Remove event reminder
export const removeEventReminder = async (reminderId) => {
    const token = getAuthToken();

    if (!token) {
        throw new Error('User not authenticated');
    }

    try {
        const response = await fetch(`${API_URL}/reminders/${reminderId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove reminder');
        }

        return data;
    } catch (error) {
        console.error('Error removing reminder:', error);
        throw error;
    }
};

// Check if user has reminder for specific event
export const checkEventReminder = async (eventTitle, eventDate) => {
    const token = getAuthToken();

    if (!token) {
        return { hasReminder: false };
    }

    try {
        const response = await fetch(`${API_URL}/reminders/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ eventTitle, eventDate })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to check reminder');
        }

        return data;
    } catch (error) {
        console.error('Error checking reminder:', error);
        return { hasReminder: false };
    }
};
