/**
 * Centralized Theme Configuration
 * Colors, fonts, spacing, and design tokens
 */

// Brand Colors
export const brandColors = {
  blue: "#4160F0", // Primary brand color
  orange: "#FF6700", // Secondary brand color
} as const;

// Convert hex to oklch for CSS variables (approximate conversions)
const brandBlue = "oklch(0.5 0.15 270)"; // #4160F0
const brandOrange = "oklch(0.65 0.18 55)"; // #FF6700

// Color Palette
export const colors = {
  // Brand Colors
  brand: {
    blue: brandColors.blue,
    orange: brandColors.orange,
    blueOklch: brandBlue,
    orangeOklch: brandOrange,
  },

  // Primary Colors (using brand blue)
  primary: {
    main: brandBlue,
    light: "oklch(0.6 0.15 270)",
    dark: "oklch(0.4 0.15 270)",
    foreground: "oklch(0.985 0 0)",
  },

  // Secondary Colors (using brand orange)
  secondary: {
    main: brandOrange,
    light: "oklch(0.75 0.18 55)",
    dark: "oklch(0.55 0.18 55)",
    foreground: "oklch(0.985 0 0)",
  },

  // Status Colors
  status: {
    success: "oklch(0.646 0.222 41.116)", // Green
    warning: brandOrange, // Using brand orange for warnings
    error: "oklch(0.577 0.245 27.325)", // Red
    info: brandBlue, // Using brand blue for info
  },

  // Risk/Status Colors
  risk: {
    comfortable: "oklch(0.646 0.222 41.116)", // Green
    needsReview: brandOrange, // Using brand orange
    highRisk: "oklch(0.577 0.245 27.325)", // Red
  },

  // Severity Colors
  severity: {
    low: "oklch(0.646 0.222 41.116)", // Green
    medium: brandBlue, // Using brand blue
    high: brandOrange, // Using brand orange
    critical: "oklch(0.577 0.245 27.325)", // Red
  },

  // Chart Colors (using brand colors)
  chart: {
    primary: brandBlue,
    secondary: brandOrange,
    tertiary: "oklch(0.398 0.07 227.392)",
    quaternary: "oklch(0.828 0.189 84.429)",
    quinary: "oklch(0.769 0.188 70.08)",
  },

  // Neutral Colors
  neutral: {
    50: "oklch(0.99 0 0)",
    100: "oklch(0.97 0 0)",
    200: "oklch(0.922 0 0)",
    300: "oklch(0.85 0 0)",
    400: "oklch(0.708 0 0)",
    500: "oklch(0.556 0 0)",
    600: "oklch(0.4 0 0)",
    700: "oklch(0.269 0 0)",
    800: "oklch(0.205 0 0)",
    900: "oklch(0.145 0 0)",
  },

  // Background Colors
  background: {
    default: "oklch(1 0 0)",
    muted: "oklch(0.97 0 0)",
    card: "oklch(1 0 0)",
    sidebar: "oklch(0.985 0 0)",
  },

  // Text Colors
  text: {
    primary: "oklch(0.145 0 0)",
    secondary: "oklch(0.556 0 0)",
    muted: "oklch(0.708 0 0)",
    disabled: "oklch(0.85 0 0)",
  },

  // Border Colors
  border: {
    default: "oklch(0.922 0 0)",
    muted: "oklch(0.97 0 0)",
    accent: "oklch(0.708 0 0)",
  },
} as const;

// Typography
export const typography = {
  // Font Families
  fontFamily: {
    sans: [
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(", "),
    mono: [
      "Menlo",
      "Monaco",
      "Consolas",
      '"Liberation Mono"',
      '"Courier New"',
      "monospace",
    ].join(", "),
  },

  // Font Sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Spacing Scale
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  base: "var(--radius)",
  lg: "calc(var(--radius) + 4px)",
  xl: "calc(var(--radius) + 8px)",
  "2xl": "calc(var(--radius) + 12px)",
  full: "9999px",
  default: "0.625rem", // 10px
} as const;

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
} as const;

// Z-Index Scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Role Colors (using brand colors)
export const roleColors = {
  admin: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
    badge: "default" as const,
    hex: brandColors.blue,
  },
  manager: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-200",
    badge: "secondary" as const,
    hex: brandColors.blue, // Using brand blue
  },
  auditor: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
    badge: "outline" as const,
    hex: brandColors.orange, // Using brand orange
  },
} as const;

// Role Display Names
export const roleDisplayNames = {
  admin: "Enterprise Admin",
  manager: "Risk / Business Manager",
  auditor: "Auditor / Compliance Analyst",
} as const;

// Export theme object
export const theme = {
  brandColors,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  roleColors,
  roleDisplayNames,
} as const;

export default theme;
