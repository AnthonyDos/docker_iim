# 🚀 docker_iim – Application Fullstack (Frontend + Backend)

Ce projet est une application fullstack simple avec un **frontend Vite js** et un **backend Node.js (Express + SQLite)**. 
L’environnement est conteneurisé avec **Docker** pour faciliter le développement et le déploiement.

---

## 📁 Structure du projet

```
.
├── backend
│   ├── Dockerfile
│   ├── index.js
│   └── data/
├── frontend
│   ├── Dockerfile
│   └── src/
├── docker-compose.local.prod.yml
├── README.md
```

---

## Lancement en local sans docker
### Backend
cd backend
npm install         
# Démarre le serveur sur http://localhost:5001
npm start           

### Frontend
cd frontend
npm install         
# Lance le serveur Vite sur http://localhost:5173
npm run dev         

---

## ⚙️ Lancement avec Docker

Assurez-vous que **Docker** et **Docker Compose** sont installés sur votre machine.

### 1. Build et lancement

```bash
docker-compose -f docker-compose.local.prod.yml up --build
```

Accès en local:

- **Frontend** : http://localhost:3000
- **Backend** : http://localhost:5001/api/tasks

## Les différentes commandes utiles au projet.
### 2. Arrêter les conteneurs

```bash
docker-compose -f docker-compose.local.prod.yml down
```

---

## 🌐 Déploiement sur Render

-Backend 
-Frontend

**Important :** Dans le frontend, modifiez l’URL de l’API pour qu’elle pointe sur votre backend Render :
```js
const API_BASE_URL = "https://docker-iim.onrender.com/api";
```

---

## 🔄 Commandes Docker principales

### Conteneurs

```bash
# Lister les conteneurs
docker ps  
# Voir tous les conteneurs                   
docker ps -a   
# Stopper un conteneur              
docker stop <id>        
# Supprimer un conteneur    
docker rm <id>              
```

### Images

```bash
# Voir les images
docker images    
# Supprimer une image            
docker rmi <id>         
# Créer une image   
docker build -t nom:tag .   
```

### Interactif

```bash
docker exec -it <container> bash
```

### Docker Hub

```bash
# Il faut d'abord se connecter
docker login                            
# Taguer une image      
docker tag monimage "votre_identifiant"/monimage:tag  
# Pousser sur Docker Hub
docker push "votre_identifiant"/monimage:tag          
```

---

## 🧪 Exemple de requêtes API (Backend)

- `GET /api/tasks` : Liste des tâches
- `POST /api/tasks` : Créer une tâche
- `DELETE /api/tasks/:id` : Supprimer une tâche

---

## ✅ À faire

- [ ] Ajouter une route `/healthz` pour le monitoring Render
- [ ] Ajouter un système de persistance distant (PostgreSQL, MongoDB)
- [ ] Déployer sur un domaine personnalisé

---

## 👨‍💻 Auteurs

- Victor Lemercier et Anthony Dos Santos 