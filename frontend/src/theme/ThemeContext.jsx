import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Create theme context
export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light'
});

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('theme-mode');
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#4F46E5' : '#818CF8',
        light: mode === 'light' ? '#6366F1' : '#93C5FD',
        dark: mode === 'light' ? '#4338CA' : '#6366F1',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'light' ? '#7C3AED' : '#A78BFA',
        light: mode === 'light' ? '#8B5CF6' : '#C4B5FD',
        dark: mode === 'light' ? '#6D28D9' : '#7C3AED',
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'light' ? '#F9FAFB' : '#111827',
        paper: mode === 'light' ? '#FFFFFF' : '#1F2937',
      },
      text: {
        primary: mode === 'light' ? '#111827' : '#F9FAFB',
        secondary: mode === 'light' ? '#4B5563' : '#9CA3AF',
      },
      divider: mode === 'light' ? '#E5E7EB' : '#374151',
      error: {
        main: mode === 'light' ? '#DC2626' : '#EF4444',
        contrastText: '#FFFFFF',
      },
      warning: {
        main: mode === 'light' ? '#D97706' : '#F59E0B',
        contrastText: mode === 'light' ? '#FFFFFF' : '#111827',
      },
      info: {
        main: mode === 'light' ? '#0284C7' : '#38BDF8',
        contrastText: '#FFFFFF',
      },
      success: {
        main: mode === 'light' ? '#059669' : '#10B981',
        contrastText: '#FFFFFF',
      },
      action: {
        active: mode === 'light' ? '#111827' : '#F9FAFB',
        hover: mode === 'light' ? 'rgba(79, 70, 229, 0.08)' : 'rgba(99, 102, 241, 0.12)',
        selected: mode === 'light' ? 'rgba(79, 70, 229, 0.12)' : 'rgba(99, 102, 241, 0.24)',
        disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
        disabledBackground: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.2,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.2,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.2,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.2,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.2,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        color: mode === 'light' ? '#4B5563' : '#9CA3AF',
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: mode === 'light' ? '#4B5563' : '#9CA3AF',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        color: mode === 'light' ? '#111827' : '#F9FAFB',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: mode === 'light' ? '#4B5563' : '#9CA3AF',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            padding: '8px 16px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&.MuiButton-containedPrimary': {
              background: mode === 'light' 
                ? 'linear-gradient(to right, #4F46E5, #6366F1)'
                : 'linear-gradient(to right, #818CF8, #93C5FD)',
              '&:hover': {
                background: mode === 'light'
                  ? 'linear-gradient(to right, #4338CA, #4F46E5)'
                  : 'linear-gradient(to right, #6366F1, #818CF8)',
              },
            },
          },
          outlined: {
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: '12px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            border: `1px solid ${mode === 'light' ? '#E5E7EB' : '#374151'}`,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${mode === 'light' ? '#E5E7EB' : '#374151'}`,
            padding: '1rem',
          },
          head: {
            fontWeight: 600,
            backgroundColor: mode === 'light' ? '#F9FAFB' : '#1F2937',
            color: mode === 'light' ? '#111827' : '#F9FAFB',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: mode === 'light' ? '#F9FAFB' : '#1F2937',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: '6px',
            padding: '4px 0',
          },
          filled: {
            '&.MuiChip-colorPrimary': {
              backgroundColor: mode === 'light' ? '#EEF2FF' : '#3730A3',
              color: mode === 'light' ? '#4338CA' : '#A5B4FC',
            },
            '&.MuiChip-colorSuccess': {
              backgroundColor: mode === 'light' ? '#ECFDF5' : '#064E3B',
              color: mode === 'light' ? '#059669' : '#34D399',
            },
            '&.MuiChip-colorError': {
              backgroundColor: mode === 'light' ? '#FEF2F2' : '#7F1D1D',
              color: mode === 'light' ? '#DC2626' : '#F87171',
            },
            '&.MuiChip-colorWarning': {
              backgroundColor: mode === 'light' ? '#FFFBEB' : '#78350F',
              color: mode === 'light' ? '#D97706' : '#FBBF24',
            },
            '&.MuiChip-colorInfo': {
              backgroundColor: mode === 'light' ? '#EFF6FF' : '#1E3A8A',
              color: mode === 'light' ? '#2563EB' : '#60A5FA',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: mode === 'light' ? '#4F46E5' : '#818CF8',
            textDecoration: 'none',
            '&:hover': {
              color: mode === 'light' ? '#4338CA' : '#93C5FD',
              textDecoration: 'underline',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#111827',
            color: mode === 'light' ? '#111827' : '#F9FAFB',
            boxShadow: 'none',
            borderBottom: `1px solid ${mode === 'light' ? '#E5E7EB' : '#374151'}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: mode === 'light' ? '#F9FAFB' : '#1F2937',
              '& fieldset': {
                borderColor: mode === 'light' ? '#E5E7EB' : '#374151',
              },
              '&:hover fieldset': {
                borderColor: mode === 'light' ? '#D1D5DB' : '#4B5563',
              },
              '&.Mui-focused fieldset': {
                borderColor: mode === 'light' ? '#4F46E5' : '#818CF8',
              },
            },
            '& .MuiInputLabel-root': {
              color: mode === 'light' ? '#6B7280' : '#9CA3AF',
              '&.Mui-focused': {
                color: mode === 'light' ? '#4F46E5' : '#818CF8',
              },
            },
            '& .MuiInputBase-input': {
              color: mode === 'light' ? '#111827' : '#F9FAFB',
              '&::placeholder': {
                color: mode === 'light' ? '#9CA3AF' : '#6B7280',
                opacity: 1,
              },
            },
          },
        },
      },
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ThemeProviderWrapper');
  }
  return context;
}; 