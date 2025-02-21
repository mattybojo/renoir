/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      primary: {
        default: "var(--ion-color-primary)",
        shade: "var(--ion-color-primary-shade)",
        tint: "var(--ion-color-primary-tint)",
        contrast: "var(--ion-color-primary-contrast)",
      },
      secondary: {
        default: "var(--ion-color-secondary)",
        shade: "var(--ion-color-secondary-shade)",
        tint: "var(--ion-color-secondary-tint)",
        contrast: "var(--ion-color-secondary-contrast)",
      },
      tertiary: {
        default: "var(--ion-color-tertiary)",
        shade: "var(--ion-color-tertiary-shade)",
        tint: "var(--ion-color-tertiary-tint)",
        contrast: "var(--ion-color-tertiary-contrast)",
      },
      success: {
        default: "var(--ion-color-success)",
        shade: "var(--ion-color-success-shade)",
        tint: "var(--ion-color-success-tint)",
        contrast: "var(--ion-color-success-contrast)",
      },
      warning: {
        default: "var(--ion-color-warning)",
        shade: "var(--ion-color-warning-shade)",
        tint: "var(--ion-color-warning-tint)",
        contrast: "var(--ion-color-warning-contrast)",
      },
      danger: {
        default: "var(--ion-color-danger)",
        shade: "var(--ion-color-danger-shade)",
        tint: "var(--ion-color-danger-tint)",
        contrast: "var(--ion-color-danger-contrast)",
      },
      dark: {
        default: "var(--ion-color-dark)",
        shade: "var(--ion-color-dark-shade)",
        tint: "var(--ion-color-dark-tint)",
        contrast: "var(--ion-color-dark-contrast)",
      },
      medium: {
        default: "var(--ion-color-medium)",
        shade: "var(--ion-color-medium-shade)",
        tint: "var(--ion-color-medium-tint)",
        contrast: "var(--ion-color-medium-contrast)",
      },
      light: {
        default: "var(--ion-color-light)",
        shade: "var(--ion-color-light-shade)",
        tint: "var(--ion-color-light-tint)",
        contrast: "var(--ion-color-light-contrast)",
      },
      step50: "var(--ion-color-step-50)",
      step100: "var(--ion-color-step-100)",
      step150: "var(--ion-color-step-150)",
      step200: "var(--ion-color-step-200)",
      step250: "var(--ion-color-step-250)",
      step300: "var(--ion-color-step-300)",
      step350: "var(--ion-color-step-350)",
      step400: "var(--ion-color-step-400)",
      step450: "var(--ion-color-step-450)",
      step500: "var(--ion-color-step-500)",
      step550: "var(--ion-color-step-550)",
      step600: "var(--ion-color-step-600)",
      step650: "var(--ion-color-step-650)",
      step700: "var(--ion-color-step-700)",
      step750: "var(--ion-color-step-750)",
      step800: "var(--ion-color-step-800)",
      step850: "var(--ion-color-step-850)",
      step900: "var(--ion-color-step-900)",
      step950: "var(--ion-color-step-950)",
      white: "#fff",
      black: "#000",
    },
  },
  plugins: [],
};
