
/**
 * Creates a file structure for the project export
 * This includes essential files to get the project running locally
 */
const createProjectFiles = () => {
  return {
    // HTML and config files
    'index.html': 
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>qualityveda-attendance-hub</title>
    <meta name="description" content="Qualityveda Attendance Management System" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    
    // Package configuration
    'package.json': JSON.stringify({
      name: "quality-veda-attendance",
      version: "1.0.0",
      private: true,
      type: "module",
      scripts: {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview"
      },
      dependencies: {
        "@hookform/resolvers": "^3.9.0",
        "@radix-ui/react-dialog": "^1.1.2",
        "@radix-ui/react-dropdown-menu": "^2.1.1",
        "@radix-ui/react-label": "^2.1.0",
        "@radix-ui/react-popover": "^1.1.1",
        "@radix-ui/react-slot": "^1.1.0",
        "@radix-ui/react-toast": "^1.1.2",
        "@radix-ui/react-tooltip": "^1.1.4",
        "@tanstack/react-query": "^5.56.2",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "date-fns": "^3.6.0",
        "framer-motion": "^12.4.7",
        "jszip": "^3.10.1",
        "lucide-react": "^0.462.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-hook-form": "^7.53.0",
        "react-router-dom": "^6.26.2",
        "sonner": "^1.5.0",
        "tailwind-merge": "^2.5.2",
        "tailwindcss-animate": "^1.0.7",
        "zod": "^3.23.8"
      },
      devDependencies: {
        "@types/node": "^20.8.5",
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@typescript-eslint/eslint-plugin": "^6.9.0",
        "@typescript-eslint/parser": "^6.9.0",
        "@vitejs/plugin-react-swc": "^3.5.0",
        "autoprefixer": "^10.4.16",
        "eslint": "^8.52.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.4",
        "postcss": "^8.4.31",
        "tailwindcss": "^3.4.4",
        "typescript": "^5.2.2",
        "vite": "^5.0.0"
      }
    }, null, 2),
    
    'README.md': `# Qualityveda Attendance Management System

## Project Overview
A complete attendance management system built with React, TypeScript, and Tailwind CSS. This project allows users to mark attendance, view history, and includes an admin panel for managing labs and trainings.

## Getting Started

1. Clone this repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

## Features
- User authentication
- Attendance marking
- Attendance history viewer
- Admin panel for management
- Responsive design
- Dark/light mode support

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Framer Motion

## Project Structure
The project is organized into:
- \`/components\`: UI components
- \`/pages\`: Main application pages
- \`/utils\`: Utility functions
- \`/hooks\`: Custom React hooks
`,
    
    'vite.config.ts': `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});`,
    
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
    
    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`
  };
};

/**
 * Downloads a text file
 */
export const downloadTextFile = (filename: string, text: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/**
 * Gets the content of a file from the application
 */
const getFileContent = async (path: string): Promise<string> => {
  try {
    const response = await fetch(path);
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch file: ${path}`, error);
    return `// Failed to fetch ${path}\n// This is a placeholder content\n`;
  }
};

/**
 * Downloads the project as a ZIP file
 * This includes actual source files and configuration files
 */
export const downloadProjectAsZip = async () => {
  try {
    // Dynamically import JSZip only when needed
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // Add files to the zip
    const baseFiles = createProjectFiles();
    Object.entries(baseFiles).forEach(([path, content]) => {
      zip.file(path, content);
    });
    
    // Add source files
    // Note: In a real application with file system access, you would scan the project directory
    // Since we don't have direct filesystem access in the browser, we're manually specifying key files

    // Try to fetch some of the actual source files via fetch if they're accessible
    try {
      // Create directory structure
      const sourceDir = zip.folder("src");
      const componentsDir = sourceDir?.folder("components");
      const pagesDir = sourceDir?.folder("pages");
      const utilsDir = sourceDir?.folder("utils");
      const hooksDir = sourceDir?.folder("hooks");
      
      // Add main entry point
      sourceDir?.file("main.tsx", await getFileContent('/src/main.tsx'));
      sourceDir?.file("App.tsx", await getFileContent('/src/App.tsx'));
      sourceDir?.file("index.css", await getFileContent('/src/index.css'));
      
      // Add utility files
      utilsDir?.file("exportUtils.ts", await getFileContent('/src/utils/exportUtils.ts'));
      
      // Include a note about the export
      zip.file("EXPORT_NOTE.txt", 
        "This exported project contains essential configuration and structure files to help you " +
        "set up and modify the QualityVeda Attendance Management System locally.\n\n" +
        "Some components might not be included in this export due to browser limitations.\n\n" +
        "Date Exported: " + new Date().toLocaleString());
    } catch (error) {
      console.warn("Could not fetch some source files", error);
      // Continue with base files only
    }
    
    // Generate the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quality-veda-project.zip';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Failed to download project as ZIP:', error);
    throw error;
  }
};
