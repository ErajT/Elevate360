import React, { useState, useEffect, useRef } from "react"
import {
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Button,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  IconButton,
  LinearProgress,
  AppBar,
  Toolbar,
} from "@mui/material"
import ChatIcon from "@mui/icons-material/Chat"
import CloseIcon from "@mui/icons-material/Close"
import SendIcon from "@mui/icons-material/Send"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import DescriptionIcon from "@mui/icons-material/Description"
import * as pdfjsLib from "pdfjs-dist/build/pdf"

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
      dark: "#1e4e5f",
    },
    secondary: {
      main: "#52ab98",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
      color: "#2b6777",
    },
    body1: {
      color: "#333333",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
})

const ProposalPage = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const canvasRef = useRef(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPDF()
  }, [])

  const loadPDF = async () => {
    try {
      setLoading(true)
      const loadingTask = pdfjsLib.getDocument("/xyz.pdf")
      const pdf = await loadingTask.promise
      setPdfDoc(pdf)
      setPageCount(pdf.numPages)
      await renderPage(1, pdf)
      setLoading(false)
    } catch (error) {
      console.error("Error loading PDF:", error)
      setError("Failed to load PDF. Please try again later.")
      setLoading(false)
    }
  }

  const renderPage = async (num, pdf = pdfDoc) => {
    if (!pdf) return

    try {
      const page = await pdf.getPage(num)
      const scale = 1.5
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      canvas.height = viewport.height
      canvas.width = viewport.width

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      await page.render(renderContext)
    } catch (error) {
      console.error("Error rendering page:", error)
      setError("Failed to render PDF page. Please try again later.")
    }
  }

  const handlePrevPage = () => {
    if (pageNum <= 1) return
    setPageNum(pageNum - 1)
    renderPage(pageNum - 1)
  }

  const handleNextPage = () => {
    if (pageNum >= pageCount) return
    setPageNum(pageNum + 1)
    renderPage(pageNum + 1)
  }

  const handleSign = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const toggleChat = () => {
    setOpenChat(!openChat)
  }

  const handleSendMessage = () => {
    console.log("Sending message:", chatMessage)
    setChatMessage("")
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <DescriptionIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Project Proposal
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100%", py: 4, px: { xs: 2, sm: 4 } }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              mx: "auto",
              maxWidth: "900px",
              backgroundColor: "background.paper",
              height: "calc(100vh - 180px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {loading && <LinearProgress sx={{ width: "100%", mb: 2 }} />}
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <>
                <Box
                  sx={{
                    width: "100%",
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#c1c1c1",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#a8a8a8",
                      },
                    }}
                  >
                    <canvas
                      ref={canvasRef}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <Button
                    onClick={handlePrevPage}
                    disabled={pageNum <= 1}
                    variant="outlined"
                    color="primary"
                    startIcon={<NavigateBeforeIcon />}
                  >
                    Previous
                  </Button>
                  <Typography sx={{ fontWeight: 600 }}>
                    Page {pageNum} of {pageCount}
                  </Typography>
                  <Button
                    onClick={handleNextPage}
                    disabled={pageNum >= pageCount}
                    variant="outlined"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSign}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
                transition: "background-color 0.3s",
              }}
            >
              Sign Proposal
            </Button>
          </Box>
        </Box>
        <Fab
          color="secondary"
          aria-label="chat"
          onClick={toggleChat}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          <ChatIcon />
        </Fab>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            },
          }}
        >
          <DialogTitle sx={{ color: "primary.main", fontWeight: 600 }}>Sign Proposal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              By clicking 'Sign', you agree to the terms and conditions outlined in this proposal.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleCloseDialog}
              color="primary"
              variant="contained"
              sx={{
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Sign
            </Button>
          </DialogActions>
        </Dialog>
        {openChat && (
          <Paper
            sx={{
              position: "fixed",
              bottom: 90,
              right: 24,
              width: 320,
              height: 450,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Chat
              </Typography>
              <IconButton onClick={toggleChat} size="small" sx={{ color: "white" }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>{/* Chat messages would go here */}</Box>
            <Box
              sx={{
                p: 2,
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                backgroundColor: "#f5f5f5",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                sx={{ mr: 1 }}
              />
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default ProposalPage

