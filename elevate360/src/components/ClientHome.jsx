import React, { useState } from "react"
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Tooltip,
  Link,
  Avatar,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material"
import { styled, keyframes } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"
import FolderIcon from "@mui/icons-material/Folder"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DashboardIcon from "@mui/icons-material/Dashboard"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    secondary: {
      main: "#26a69a",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0em",
    },
    subtitle1: {
      fontSize: "1.125rem",
      letterSpacing: "0.00938em",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
})

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#2b6777",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
  color: "#ffffff",
}))

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}))

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(38, 166, 154, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(38, 166, 154, 0);
  }
`

const ProjectCard = styled(Paper)(({ theme, isCompleted, isNew }) => ({
  padding: theme.spacing(3),
  height: "100%",
  position: "relative",
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: isCompleted
      ? theme.palette.success.main
      : isNew
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  ...(isNew && {
    animation: `${pulse} 2s infinite`,
  }),
}))

const ProjectCardContent = ({ number, description, status, deadline, isCompleted, isNew }) => (
  <>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      {isCompleted ? (
        <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
      ) : isNew ? (
        <LightbulbIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
      ) : (
        <FolderIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
      )}
      <Typography variant="h3">Project {number}</Typography>
    </Box>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
      {description}
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body2" color="text.secondary">
        Status: <span style={{ fontWeight: 600 }}>{status}</span>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {isCompleted ? "Completed: " : isNew ? "Start Date: " : "Deadline: "}
        <span style={{ fontWeight: 600 }}>{deadline}</span>
      </Typography>
    </Box>
  </>
)

const ClientHomePage = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    cost: "",
    type: "",
    schedule: "",
    description: "",
    file: null,
  })
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }))
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
        <StyledAppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "text.primary", fontWeight: 700 }}>
              ClientDash
            </Typography>
            <ProfileButton
              startIcon={<Avatar src="/placeholder.svg" />}
              endIcon={<ExpandMoreIcon />}
              onClick={handleProfileMenuOpen}
            >
              John Doe
            </ProfileButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
              <MenuItem onClick={handleProfileMenuClose}>
                <AccountCircleIcon sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <SettingsIcon sx={{ mr: 1 }} /> Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfileMenuClose}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </StyledAppBar>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #2b6777 30%, #52ab98 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Welcome to Your Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
              Manage your projects, track progress, and collaborate with ease.
            </Typography>
            <Tooltip title="Create New Project" arrow>
              <IconButton
                color="primary"
                onClick={handleOpen}
                sx={{
                  width: 72,
                  height: 72,
                  backgroundColor: "rgba(43, 103, 119, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(43, 103, 119, 0.2)",
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 36 }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" display="block" sx={{ mt: 0.5, color: "text.secondary" }}>
              Create New Project
            </Typography>
          </Box>

          {["New", "Ongoing", "Completed"].map((section, index) => (
            <Box key={section} sx={{ mb: 6 }}>
              <Typography variant="h2" sx={{ mb: 4, display: "flex", alignItems: "center" }}>
                <DashboardIcon sx={{ mr: 1, color: "primary.main" }} />
                {section} Projects
              </Typography>
              <Grid container spacing={4}>
                {[1, 2, 3].map((number) => (
                  <Grid item xs={12} md={4} key={number}>
                    <ProjectCard
                      component={Link}
                      href={`/clientprop`}
                      isCompleted={section === "Completed"}
                      isNew={section === "New"}
                    >
                      <ProjectCardContent
                        number={number}
                        description={`${section} project description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
                        status={section === "Completed" ? "Completed" : section === "New" ? "New" : "In Progress"}
                        deadline={`2023-${(index + 7).toString().padStart(2, "0")}-01`}
                        isCompleted={section === "Completed"}
                        isNew={section === "New"}
                      />
                    </ProjectCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 3,
              }}
            >
              <Typography id="modal-title" variant="h3" gutterBottom>
                Create New Project
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
              />
              <input
                accept="image/*,application/pdf"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
                  Upload File
                </Button>
              </label>
              <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleClose}>
                Add Project
              </Button>
            </Box>
          </Modal>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default ClientHomePage

