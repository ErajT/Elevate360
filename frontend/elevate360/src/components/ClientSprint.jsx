import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Modal,
  TextField,
  Tooltip,
  LinearProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material"
import { styled, keyframes } from "@mui/system"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import SprintIcon from "@mui/icons-material/DirectionsRun"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import FlagIcon from "@mui/icons-material/Flag"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
      light: "#52ab98",
      dark: "#1e4e5f",
    },
    secondary: {
      main: "#c8d8e4",
    },
    background: {
      default: "#f2f2f2",
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
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
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
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
        },
      },
    },
  },
})

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(43, 103, 119, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(43, 103, 119, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(43, 103, 119, 0);
  }
`

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
}))

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "#2b6777",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
}))

const ProfileButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}))

const SprintCard = ({ sprint }) => (
  <StyledPaper>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Typography variant="h3" component="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
        {sprint.name}
      </Typography>
    </Box>
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <CalendarTodayIcon sx={{ fontSize: 16, mr: 1, color: "primary.light" }} />
        {sprint.startDate} - {sprint.endDate}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
        <FlagIcon sx={{ fontSize: 16, mr: 1, color: "primary.light" }} />
        {sprint.goal}
      </Typography>
    </Box>
    <Box sx={{ mt: "auto", mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Progress
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main" }}>
          {sprint.progress}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={sprint.progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(43, 103, 119, 0.1)",
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
            backgroundColor: "primary.main",
          },
        }}
      />
    </Box>
    <Button
      component={RouterLink}
      to={`/clientmanage/`}
      variant="outlined"
      size="small"
      sx={{
        borderColor: "primary.main",
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "common.white",
        },
      }}
    >
      View Details
    </Button>
  </StyledPaper>
)

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "common.white", fontWeight: 700 }}>
          Sprint Odyssey
        </Typography>
        <ProfileButton
          startIcon={<Avatar src="/placeholder.svg" />}
          endIcon={<ExpandMoreIcon />}
          onClick={handleProfileMenuOpen}
        >
          John Doe
        </ProfileButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <AccountCircleIcon sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  )
}

const SprintManagement = () => {
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [newSprint, setNewSprint] = useState({
    name: "",
    startDate: "",
    endDate: "",
    goal: "",
  })

  const handleOpenConfirm = () => setConfirmOpen(true)
  const handleCloseConfirm = () => setConfirmOpen(false)
  const handleConfirm = () => {
    handleCloseConfirm()
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewSprint((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("New Sprint:", newSprint)
    handleClose()
    setNewSprint({ name: "", startDate: "", endDate: "", goal: "" })
  }

  const sprints = [
    {
      id: 1,
      name: "Sprint Velocity",
      startDate: "2023-05-01",
      endDate: "2023-05-14",
      goal: "Increase team velocity by 10%",
      progress: 75,
    },
    {
      id: 2,
      name: "Feature Launch",
      startDate: "2023-05-15",
      endDate: "2023-05-28",
      goal: "Launch new user dashboard",
      progress: 40,
    },
    {
      id: 3,
      name: "Performance Boost",
      startDate: "2023-05-29",
      endDate: "2023-06-11",
      goal: "Optimize app performance",
      progress: 0,
    },
    {
      id: 4,
      name: "API Integration",
      startDate: "2023-06-26",
      endDate: "2023-07-09",
      goal: "Integrate third-party APIs",
      progress: 0,
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                color: "primary.main",
                textAlign: "center",
                mb: 4,
              }}
            >
              <SprintIcon sx={{ fontSize: 40, mr: 2, color: "primary.light", verticalAlign: "middle" }} />
              Sprint Management
            </Typography>
            <Tooltip title="Add New Sprint" arrow>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <IconButton
                  color="primary"
                  onClick={handleOpenConfirm}
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: "rgba(43, 103, 119, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(43, 103, 119, 0.2)",
                    },
                    animation: `${pulseAnimation} 2s infinite`,
                  }}
                >
                  <AddIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="caption" sx={{ mt: 1, color: "text.secondary" }}>
                  Add More Sprint
                </Typography>
              </Box>
            </Tooltip>
          </Box>

          <Grid container spacing={4}>
            {sprints.map((sprint) => (
              <Grid item xs={12} md={4} key={sprint.id}>
                <SprintCard sprint={sprint} />
              </Grid>
            ))}
          </Grid>

          <Dialog
            open={confirmOpen}
            onClose={handleCloseConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm New Sprint"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Adding a new sprint may increase the cost of your project. Are you ready to proceed?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirm} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                Yes, I'm Ready
              </Button>
            </DialogActions>
          </Dialog>

          <Modal open={open} onClose={handleClose}>
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
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h3" color="primary.main">
                  New Sprint Adventure
                </Typography>
                <IconButton onClick={handleClose} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Sprint Name"
                  name="name"
                  value={newSprint.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={newSprint.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={newSprint.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Sprint Goal"
                  name="goal"
                  value={newSprint.goal}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  Launch New Sprint
                </Button>
              </form>
            </Box>
          </Modal>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default SprintManagement

