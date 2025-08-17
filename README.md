# My Test App

A React + TypeScript application powered by Vite.

The application is made as a playground for new projects before they evolve into larger applications.

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

**Make sure the API is running (See readme for testapi-project:**

**Install dependencies:**
   ```bash
   npm install
   ```
**Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:5173` 

## Deployment

A deployment script is provided.

   ```bash
   sh deploy.sh
   ```

## Application Pages

The application includes the following pages:

- **Home** (`/`):
  - Main landing page of the application.
  - Provides an overview and navigation to other sections.
  - Includes a form to add messages.
  - Displays a list of all messages.


- **Pokemon** (`/pokemon`):
  - Flashcard style page to learn about Pokémon.

## Notes
- Update environment variables or configuration as needed for your deployment target.
