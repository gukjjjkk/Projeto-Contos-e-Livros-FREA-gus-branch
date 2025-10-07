# Copilot Instructions for Projeto Contos e Livros

## Overview
This project is a full-stack application for managing literary works, authors, illustrators, publishers, and user interactions. It consists of two main components:
- **API/**: Node.js backend (Express, MySQL) for data management and business logic
- **client/**: React frontend (Create React App) for user interface

## Architecture & Data Flow
- **API** exposes REST endpoints under `/api/*` for entities like obras (works), autores (authors), ilustradores (illustrators), editora (publishers), palavras-chave (keywords), usuarios (users), acessos (access logs), favoritos, and login.
- Each entity has a dedicated route (`API/routes/`) and controller (`API/controllers/`). Controllers handle DB logic, including conditional creation of related entities (see `obras.js`).
- Database connection is managed via a MySQL pool in `API/db.js`, with credentials from `.env`.
- Cross-entity relationships (e.g., obra with autor, editora, ilustrador) are handled in controller logic, not via ORM.
- Utility functions (e.g., associarPalavrasChave) are in `API/utils/`.

## Developer Workflows
- **API**: Start with `npm start` (uses nodemon, see `API/package.json`). Main entry: `API/index.js`.
- **client**: Start with `npm start` in `client/` (see `client/README.md`).
- No automated tests are present for API; client uses Create React App's test runner (`npm test`).
- Environment variables for DB and server config are in `API/.env`.

## Project-Specific Patterns
- **Conditional Entity Creation**: When creating an obra, related entities (autor, editora, ilustrador) are created if not found, then re-queried for their IDs. See `API/controllers/obras.js` for the pattern.
- **Default Values**: Image paths default to `/imagens/default.jpg` if not provided.
- **Error Handling**: API controllers return detailed error messages and HTTP status codes (400, 409, 500).
- **Route Naming**: REST endpoints use plural, PascalCase (e.g., `/api/ObrasAcessadas`, `/api/Usuarios`).
- **Frontend**: Components are in `client/src/components/`. Main pages are in `client/src/`.

## Integration Points
- **Database**: MySQL, accessed via `mysql2/promise` (see `API/db.js`).
- **Authentication**: Login logic in `API/controllers/loginUsuario.js` and `API/routes/Login.js`.
- **Password Handling**: Uses bcrypt (see `API/utils/senhaUser.js`).
- **CORS**: Enabled globally in API (`API/index.js`).

## Examples
- To add a new obra, POST to `/api/obras` with all required fields. See `API/controllers/obras.js` for expected payload and logic.
- To add new entity types, create corresponding route and controller files, then register in `API/index.js`.

## Key Files & Directories
- `API/index.js`: API entry point and route registration
- `API/controllers/`: Business logic for each entity
- `API/routes/`: Route definitions
- `API/db.js`: Database connection
- `API/utils/`: Utility functions
- `client/src/`: React app source

---
If any section is unclear or missing, please provide feedback to improve these instructions.
