import React, { useState, useMemo } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  ThemeProvider,
  createTheme,
  Container,
  Chip,
  IconButton,
  InputAdornment,
  alpha,
} from "@mui/material"
import {
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  LightbulbOutlined as LightbulbIcon,
  TrendingUp as TrendingUpIcon,
  Done as DoneIcon,
} from "@mui/icons-material"

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
      light: "#3e7c8f",
      dark: "#1e4b55",
    },
    secondary: {
      main: "#c8d8e4",
    },
    background: {
      default: "#f0f4f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 600,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      letterSpacing: "0em",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "16px",
        },
      },
    },
  },
})

const ProjectCard = ({ title, description, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "new":
        return "success"
      case "inProcess":
        return "warning"
      case "completed":
        return "info"
      default:
        return "default"
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case "new":
        return "New"
      case "inProcess":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "new":
        return <LightbulbIcon />
      case "inProcess":
        return <TrendingUpIcon />
      case "completed":
        return <DoneIcon />
      default:
        return null
    }
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        overflow: "visible",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: theme.palette[getStatusColor()].main,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Chip
            icon={getStatusIcon()}
            label={getStatusLabel()}
            color={getStatusColor()}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Button size="small" endIcon={<ChevronRightIcon />} sx={{ color: "primary.main" }}>
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}

const ProjectSection = ({ title, icon, projects }) => (
  <Box sx={{ mb: 6 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
        }}
      >
        {React.cloneElement(icon, { sx: { color: "common.white" } })}
      </Box>
      <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <ProjectCard {...project} />
        </Grid>
      ))}
    </Grid>
  </Box>
)

const mockProjects = {
  new: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "New online shopping experience with AI-powered recommendations",
      status: "new",
    },
    {
      id: 2,
      title: "CRM System",
      description: "Customer relationship management with advanced analytics",
      status: "new",
    },
    {
      id: 3,
      title: "Mobile App",
      description: "Cross-platform iOS and Android application for seamless user experience",
      status: "new",
    },
  ],
  inProcess: [
    {
      id: 4,
      title: "Data Analytics Dashboard",
      description: "Real-time data visualization with predictive insights",
      status: "inProcess",
    },
    {
      id: 5,
      title: "Cloud Migration",
      description: "Moving infrastructure to the cloud for improved scalability",
      status: "inProcess",
    },
  ],
  completed: [
    {
      id: 6,
      title: "Website Redesign",
      description: "Modern UI/UX overhaul with accessibility improvements",
      status: "completed",
    },
    {
      id: 7,
      title: "Payment Gateway Integration",
      description: "Secure online transactions with multi-currency support",
      status: "completed",
    },
    {
      id: 8,
      title: "Inventory Management System",
      description: "Streamlined stock control with IoT integration",
      status: "completed",
    },
  ],
}

const BusinessAnalystDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = useMemo(() => {
    const allProjects = Object.values(mockProjects).flat()
    return allProjects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          minHeight: "100vh",
          py: 6,
          backgroundImage: "radial-gradient(circle at 10% 20%, rgba(43, 103, 119, 0.05) 0%, rgba(43, 103, 119, 0) 50%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6 }}>
            <Typography
              variant="h1"
              component="h1"
              color="primary.main"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Business Analyst Dashboard
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search projects…"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Box>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            {["Total", "New", "In-Process", "Completed"].map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    bgcolor: index === 0 ? "primary.main" : "background.paper",
                    color: index === 0 ? "common.white" : "text.primary",
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "30%",
                      height: "100%",
                      backgroundColor: index === 0 ? alpha("#ffffff", 0.1) : alpha(theme.palette.primary.main, 0.05),
                      clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography color={index === 0 ? "inherit" : "text.secondary"} gutterBottom>
                      {category} Projects
                    </Typography>
                    <Typography variant="h3" component="div">
                      {index === 0
                        ? Object.values(mockProjects).flat().length
                        : mockProjects[Object.keys(mockProjects)[index - 1]].length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Card sx={{ mb: 4, overflow: "hidden", boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.1)}` }}>
            <CardContent>
              <Typography variant="h4" component="h2" gutterBottom color="primary.main" sx={{ mb: 4, fontWeight: 600 }}>
                Project Overview
              </Typography>
              {searchTerm ? (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Search Results
                  </Typography>
                  <Grid container spacing={3}>
                    {filteredProjects.map((project) => (
                      <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <ProjectCard {...project} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <>
                  <ProjectSection title="New Projects" icon={<AddIcon />} projects={mockProjects.new} />
                  <ProjectSection
                    title="In-Process Projects"
                    icon={<PlayArrowIcon />}
                    projects={mockProjects.inProcess}
                  />
                  <ProjectSection
                    title="Completed Projects"
                    icon={<CheckCircleIcon />}
                    projects={mockProjects.completed}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default BusinessAnalystDashboard

