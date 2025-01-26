import React from "react"
import { Box, Typography, Card, CardActionArea, CardContent, Grid, Container, useMediaQuery } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Image as ImageIcon,
  Receipt as ReceiptIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const theme = createTheme({
  palette: {
    background: {
      default: "#f7f9fc",
      paper: "#ffffff",
    },
    primary: {
      main: "#3a506b",
    },
    secondary: {
      main: "#5bc0be",
    },
    text: {
      primary: "#0b132b",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
})

const portalItems = [
  { title: "Dashboard", icon: <DashboardIcon />, route: "/clienthome" },
  { title: "Requirements", icon: <AssignmentTurnedInIcon />, route: "/clientreq" },
  { title: "View Screenshots", icon: <ImageIcon />, route: "/clientss" },
  { title: "Billing", icon: <ReceiptIcon />, route: "/Clientbilling" },
]

const ClientPortal = () => {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleItemClick = (route) => {
    navigate(route)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Container maxWidth="xl" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", py: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            color="primary"
            align="center"
            sx={{
              mb: 12,
              mt: 8,
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "2px",
              },
            }}
          >
            Client Management
          </Typography>
          <Grid container spacing={6} alignItems="stretch" sx={{ flexGrow: 1, px: { xs: 2, md: 8, lg: 16 } }}>
            {portalItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: isSmallScreen ? "auto" : "300px",
                    backgroundColor: "background.paper",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      backgroundColor: "secondary.main",
                    },
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 22px 45px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleItemClick(item.route)}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 4,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "rgba(91, 192, 190, 0.1)",
                        borderRadius: "50%",
                        p: 3,
                        mb: 3,
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(91, 192, 190, 0.2)",
                          transform: "rotate(10deg)",
                        },
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        style: { fontSize: 48, color: theme.palette.primary.main },
                      })}
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        align="center"
                        color="text.primary"
                        sx={{
                          fontWeight: 600,
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: "-8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "40px",
                            height: "2px",
                            backgroundColor: theme.palette.secondary.main,
                            transition: "width 0.3s ease-in-out",
                          },
                          "&:hover::after": {
                            width: "60px",
                          },
                        }}
                      >
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default ClientPortal

