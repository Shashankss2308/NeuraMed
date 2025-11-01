# Yuvaa Peer Support Chat Website

A modern, responsive peer support chat application designed to provide a safe space for people to connect, share experiences, and support each other.

## Features

### 🎨 Modern UI Design
- Clean, professional interface with gradient backgrounds
- Responsive design that works on desktop and mobile
- Smooth animations and transitions
- Accessible color scheme and typography

### 💬 Interactive Chat System
- Real-time chat interface with typing indicators
- Anonymous peer-to-peer messaging
- System messages and notifications
- Message timestamps and user avatars
- Auto-scrolling chat messages

### 🛡️ Peer Support Features
- Safe, anonymous chat environment
- Contextual peer responses based on message content
- Support for mental health topics (anxiety, depression, loneliness, stress)
- Community guidelines and safety tools
- 24/7 availability simulation

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layout for different screen sizes
- Touch-friendly interface
- Optimized for both desktop and mobile browsers

## File Structure

```
NeuraMate/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## How to Use

1. **Open the Website**: Simply open `index.html` in your web browser
2. **Start Chatting**: Click the "Start Chatting" button to open the chat interface
3. **Send Messages**: Type your message and press Enter or click the send button
4. **Receive Support**: Get contextual responses from simulated peer supporters
5. **Mobile Use**: The interface automatically adapts to mobile screens

## Key Features Explained

### Chat Interface
- **Floating Chat Window**: Opens as a modal overlay on the right side
- **Message Types**: User messages, peer responses, and system messages
- **Typing Indicators**: Shows when peers are "typing" a response
- **Auto-responses**: Intelligent peer responses based on message content

### Peer Support System
- **Contextual Responses**: Different responses for anxiety, depression, loneliness, etc.
- **Anonymous Avatars**: Users are represented by random letters (A, B, C, etc.)
- **Safe Environment**: Non-judgmental, supportive messaging
- **Community Feel**: Simulated online user count and activity

### Responsive Design
- **Desktop**: Full-featured interface with sidebar chat
- **Mobile**: Full-screen chat interface optimized for touch
- **Tablet**: Adaptive layout that works on medium screens

## Customization

### Colors and Branding
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #f59e0b;
    --background-color: #fafafa;
}
```

### Chat Responses
Modify the `getPeerResponses()` function in `script.js` to customize peer responses for different topics.

### Styling
All styles are contained in `styles.css` with clear section comments for easy modification.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Included

✅ Modern, responsive design
✅ Interactive chat interface
✅ Peer support messaging system
✅ Mobile-optimized layout
✅ Smooth animations and transitions
✅ Anonymous user system
✅ Typing indicators
✅ Message notifications
✅ Keyboard shortcuts (Ctrl+K to open chat, Escape to close)
✅ Auto-scrolling messages
✅ Contextual peer responses
✅ System messages and guidelines
✅ Online user count simulation
✅ Touch-friendly mobile interface

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Click "Start Chatting" to begin using the peer support chat
4. Customize colors, messages, and features as needed

## Support

This is a frontend-only implementation. For a production application, you would need to add:
- Backend server for real-time messaging
- User authentication system
- Database for message storage
- Moderation tools
- Real peer matching system

The current implementation simulates peer responses for demonstration purposes.
