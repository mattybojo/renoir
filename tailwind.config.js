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
      },
      secondary: {
        default: "var(--ion-color-secondary)",
        shade: "var(--ion-color-secondary-shade)",
        tint: "var(--ion-color-secondary-tint)",
      },
      tertiary: {
        default: "var(--ion-color-tertiary)",
        shade: "var(--ion-color-tertiary-shade)",
        tint: "var(--ion-color-tertiary-tint)",
      },
      success: {
        default: "var(--ion-color-success)",
        shade: "var(--ion-color-tertiary-success)",
        tint: "var(--ion-color-tertiary-success)",
      },
      warning: {
        default: "var(--ion-color-warning)",
        shade: "var(--ion-color-tertiary-warning)",
        tint: "var(--ion-color-tertiary-warning)",
      },
      danger: {
        default: "var(--ion-color-danger)",
        shade: "var(--ion-color-tertiary-danger)",
        tint: "var(--ion-color-tertiary-danger)",
      },
      dark: {
        default: "var(--ion-color-dark)",
        shade: "var(--ion-color-tertiary-dark)",
        tint: "var(--ion-color-tertiary-dark)",
      },
      medium: {
        default: "var(--ion-color-medium)",
        shade: "var(--ion-color-tertiary-medium)",
        tint: "var(--ion-color-tertiary-medium)",
      },
      light: {
        default: "var(--ion-color-light)",
        shade: "var(--ion-color-tertiary-light)",
        tint: "var(--ion-color-tertiary-light)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
