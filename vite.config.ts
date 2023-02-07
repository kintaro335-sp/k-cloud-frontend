import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function renderchinks(deps): Record<string, string> {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-dom', 'react-router-dom', '@iconify/icons-ant-design', 'base-64', 'lodash'].includes(key))
      return;
    chunks[key] = [key];
  });

  return chunks;
}

const iconsPack1 = [
  '@iconify/icons-ant-design/file-add-filled',
  '@iconify/icons-ant-design/folder-add-filled',
  '@iconify/icons-ant-design/more-outline',
  '@iconify/icons-ant-design/folder-filled',
  '@iconify/icons-ant-design/file-filled',
  '@iconify/icons-ant-design/delete-outlined',
  '@iconify/icons-ant-design/video-camera-filled',
  '@iconify/icons-ant-design/caret-right-fill',
  '@iconify/icons-ant-design/bars-outlined',
  '@iconify/icons-ant-design/down-circle-outline'
];

const iconsPack2 = ['@iconify/icons-ant-design/ellipsis', '@iconify/icons-ant-design/user'];

// https://vitejs.dev/config/
export default defineConfig({
  preview: { strictPort: true, port: 3000 },
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks: {
          base: ['react', 'react-dom', 'react-router-dom'],
          'icons/Pack1': iconsPack1,
          'icons/Pack2': iconsPack2,
          utils: ['base-64', 'lodash'],
          ...renderchinks(require('./package.json').dependencies)
        }
      }
    }
  },
  plugins: [react()]
});
