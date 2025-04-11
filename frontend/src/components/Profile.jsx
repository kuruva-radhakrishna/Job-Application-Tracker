import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Upload as UploadIcon, PictureAsPdf, Close } from "@mui/icons-material";
import axios from "axios";
import ImageCropDialog from "./ImageCropDialog";
import { useUser } from '../context/UserContext';

const API_BASE_URL = "https://job-application-tracker-backend-z59w.onrender.com/api";

const Profile = () => {
  const { userId, checkAuth } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "", detail: "" });
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profilePic: "",
  });
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/profile`, {
          withCredentials: true
        });
        const userData = response.data;
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          bio: userData.bio || "",
          profilePic: userData.profilePic || "",
        });
        setResumeFile(userData.resume || null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError({
          message: "Failed to load profile data",
          detail: err.response?.data?.message || err.message
        });
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset error and success states
    setError({ message: "", detail: "" });
    setSuccess("");

    // Check file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setError({
        message: "File size exceeds 5MB limit. Please choose a smaller file.",
        detail: `File size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      });
      return;
    }

    // Check file type
    const ALLOWED_TYPES = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError({
        message:
          "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
        detail: `Provided file type: ${file.type}`,
      });
      return;
    }

    // Create URL for the image preview
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setCropDialogOpen(true);
  };

  const handleCropComplete = async (croppedBlob) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", croppedBlob);

      const response = await axios.post(
        `${API_BASE_URL}/users/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const imageUrl = response.data.url;

      const updateResponse = await axios.put(
        `${API_BASE_URL}/users/profile`,
        { profilePic: imageUrl },
        { withCredentials: true }
      );

      setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
      setSuccess("Profile picture updated successfully!");

      await checkAuth(); // Refresh user data in context
    } catch (err) {
      console.error("Upload error:", err.response || err);
      const serverError = err.response?.data || {};
      setError({
        message:
          serverError.message || "Failed to upload image. Please try again.",
        detail: `Status: ${err.response?.status || "Unknown"} - ${
          serverError.detail || err.message
        }`,
      });
    } finally {
      setLoading(false);
      // Clean up the object URL
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
        setSelectedImage(null);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({ message: "", detail: "" });
    setSuccess("");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/profile`,
        {
          name: formData.name,
          bio: formData.bio,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await checkAuth(); // Refresh user data in context
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      const serverError = err.response?.data || {};
      setError({
        message: "Failed to update profile. Please try again.",
        detail: `Status: ${err.response?.status || "Unknown"} - ${
          serverError.detail || err.message
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError({ message: "", detail: "" });
    setSuccess("");
    setUploadingResume(true);

    // console.log("Selected file:", {
    //   name: file.name,
    //   type: file.type,
    //   size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`
    // });

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File size exceeds 5MB limit. File size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      }

      if (file.type !== 'application/pdf') {
        throw new Error(`Invalid file type. Only PDF files are allowed. Provided: ${file.type}`);
      }

      const response = await axios.post(
        `${API_BASE_URL}/users/upload-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // console.log("Upload response:", response.data);
      setResumeFile(response.data.resume);
      setSuccess("Resume uploaded successfully!");
      await checkAuth(); // Refresh user data in context
    } catch (err) {
      console.error("Resume upload error details:", {
        error: err,
        response: err.response,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message
      });

      const serverError = err.response?.data || {};
      const errorMessage = serverError.message || err.message || "Failed to upload resume";
      setError({
        message: errorMessage,
        detail: `Status: ${err.response?.status || "Unknown"} - ${serverError.detail || err.message}`
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleRemoveResume = async () => {
    setLoading(true);
    setError({ message: "", detail: "" });
    setSuccess("");

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/resume`,
        { withCredentials: true }
      );

      setResumeFile(null);
      setSuccess("Resume removed successfully!");
      await checkAuth(); // Refresh user data in context
    } catch (err) {
      console.error("Remove resume error:", err);
      setError({
        message: "Failed to remove resume. Please try again.",
        detail: err.response?.data?.message || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={(theme) => ({
          p: 3,
          borderRadius: 2,
          bgcolor: theme.palette.mode === "dark" ? "#121212" : "#ffffff",
          border: `1px solid ${theme.palette.divider}`,
        })}
      >
        {/* Header with Profile Picture */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 4 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={formData.profilePic}
              sx={{
                width: 90,
                height: 90,
                border: "3px solid #1976d2",
              }}
            >
              {formData.name?.charAt(0)}
            </Avatar>
            <input
              accept="image/jpeg,image/png,image/webp"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageSelect}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: -6,
                  right: -6,
                  bgcolor: "#1976d2",
                  color: "white",
                  padding: "8px",
                  "&:hover": {
                    bgcolor: "#1565c0",
                  },
                }}
                size="small"
              >
                <PhotoCamera sx={{ fontSize: 16 }} />
              </IconButton>
            </label>
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "#1976d2", fontWeight: 500, fontSize: "2rem" }}
            >
              Profile Settings
            </Typography>
            <Typography
              sx={(theme) => ({
                mb: 1,
                fontWeight: 500,
                color:
                  theme.palette.mode === "dark"
                    ? "#90caf9"
                    : theme.palette.text.secondary,
              })}
            >
              Manage your personal information and profile picture
            </Typography>
          </Box>
        </Box>
  
        {/* Form Fields */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", gap: 3 }}>
            {/* Name Field */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={(theme) => ({
                  mb: 1,
                  fontWeight: 500,
                  color:
                    theme.palette.mode === "dark"
                      ? "#90caf9"
                      : theme.palette.text.secondary,
                })}
              >
                Name *
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                variant="outlined"
                InputProps={{
                  sx: (theme) => ({
                    bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                    color:
                      theme.palette.mode === "dark" ? "#e3f2fd" : "inherit",
                  }),
                }}
              />
            </Box>
  
            {/* Email Field */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={(theme) => ({
                  mb: 1,
                  fontWeight: 500,
                  color:
                    theme.palette.mode === "dark"
                      ? "#90caf9"
                      : theme.palette.text.secondary,
                })}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                disabled
                variant="outlined"
                InputProps={{
                  sx: (theme) => ({
                    bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                    color:
                      theme.palette.mode === "dark" ? "#e3f2fd" : "#333",
                  }),
                }}
              />
            </Box>
          </Box>
  
          {/* Bio Field */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={(theme) => ({
                mb: 1,
                fontWeight: 500,
                color:
                  theme.palette.mode === "dark"
                    ? "#90caf9"
                    : theme.palette.text.secondary,
              })}
            >
              Bio
            </Typography>
            <TextField
              fullWidth
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              multiline
              rows={4}
              placeholder="Tell us about yourself..."
              variant="outlined"
              InputProps={{
                sx: (theme) => ({
                  bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color:
                    theme.palette.mode === "dark" ? "#e3f2fd" : "inherit",
                }),
              }}
            />
          </Box>

          {/* Resume Section */}
          <Box>
            <Typography
              sx={(theme) => ({
                mb: 2,
                fontWeight: 500,
                color:
                  theme.palette.mode === "dark"
                    ? "#90caf9"
                    : theme.palette.text.secondary,
              })}
            >
              Resume
            </Typography>
            <Grid container spacing={2} alignItems="flex-start" justifyContent="space-between">
              <Grid item>
                <Box>
                  <input
                    accept=".pdf"
                    style={{ display: 'none' }}
                    id="resume-upload"
                    type="file"
                    onChange={handleResumeUpload}
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={uploadingResume}
                      sx={{
                        bgcolor: "#1976d2",
                        color: "white",
                        py: 1,
                        px: 2,
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        "&:hover": {
                          bgcolor: "#1565c0",
                        },
                      }}
                    >
                      {uploadingResume ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Upload Resume'
                      )}
                    </Button>
                  </label>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={(theme) => ({
                      mt: 1,
                      color: theme.palette.mode === "dark" ? "#90caf9" : theme.palette.text.secondary,
                    })}
                  >
                    Only PDF files are allowed. Maximum size: 5MB
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveResume}
                  startIcon={<Close />}
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Remove Resume
                </Button>
              </Grid>
            </Grid>

            {resumeFile && (
              <Box 
                sx={(theme) => ({ 
                  mt: 3,
                  p: 3,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f8f9fa",
                  border: `1px solid ${theme.palette.divider}`,
                })}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PictureAsPdf sx={{ color: "#1976d2" }} />
                  <Typography
                    sx={(theme) => ({
                      fontWeight: 500,
                      color: theme.palette.mode === "dark" ? "#90caf9" : theme.palette.text.primary,
                    })}
                  >
                    Resume Preview
                  </Typography>
                </Box>
                <iframe
                  src={resumeFile}
                  style={{
                    width: '100%',
                    height: '500px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                  }}
                  title="Resume Preview"
                />
              </Box>
            )}
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              bgcolor: "#1976d2",
              color: "white",
              py: 1.5,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              width: "100%",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>

          {/* Error and Success Messages */}
          {error.message && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 1 }}>
              {error.message}
              {error.detail && (
                <Typography variant="caption" display="block">
                  {error.detail}
                </Typography>
              )}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2, borderRadius: 1 }}>
              {success}
            </Alert>
          )}
        </Box>
      </Paper>

      <ImageCropDialog
        open={cropDialogOpen}
        onClose={() => {
          setCropDialogOpen(false);
          if (selectedImage) {
            URL.revokeObjectURL(selectedImage);
            setSelectedImage(null);
          }
        }}
        imageUrl={selectedImage}
        onCropComplete={handleCropComplete}
      />
    </Container>
  );
};

export default Profile;
