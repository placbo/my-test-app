# My Test App

A React + TypeScript application powered by Vite.

## Project Structure

```
.
├── public/        # Static assets
├── src/           # Source code
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   └── main files   # Entry points and config
├── package.json   # Project dependencies and scripts
├── vite.config.ts # Vite configuration
├── deploy.sh      # Deployment script
```

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

## Deployment

A deployment script (`deploy.sh`) is provided. You may need to adjust it for your hosting environment.

1. **Build the application:**
   ```bash
   npm run build
   ```
2. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```
   Ensure you have executable permissions:
   ```bash
   chmod +x deploy.sh
   ```

## Application Pages

The application includes the following pages:

- **Home** (`/`):
  - Main landing page of the application.
  - Provides an overview and navigation to other sections.
  - Includes a form to add messages.
  - Displays a list of all messages.

- **About** (`/about`):
  - Contains information about the application or project.
  - May include team details, purpose, or background.

- **Pokemon** (`/pokemon`):
  - Displays Pokémon-related content or features.
  - May show a list, details, or search functionality for Pokémon.

- **NotFound** (any undefined route):
  - Shown when a user navigates to a non-existent page.
  - Displays a 404 error or friendly message.

## Notes
- Update environment variables or configuration as needed for your deployment target.
- For more details, see the source files and comments.
