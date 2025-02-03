import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextField, Button, Typography, Box, Container, IconButton, InputAdornment } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Eye, EyeOff, User, Lock, Mail, Github, Twitter } from "lucide-react"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    background: {
      default: "#f2f2f2",
    },
  },
})

const formVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
}

const inputVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
    },
  }),
}

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 5px 10px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
}

const BackgroundAnimation = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            background: `rgba(43, 103, 119, ${Math.random() * 0.3 + 0.1})`,
            borderRadius: "50%",
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
          }}
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </Box>
  )
}

export default function AnimatedLoginSignup() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({ email: "", username: "", password: "" })

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setFormState({ email: "", username: "", password: "" })
  }

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
    // Add your form submission logic here
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <BackgroundAnimation />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
            >
              <Typography component="h1" variant="h4" sx={{ mb: 3, color: "primary.main", textAlign: "center" }}>
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <motion.div variants={inputVariants} custom={0}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formState.email}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                {!isLogin && (
                  <motion.div variants={inputVariants} custom={1}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={formState.username}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <User size={20} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                )}
                <motion.div variants={inputVariants} custom={2}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={formState.password}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={20} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {isLogin ? "Login" : "Sign Up"}
                  </Button>
                </motion.div>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton color="primary" sx={{ mx: 1 }}>
                      <Github />
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton color="primary" sx={{ mx: 1 }}>
                      <Twitter />
                    </IconButton>
                  </motion.div>
                </Box>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button fullWidth variant="outlined" onClick={toggleForm} sx={{ mt: 1 }}>
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

