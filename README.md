# dieRezepteDB
Rezepte für gesunde Ernährung

### Pyhton

- Recommended venv (Virtual Enviroment)
command: python -m venv .venv
.venv\Scripts\activate
deactivate (dont forget)

- Requirements
pip install -r requirements.txt
pip freeze > requirements.txt

- Run the API
python backend\app.py
CTR+C (stopping)

- or with venv 
.venv\Scripts\python.exe backend\app.py
CTR+C (stopping)

+ Note:
- If Problems with Backend, open backend/backup and run myMealAPI.py with python and all requirements installed.
- myMealAPI.py is the backend before the restructuring of the backend.

+ Migrations are not tested yet, but if database needs to be updated based on the Models classes, that run the commands in the flask environment.
+ Be careful data can be lost if migration done the wrong way ! (make backup before changing stuff)

### React / Vite

- npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @toolpad/core vite@latest react-router-dom
- npm run dev