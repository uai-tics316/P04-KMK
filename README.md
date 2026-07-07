# PokéScan

Aplicación web para gestionar una colección de cartas Pokémon. Permite buscar cartas mediante la Pokémon TCG API, agregarlas a un inventario, administrar intercambios y visualizar estadísticas de la colección.

---

##  Funcionalidades

-  Escáner asistido de cartas.
-  Búsqueda de cartas usando la Pokémon TCG API.
-  Inventario de cartas.
-  Gestión de cartas disponibles para intercambio.
-  Estadísticas de la colección.
-  Actualización automática de la cantidad cuando se agrega una carta repetida.
-  Interfaz moderna desarrollada con React.

---

##  Tecnologías utilizadas

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

### APIs

- Pokémon TCG API

---

##  Estructura del proyecto

```text
pokemon-card-scanner/
│
├── backend/
│   ├── app.py
│   ├── routes.py
│   ├── models.py
│   ├── database.py
│   ├── scanner.py
│   ├── tcg_api.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

#  Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
```

Entrar al proyecto:

```bash
cd TU-REPOSITORIO
```

---

## 2. Instalar el Backend

Entrar a la carpeta backend:

```bash
cd backend
```

Crear el entorno virtual:

### Windows

```bash
python -m venv venv
```

Activarlo:

```bash
venv\Scripts\activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

---

## 3. Ejecutar el Backend

```bash
python app.py
```

El backend estará disponible en:

```
http://127.0.0.1:5000
```

---

## 4. Instalar el Frontend

Abrir otra terminal.

Entrar a frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

---

## 5. Ejecutar el Frontend

```bash
npm run dev
```

Abrir el navegador en:

```
http://localhost:5173
```

---

#  Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/scanner` | Escáner asistido |
| `/inventory` | Inventario |
| `/trade` | Intercambios |
| `/stats` | Estadísticas |
| `/add-card` | Búsqueda manual |



#  Mejoras futuras

- Escaneo automático mediante visión por computadora.
- Autenticación de usuarios.
- Compartir inventarios.
- Exportación a CSV.
- Dashboard con gráficos interactivos.
- Sincronización con una base de datos remota.


