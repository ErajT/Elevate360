// "use client"

// import { Box, Button, Container, Typography } from "@mui/material"
// import { motion } from "framer-motion"
// import { styled } from "@mui/material/styles"

// const GradientBackground = styled(Box)({
//   background: "linear-gradient(135deg, #2b6777 0%, #1e4b54 100%)",
//   minHeight: "100vh",
//   position: "relative",
//   overflow: "hidden",
//   paddingTop: "4rem",
//   clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
// })

// const Circle = styled(motion.div)(({ theme, size = 60, opacity = 0.1 }) => ({
//   width: size,
//   height: size,
//   borderRadius: "50%",
//   background: "rgba(0,0,0,0.2)",
//   position: "absolute",
//   opacity,
// }))

// const StyledButton = styled(Button)({
//   color: "#2b6777",
//   background: "white",
//   padding: "12px 32px",
//   borderRadius: "8px",
//   textTransform: "none",
//   fontSize: "1rem",
//   fontWeight: 500,
//   "&:hover": {
//     background: "rgba(255,255,255,0.9)",
//   },
// })

// const ImageContainer = styled(motion.div)({
//   position: "relative",
//   width: "100%",
//   maxWidth: "600px",
//   height: "400px",
//   borderRadius: "24px",
//   overflow: "hidden",
//   boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
// })

// export default function LandingPage() {
//   return (
//     <GradientBackground>
//       <Container maxWidth="lg" sx={{ position: "relative" }}>
//         {/* Animated circles */}
//         <Circle
//           initial={{ x: "10vw", y: "10vh" }}
//           animate={{
//             x: ["10vw", "15vw", "10vw"],
//             y: ["10vh", "15vh", "10vh"],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//           size={80}
//         />
//         <Circle
//           initial={{ x: "80vw", y: "20vh" }}
//           animate={{
//             x: ["80vw", "75vw", "80vw"],
//             y: ["20vh", "25vh", "20vh"],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//           size={120}
//         />
//         <Circle
//           initial={{ x: "50vw", y: "50vh" }}
//           animate={{
//             x: ["50vw", "45vw", "50vw"],
//             y: ["50vh", "55vh", "50vh"],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//           size={100}
//         />

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             gap: { xs: 4, md: 8 },
//             py: { xs: 4, md: 8 },
//           }}
//         >
//           {/* Text Content */}
//           <Box sx={{ flex: 1 }}>
//             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//               <Typography
//                 variant="h1"
//                 sx={{
//                   color: "white",
//                   fontSize: { xs: "3rem", md: "4rem" },
//                   fontWeight: 700,
//                   mb: 2,
//                 }}
//               >
//                 Elevate 360
//               </Typography>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <Typography
//                 variant="h2"
//                 sx={{
//                   color: "rgba(255,255,255,0.9)",
//                   fontSize: { xs: "1.5rem", md: "2rem" },
//                   fontWeight: 400,
//                   mb: 4,
//                   maxWidth: "600px",
//                 }}
//               >
//                 Transform Project Management with Unparalleled Transparency
//               </Typography>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               <StyledButton
//                 variant="contained"
//                 size="large"
//                 component={motion.button}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 GET STARTED
//               </StyledButton>
//             </motion.div>
//           </Box>

//           {/* Image */}
//           <Box sx={{ flex: 1 }}>
//           <motion.div
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 1, delay: 0.6 }}
//     >
//       <ImageContainer
//         animate={{
//           y: [0, -10, 0],
//         }}
//         transition={{
//           duration: 4,
//           repeat: Number.POSITIVE_INFINITY,
//           ease: "easeInOut",
//         }}
//       >
//         <img
//           src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//           alt="Dashboard Analytics"
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//           }}
//         />
//       </ImageContainer>
//     </motion.div>
//           </Box>
//         </Box>
//       </Container>
//     </GradientBackground>
//   )
// }

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Box,
  TextField,
} from "@mui/material"
import { styled } from "@mui/system"

gsap.registerPlugin(ScrollTrigger)

const StyledAppBar = styled(AppBar)({
  background: "#2b6777",
})

const StyledButton = styled(Button)({
  color: "white",
  borderColor: "white",
  "&:hover": {
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
})

const AnimatedSphere = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]}>
      <meshStandardMaterial color="#2b6777" wireframe />
    </Sphere>
  )
}

const AnimatedCheckbox = ({ checked, onChange }) => {
  const checkboxRef = useRef()

  useEffect(() => {
    gsap.to(checkboxRef.current, {
      scale: checked ? 1.2 : 1,
      duration: 0.3,
    })
  }, [checked])

  return <Checkbox ref={checkboxRef} checked={checked} onChange={onChange} />
}

const Counter = ({ end, duration }) => {
  const countRef = useRef()
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: end,
      duration: duration,
      onUpdate: () => setCount(Math.floor(obj.val)),
      scrollTrigger: {
        trigger: countRef.current,
        start: "top 80%",
      },
    })
  }, [end, duration])

  return <span ref={countRef}>{count}</span>
}

const AnimatedLandingPage = () => {
  const heroRef = useRef()
  const featuresRef = useRef()
  const statsRef = useRef()
  const testimonialsRef = useRef()
  const contactRef = useRef()

  useEffect(() => {
    // Hero section parallax
    gsap.to(heroRef.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        scrub: true,
      },
    })

    // Animate features
    gsap.from(featuresRef.current.children, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top 80%",
      },
    })

    // Animate testimonials
    gsap.from(testimonialsRef.current.children, {
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top 80%",
      },
    })

    // Animate contact form
    gsap.from(contactRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
      },
    })
  }, [])

  const [checked, setChecked] = React.useState([false, false, false])

  const handleCheck = (index) => {
    setChecked(checked.map((c, i) => (i === index ? !c : c)))
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Elevate 360
          </Typography>
          <StyledButton color="inherit">Features</StyledButton>
          <StyledButton color="inherit">Testimonials</StyledButton>
          <StyledButton color="inherit">Contact</StyledButton>
        </Toolbar>
      </StyledAppBar>

      <Container>
        <Box ref={heroRef} sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
                Elevate Your Projects
              </Typography>
              <Typography variant="h5" paragraph>
                Streamline workflows, boost collaboration, and achieve success.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400, position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Project Management"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                  }}
                >
                  <Canvas>
                    <OrbitControls enableZoom={false} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <AnimatedSphere />
                  </Canvas>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Why Choose Elevate 360?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {["Efficiency", "Collaboration", "Insights"].map((feature, index) => (
              <Grid item key={feature} xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <AnimatedCheckbox checked={checked[index]} onChange={() => handleCheck(index)} />
                    <Typography variant="h6">{feature}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box ref={statsRef} sx={{ py: 8 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" align="center">
                <Counter end={1000} duration={3} />+
              </Typography>
              <Typography variant="h6" align="center">
                Projects Completed
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" align="center">
                <Counter end={500} duration={3} />+
              </Typography>
              <Typography variant="h6" align="center">
                Active Projects
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h3" align="center">
                <Counter end={50} duration={3} />+
              </Typography>
              <Typography variant="h6" align="center">
                Team Members
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box ref={featuresRef} sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {["Real-time Collaboration", "Advanced Analytics", "Resource Management", "Automated Reporting"].map(
              (feature) => (
                <Grid item key={feature} xs={12} sm={6} md={3}>
                  <Box
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#2b6777",
                      color: "white",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h6" align="center">
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ),
            )}
          </Grid>
        </Box>

        <Box ref={testimonialsRef} sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h3" align="center" gutterBottom>
            Testimonials
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "John Doe",
                company: "Tech Co",
                text: "Elevate 360 has transformed our project management process.",
              },
              {
                name: "Jane Smith",
                company: "Design Inc",
                text: "The collaboration features are unparalleled. Highly recommended!",
              },
              {
                name: "Mike Johnson",
                company: "Marketing Pro",
                text: "The analytics provided by Elevate 360 have been game-changing for us.",
              },
            ].map((testimonial, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" paragraph>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle1">{testimonial.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {testimonial.company}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box ref={contactRef} sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Contact Us
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Message" variant="outlined" multiline rows={4} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large">
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>

      <Box sx={{ bgcolor: "#2b6777", color: "white", py: 3, mt: 8 }}>
        <Container>
          <Typography variant="body2" align="center">
            © 2023 Elevate 360. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  )
}

export default AnimatedLandingPage

