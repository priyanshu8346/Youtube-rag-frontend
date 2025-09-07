import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  InputAdornment,
  Fade,
  Slide,
  alpha,
  AppBar,
  Toolbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useTheme, styled } from '@mui/material/styles';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/";

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0a0a1a 100%)'
    : 'linear-gradient(135deg, #3949ab 0%, #7986cb 50%, #e3f2fd 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    zIndex: 0,
  },
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap:theme.spacing(2),
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.grey[900], 0.5) // Dark mode background
    : alpha(theme.palette.background.default, 0.7), // Light mode background
  backdropFilter: 'blur(10px)',
}));

const MessageBubble = styled(Box)(({ theme, isuser }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  borderRadius: 18,
  borderBottomLeftRadius: isuser ? 18 : 4,
  borderBottomRightRadius: isuser ? 4 : 18,
  background: isuser
    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
    : theme.palette.mode === 'dark' 
      ? alpha(theme.palette.grey[800], 0.8) // Dark mode background
      : alpha(theme.palette.grey[100], 0.9), // Light mode background
  color: isuser 
    ? '#fff' 
    : theme.palette.mode === 'dark' 
      ? theme.palette.grey[100] // Dark mode text color
      : theme.palette.text.primary, // Light mode text color
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  alignSelf: isuser ? 'flex-end' : 'flex-start',
  marginLeft: isuser ? 'auto' : 'none',
  marginRight: isuser ? 'none' : 'auto',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.grey[900], 0.7) // Dark mode background
    : alpha(theme.palette.background.paper, 0.8), // Light mode background
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid ${theme.palette.mode === 'dark'
    ? alpha(theme.palette.grey[700], 0.3) // Dark mode border
    : alpha(theme.palette.divider, 0.2)}`, // Light mode border
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.grey[800], 0.6) // Dark mode background
    : alpha(theme.palette.background.paper, 0.9), // Light mode background
  borderRadius: 25,
  '& .MuiOutlinedInput-root': {
    borderRadius: 25,
    paddingRight: theme.spacing(1),
    color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : 'inherit', // Text color
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.grey[600], 0.3) // Dark mode border
        : 'rgba(0, 0, 0, 0.23)', // Light mode border
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.grey[500], 0.5) // Dark mode hover border
        : 'rgba(0, 0, 0, 0.87)', // Light mode hover border
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // Focus border
    },
  },
}));

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your YouTube assistant. Paste a YouTube URL to get started!", time: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, videoLoading, botTyping]);

  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^&#]+)/);
    return match ? match[1] : null;
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "bot", text, time: new Date() }]);
  };

  const loadTranscript = async () => {
    const id = extractVideoId(videoUrl);
    if (!id) {
      addBotMessage("❌ Invalid YouTube URL. Please paste a correct link.");
      setVideoId(null);
      return;
    }

    setVideoId(id);
    setVideoLoading(true);
    addBotMessage("⏳ Loading video transcript... Please wait.");

    try {
      const res = await axios.post(`${BACKEND_URL}/load_video`, { video_id: id });
      console.log(res.data);
      addBotMessage(`✅ Transcript loaded! You can now ask questions about this video.`);
    } catch (err) {
      console.error(err);
      addBotMessage("❌ Failed to load transcript. Make sure the video has subtitles.");
      setVideoId(null);
    } finally {
      setVideoLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !videoId) return;

    const userMessage = { sender: "user", text: input, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setBotTyping(true);

    try {
      setTimeout(async () => {
        const response = await axios.post(`${BACKEND_URL}/chat`, { query: userMessage.text });
        addBotMessage(response.data.answer || "⚠️ No response from server");
        setBotTyping(false);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      addBotMessage("❌ Failed to fetch response.");
      setBotTyping(false);
      setLoading(false);
    }
  };

  const renderMessage = (msg, i) => {
    const isUser = msg.sender === "user";
    const timeString = msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
      <Slide 
        key={i} 
        direction={isUser ? "left" : "right"} 
        in={true}
        timeout={500}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isUser ? "row-reverse" : "row",
            alignItems: "flex-end",
            gap: 1,
            width: "100%",
            my: 0.5,
          }}
        >
          <Avatar sx={{ 
            bgcolor: isUser ? theme.palette.primary.main : theme.palette.secondary.main, 
            width: 36, 
            height: 36,
            boxShadow: theme.shadows[2],
          }}>
            {isUser ? <PersonIcon /> : <SmartToyIcon />}
          </Avatar>
          <MessageBubble isuser={isUser}>
            <Typography variant="body1" sx={{ fontSize: 15, lineHeight: 1.4 }}>
              {msg.text}
            </Typography>
            <Typography variant="caption" sx={{ 
              display: "block", 
              textAlign: "right", 
              fontSize: 10, 
              mt: 0.5, 
              opacity: 0.7,
            }}>
              {timeString}
            </Typography>
          </MessageBubble>
        </Box>
      </Slide>
    );
  };

  return (
    <ChatContainer>
      <Fade in={true} timeout={800}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', zIndex: 1 }}>
          {/* Header */}
                  <AppBar position="static" sx={{ 
          background: theme.palette.mode === 'dark'
            ? alpha(theme.palette.grey[900], 0.7) // Dark mode background
            : 'transparent', 
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.mode === 'dark'
            ? alpha(theme.palette.grey[700], 0.3) // Dark mode border
            : alpha(theme.palette.divider, 0.2)}`, // Light mode border
        }}>
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <SmartToyIcon sx={{ fontSize: 32, color: theme.palette.secondary.main, mr: 1.5 }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 700,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)'
                    : 'linear-gradient(45deg, #3949ab 30%, #7986cb 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  YouTube Video Assistant
                </Typography>
              </Box>
              
              {videoId && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  background: alpha(theme.palette.success.main, 0.2),
                  padding: theme.spacing(0.5, 1.5),
                  borderRadius: 4,
                  color: theme.palette.success.main,
                }}>
                  <VideoLibraryIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Video Loaded
                  </Typography>
                </Box>
              )}
            </Toolbar>
          </AppBar>

          {/* URL Input */}
          {!videoId && (
            <Box sx={{ 
              p: 3, 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'center',
              background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.grey[900], 0.6) // Dark mode background
                : alpha(theme.palette.background.paper, 0.7), // Light mode background
              backdropFilter: 'blur(10px)',
              borderBottom: `1px solid ${theme.palette.mode === 'dark'
                ? alpha(theme.palette.grey[700], 0.3) // Dark mode border
                : alpha(theme.palette.divider, 0.2)}`, // Light mode border
            }}>
              <StyledTextField
                placeholder="Paste YouTube video URL here..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '50%', minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VideoLibraryIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={loadTranscript}
                disabled={videoLoading}
                sx={{ 
                  borderRadius: 25, 
                  px: 3,
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                }}
              >
                {videoLoading ? <CircularProgress size={22} color="inherit" /> : "Load Video"}
              </Button>
            </Box>
          )}

          {/* Messages */}
          <MessageContainer>
            {messages.map(renderMessage)}
            
            {botTyping && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: theme.palette.secondary.main, 
                  width: 36, 
                  height: 36,
                  boxShadow: theme.shadows[2],
                }}>
                  <SmartToyIcon />
                </Avatar>
                <MessageBubble isuser={false}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    Typing...
                  </Typography>
                </MessageBubble>
              </Box>
            )}
            
            <div ref={chatEndRef} />
          </MessageContainer>

          {/* Input area */}
          <InputContainer>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', maxWidth: 800, mx: 'auto' }}>
              <StyledTextField
                fullWidth
                placeholder={videoId ? 'Ask anything about this video...' : 'Load a video first to ask questions'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={!videoId || loading}
                variant="outlined"
                size="small"
              />
              <IconButton
              onClick={sendMessage}
              disabled={!videoId || !input.trim() || loading}
              sx={{ 
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`
                  : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                width: 48,
                height: 48,
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.9)} 100%)`
                    : `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                },
                '&.Mui-disabled': {
                  background: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.grey[700], 0.5)
                    : theme.palette.grey[300],
                  color: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.grey[500], 0.5)
                    : theme.palette.grey[500],
                }
              }}
            >
              {loading ? (
                <CircularProgress 
                  size={22} 
                  sx={{ 
                    color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : 'white' 
                  }} 
                />
              ) : (
                <SendIcon sx={{ color: 'white' }} />
              )}
            </IconButton>
            </Box>
          </InputContainer>
        </Box>
      </Fade>
    </ChatContainer>
  );
};

export default Chat;