import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Fade,
  Slide,
  Zoom,
  alpha,
  useTheme,
} from '@mui/material';
import {
  SmartToy as SmartToyIcon,
  VideoLibrary as VideoLibraryIcon,
  QuestionAnswer as QuestionAnswerIcon,
  ArrowForward as ArrowForwardIcon,
  Chat as ChatIcon,
  AutoAwesome as AutoAwesomeIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8, 2),
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 30%, ${alpha(theme.palette.secondary.main, 0.8)} 100%)`,
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
  color: 'white',
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

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  transition: 'all 0.3s ease',
  background: alpha('#fff', 0.08),
  backdropFilter: 'blur(12px)',
  borderRadius: '20px',
  border: `1px solid ${alpha('#fff', 0.1)}`,
  color: 'white',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: alpha('#fff', 0.12),
    boxShadow: `0 15px 35px ${alpha(theme.palette.primary.dark, 0.3)}`,
  },
}));

const AnimatedIcon = styled(Box)(({ theme }) => ({
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
  borderRadius: '50%',
  width: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  boxShadow: `0 5px 15px ${alpha(theme.palette.secondary.main, 0.4)}`,
  animation: `${pulseAnimation} 2s infinite`,
  '&:hover': {
    boxShadow: `0 8px 25px ${alpha(theme.palette.secondary.main, 0.6)}`,
    transform: 'translateY(-2px)',
  },
}));

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <VideoLibraryIcon sx={{ fontSize: 40 }} />,
      title: "Load Videos",
      description: "Simply paste a YouTube URL to load the video transcript and start asking questions"
    },
    {
      icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
      title: "AI-Powered",
      description: "Our advanced AI analyzes video content to provide accurate answers to your questions"
    },
    {
      icon: <QuestionAnswerIcon sx={{ fontSize: 40 }} />,
      title: "Interactive Chat",
      description: "Have natural conversations about video content with our intuitive chat interface"
    },
    {
        icon: <SpeedIcon sx={{ fontSize: 40 }} />,
        title: "Fast & Efficient",
        description: "Get instant insights from any video without waiting, making your learning and research quicker than ever"
    }
  ];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <HeroSection>
        <ContentContainer maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box textAlign="center" mb={8}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box sx={{
                  background: alpha('#fff', 0.1),
                  backdropFilter: 'blur(10px)',
                  borderRadius: '30px',
                  px: 3,
                  py: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <AutoAwesomeIcon sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    AI-Powered YouTube Assistant
                  </Typography>
                </Box>
              </Box>
              
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  mb: 3,
                  background: 'linear-gradient(45deg, #fff 30%, #e0e0e0 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                YouTube GPT
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px', 
                  mx: 'auto',
                  fontWeight: 300,
                  opacity: 0.9
                }}
              >
                Ask questions about any YouTube video and get instant AI-powered answers
              </Typography>
              
              <Zoom in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
                <StyledButton
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/chat"
                  endIcon={<ArrowForwardIcon />}
                >
                  Get Started
                </StyledButton>
              </Zoom>
            </Box>
          </Fade>

          <Slide in={true} timeout={800} direction="up">
            <Grid container spacing={4} sx={{ mt: 8 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureCard sx={{ maxWidth: 550, margin: '0 auto' }}>
                    <AnimatedIcon sx={{ animationDelay: `${index * 1}s` }}>
                      {feature.icon}
                    </AnimatedIcon>
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 300 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Slide>
        </ContentContainer>
      </HeroSection>

      {/* Additional section */}
      <Box sx={{ 
        py: 10, 
        px: 2, 
        background: theme.palette.mode === 'dark' ? '#0a0a1a' : '#f5f7ff',
        textAlign: 'center'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: theme.palette.primary.dark }}>
            How It Works
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, maxWidth: '600px', mx: 'auto', color: 'text.secondary' }}>
            Transform how you interact with YouTube content in three simple steps
          </Typography>
          
          <Grid container spacing={6} sx={{ maxWidth: '1000px', mx: 'auto' }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>1</Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Paste URL</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Copy and paste any YouTube video URL into our platform
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>2</Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Load Transcript</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Our system automatically extracts and processes the video transcript
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>3</Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Ask Questions</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Interact with our AI to get answers about the video content
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 8 }}>
            <StyledButton
              variant="contained"
              size="large"
              component={Link}
              to="/chat"
              endIcon={<ChatIcon />}
            >
              Start Chatting Now
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;