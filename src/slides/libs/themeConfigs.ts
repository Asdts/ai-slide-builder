// /src/slides/libs/themeConfigs.ts
// created by ASDTS
export type ThemeConfig = {
    UseLeadClass: boolean;
    HasInvertClass: boolean;
    HasTinyTextClass: boolean;
    HasTitleClass: boolean;
    HeaderLocation: string;
    FooterLocation: string;
    ThemeDescription: string;
  };
  
  export const themeConfigs: { [key: string]: ThemeConfig } = {
    "beam": {
      UseLeadClass: false,
      HasInvertClass: false,
      HasTinyTextClass: true,
      HasTitleClass: true,
      HeaderLocation: "(bottom left half of the slide)",
      FooterLocation: "(bottom right half of the slide)",
      ThemeDescription: "IMPORTANT: You must use the title class tag at the top of the title slide (<!-- _class: title -->).\nBeam is a light color scheme based on the LaTeX Beamer theme.",
    },
    "rose_pine": {
      UseLeadClass: true,
      HasInvertClass: false,
      HasTinyTextClass: false,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom left of the slide)",
      ThemeDescription: "Rosé Pine is a dark color scheme.",
    },
    "graph": {
      UseLeadClass: true,
      HasInvertClass: false,
      HasTinyTextClass: true,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom left of the slide)",
      ThemeDescription: "Graph Paper is a light color scheme with a subtle grid background.",
    },
    "business": {
      UseLeadClass: false,
      HasInvertClass: false,
      HasTinyTextClass: false,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom center of the slide)",
      ThemeDescription: "Business theme features a clean, corporate design for formal decks.",
    },
    "classic": {
      UseLeadClass: true,
      HasInvertClass: false,
      HasTinyTextClass: false,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom center of the slide)",
      ThemeDescription: "Classic is a timeless serif theme with neutral colors.",
    },
    "colorful": {
      UseLeadClass: true,
      HasInvertClass: false,
      HasTinyTextClass: false,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom center of the slide)",
      ThemeDescription: "Colorful is a vibrant and playful theme ideal for creative or educational use.",
    },
    "dark": {
      UseLeadClass: false,
      HasInvertClass: false,
      HasTinyTextClass: false,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom right of the slide)",
      ThemeDescription: "Dark theme provides a high-contrast background for low-light environments.",
    },
    "minimal": {
      UseLeadClass: false,
      HasInvertClass: false,
      HasTinyTextClass: false,
      HasTitleClass: false,
      HeaderLocation: "(top left of the slide)",
      FooterLocation: "(bottom center of the slide)",
      ThemeDescription: "Minimal theme emphasizes clean layout, subtle fonts, and zero distractions.",
    },
  };
  

  export function getThemeConfig(theme: string): ThemeConfig {
    return themeConfigs[theme] || themeConfigs["beam"];
  }
  

  export const getThemeOptions = () => {
    return Object.entries(themeConfigs).map(([key, config]) => ({
      value: key,
      label: key
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase()),
      description: config.ThemeDescription,
    }));
  };
  