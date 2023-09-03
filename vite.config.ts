import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function renderchinks(deps): Record<string, string> {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (
      [
        'react',
        'react-dom',
        'react-router-dom',
        '@iconify/icons-ant-design',
        '@iconify/icons-carbon',
        '@iconify/icons-material-symbols',
        'base-64',
        'lodash'
      ].includes(key)
    )
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

const iconsPack2 = [
  '@iconify/icons-ant-design/ellipsis',
  '@iconify/icons-carbon/tree-view',
  '@iconify/icons-material-symbols/upload-file',
  '@iconify/icons-material-symbols/add',
  '@iconify/icons-material-symbols/folder',
  '@iconify/icons-material-symbols/folder-open',
  '@iconify/icons-material-symbols/folder-zip',
  '@iconify/icons-material-symbols/edit'
];

const iconsPack3 = [
  '@iconify/icons-ant-design/user',
  '@iconify/icons-ant-design/pie-chart-fill',
  '@iconify/icons-material-symbols/settings',
  '@iconify/icons-material-symbols/content-copy',
  '@iconify/icons-material-symbols/format-list-bulleted',
  '@iconify/icons-material-symbols/share',
  '@iconify/icons-material-symbols/drive-file-move',
  '@iconify/icons-material-symbols/close',
  '@iconify/icons-material-symbols/arrow-right-alt-rounded',
  '@iconify/icons-material-symbols/arrow-left-rounded'
];

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
          'icons/Pack3': iconsPack3,
          utils: ['lodash'],
          ...renderchinks(require('./package.json').dependencies)
        }
      }
    }
  },
  plugins: [react()]
});
