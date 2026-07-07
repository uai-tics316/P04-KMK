# PokéScan

Aplicación web para escanear, buscar, registrar y administrar cartas Pokémon.

## Funcionalidades

- Escáner asistido de cartas.
- Búsqueda de cartas usando Pokémon TCG API.
- Inventario personal de cartas.
- Gestión de cartas disponibles para intercambio.
- Estadísticas de colección.
- Interfaz moderna y responsive.

## Tecnologías usadas

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Python
- Flask
- Flask-CORS
- SQLAlchemy
- SQLite
- Requests

## Estructura del proyecto

```text
pokemon-card-scanner/
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── routes.py
│   ├── scanner.py
│   ├── statistics.py
│   ├── tcg_api.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
│
└── README.md