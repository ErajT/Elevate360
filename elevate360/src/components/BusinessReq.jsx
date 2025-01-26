import React, { useState, useEffect, useRef } from "react"
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import * as pdfjsLib from "pdfjs-dist/build/pdf"

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
const dummyPdfData =
  "JVBERi0xLjcKJb/3ov4KMiAwIG9iago8PCAvVHlwZSAvUGFnZSAvUGFyZW50IDEgMCBSIC9MYXN0TW9kaWZpZWQgKEQ6MjAyMzA1MTAxMjM0NTYpIC9SZXNvdXJjZXMgMyAwIFIgL01lZGlhQm94IFswIDAgNTk1LjI3NTU5IDg0MS44ODk3Nl0gL0NyZFBEZlR5cGUgMS43IC9Db250ZW50cyA0IDAgUiAvU3RydWN0UGFyZW50cyAwIC9Sb3RhdGUgMCA+PgplbmRvYmoKNCAwIG9iago8PCAvTGVuZ3RoIDEzNiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeJxFjrEKwzAMRHf9Cm1pILZlOXYWQ+mULp3aQlIKgZIh/z+cJqXDcYd0d4AxhzQROgGKXHzwDnbp7sMUkTlT+8roNE0C1gQvlZdbRqNQDY9vWVdeWAXK4BwTX3TN+OhvmuqKtZpkj1mxvIHacPj9nMtYxbGK/QVHtCk/CmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PCAvVHlwZSAvUGFnZXMgL0tpZHMgWzIgMCBSXSAvQ291bnQgMSA+PgplbmRvYmoKMyAwIG9iago8PCAvUHJvY1NldCBbL1BERiAvVGV4dF0gL0NvbG9yU3BhY2UgPDwgL0NzMSA1IDAgUiA+PiAvRm9udCA8PCAvVFQxIDYgMCBSID4+ID4+CmVuZG9iago1IDAgb2JqClsvSUNDQmFzZWQgNyAwIFJdCmVuZG9iago3IDAgb2JqCjw8IC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9OIDMgL0xlbmd0aCAyNTk2ID4+CnN0cmVhbQp4nJWWd1RT2RaHz713eqHNMDQiKGIDCCIgHRFBkFCkCKElSC+CIkgUG5FLUERBUBFEFAQFsTLqIEqxl6iIAyogouKoMSuH5eVsfe/lrbfW/vbf+z/nrN9eZ+27r7XPAgBDJGEWAQBAnpyQAIiIASDr8YSk/yMSp4jFgGT8KGAA1oNwHnS824AHAOCx7gAAkMbrCS+AAAC4AH5UZmgGQGwCgGXu5ggA4GIAyDyVmZMJABALAGCWnJIHABADALCkZCVBwJQAgFgBQOI3JRcA0A0AIPsbK+cAQAEAwKyQmg6HAxwOx304HA4XAQALjgfg8XhWPB5vFY/HO8bj8e7x/6ceAQBwOJwwDodTyeFwDnA4nIscDscXVTpHFQAAsCSc5J8BAHsAUCuX0/kCAGIAQE1Ly3QDAEIAQHFqcpoNAAgGAMTmZmf5AwC8AICZxuMKAIB4AMCwmZkeBQAQAgAYt8QUGwAgHgAwSEpKDQYACAEAzCnxSZEAgCgAQFFBQX40ACAGANDc3Dx9AIAIAMDwpKQMbwBAJABgRUVFURAAIAoAMCslJTMCABADAOiQn58fAAAIBwC47+rqmgIAiAAALKqqqigAQBQAoFNycpYfACAGANCrqLi4HwAQAQAYUFCQGwsAiAIADMnPL0wBAEQAAEYWFxdXAgDCAQDDioqKKgEAMQCAMTU1NdUAgGgAwISKisIEAEAEAGByQ0NDIwAgCgAwta6urhEAEAMAyGlpaWkCAEQBALKbm1t6AABRAIBZbW1tvQCAKADAnPb2jl4AQAwAIL+zs3MgACAKAFDY09MzBACIAgAU9/b2jgAAIgEAZQMDAxMAgCgAQMXw8PAkACAGAFA1NTW1AABQSwAAAAAAAAAA"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b6777",
    },
    secondary: {
      main: "#e5e5e5", 
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2b6777",
      marginBottom: "1.5rem",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 600,
      color: "#2b6777",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "0.875rem",
          padding: "0.75rem",
          backgroundColor: "#2b6777",
          "&:hover": {
            backgroundColor: "#1e4b54",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          borderRadius: "12px",
          border: "1px solid #e5e5e7eb",
        },
      },
    },
  },
})

const BusinessAnalystPortal = () => {
  const [pdfUrl, setPdfUrl] = useState("")
  const [generatedText, setGeneratedText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const pdfBlob = base64toBlob(dummyPdfData, "application/pdf")
    const url = URL.createObjectURL(pdfBlob)
    setPdfUrl(url)
    loadPDF(url)

    return () => URL.revokeObjectURL(url)
  }, [])

  const loadPDF = async (url) => {
    try {
      const loadingTask = pdfjsLib.getDocument(url)
      const pdf = await loadingTask.promise
      const page = await pdf.getPage(1)
      const scale = 1.5
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext("2d")
        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }
        await page.render(renderContext)
      }
    } catch (error) {
      console.error("Error loading PDF:", error)
    }
  }

  const base64toBlob = (base64, type = "application/octet-stream") => {
    try {
      const binStr = atob(base64)
      const len = binStr.length
      const arr = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      return new Blob([arr], { type })
    } catch (error) {
      console.error("Error decoding base64 string:", error)
      return new Blob([], { type })
    }
  }

  const handleGenerate = () => {
    const dummyResponse =
      "This is a generated response based on the PDF content. It includes key points and analysis that a business analyst might provide. The content is editable, allowing for further refinement and customization."
    setGeneratedText(dummyResponse)
  }

  const handleForward = () => {
    alert("Forwarding the analysis... (This is a placeholder action)")
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            py: 4,
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          Business Analyst Portal
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            p: 4,
            gap: 4,
          }}
        >
          <Paper
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
              minHeight: "calc(100vh - 180px)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              PDF Preview
            </Typography>
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                mb: 3,
                border: "1px solid #e5e7eb",
                borderRadius: 1,
                p: 2,
                backgroundColor: "#ffffff",
              }}
            >
              <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
            </Box>
            <Button variant="contained" fullWidth onClick={handleGenerate} sx={{ mt: "auto" }}>
              Generate Analysis
            </Button>
          </Paper>

          <Paper
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
              minHeight: "calc(100vh - 180px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h6">Generated Analysis</Typography>
              <IconButton
                onClick={() => setIsEditing(!isEditing)}
                sx={{
                  color: "#2b6777",
                  "&:hover": {
                    backgroundColor: "rgba(43, 103, 119, 0.04)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <TextField
              multiline
              fullWidth
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              disabled={!isEditing}
              sx={{
                flex: 1,
                mb: 3,
                "& .MuiInputBase-root": {
                  height: "100%",
                  backgroundColor: "#ffffff",
                },
                "& .MuiInputBase-input": {
                  height: "100% !important",
                  overflow: "auto !important",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#2b6777",
                  },
                },
              }}
              InputProps={{
                sx: {
                  height: "100%",
                  alignItems: "flex-start",
                },
              }}
            />
            <Button variant="contained" fullWidth onClick={handleForward} sx={{ mt: "auto" }}>
              Forward Analysis
            </Button>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default BusinessAnalystPortal

