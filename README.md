# K-Cloud-Frontend (Client) for K-Cloud

## Why

I DO NOT WANT TO USE NEXT CLOUD

## Setup

1. Install Dependencies

```bash
npm install
```

2. Setup Environment Variables (see `.env.example`)

### Environment Variables

- **VITE_API_URL** (type: string)
  
  URL of the cloud API
  
  Example:
  ```env
  VITE_API_URL="http://localhost"
  ```

- **VITE_API_PORT** (type: number or string)
  
  Port of the API cloud
  
  Example:
  ```env
  VITE_API_PORT=3000
  ```

- **VITE_API_AUTO** (type: boolean)
  
  Set up the port of the API cloud automatically (`window.origin`), use the **VITE_API_PORT**
  
  Example:
  ```env
  VITE_API_AUTO=true
  ```

3. Development Mode

To run the application in development mode:

```bash
npm run dev
```

4. Production Build

Build the application:
```bash
npm run build
```

Once built, you can preview the production build:
```bash
npm run preview
```

To deploy, upload the contents of the `dist` directory to your web server.
