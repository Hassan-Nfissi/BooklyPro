# BooklyPro 🇲🇦 — Plateforme SaaS de Réservation en Ligne

> **La solution de prise de rendez-vous en ligne moderne pour les professionnels de service au Maroc** (salons de coiffure, barbershops, instituts de beauté, spas, coachs).

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java 17 LTS](https://img.shields.io/badge/Java-17%20LTS-orange.svg)](https://openjdk.org/)
[![React 18](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan.svg)](https://tailwindcss.com/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose%20Ready-2496ED.svg)](https://www.docker.com/)

---

## 🏆 Points Forts & Architecture

1. **OAuth "Token Exchange" (Popup ➔ Backend Verify)** :
   - Fini le calvaire des redirections Spring OAuth2 et des URL de callback.
   - Le frontend utilise `@react-oauth/google` pour ouvrir une popup Google, récupérer le jeton `id_token`, et l'envoyer à `POST /api/v1/auth/google`.
   - Le backend vérifie la signature Google via `GoogleIdTokenVerifier` en 3 lignes et génère le jeton JWT SaaS.
   - **Les Redirect URIs dans Google Cloud Console restent 100% vides !**
2. **Bouton 1-Clic "Dev Login"** :
   - Présent sur l'écran de connexion (`POST /api/v1/auth/dev-login`), il permet d'accéder instantanément au compte démo propriétaire sans ouvrir de popup Google.
3. **Moteur de Disponibilité & Zéro Collision (Anti-Overlap)** :
   - Calcul dynamique des créneaux en tenant compte des horaires d'ouverture, des pauses (`buffer`), des congés (`time_off`) et du délai minimum de prévenance.
   - Verrouillage transactionnel (`REPEATABLE_READ` + contrôle de collision) : en cas de tentative concurrente sur le même créneau, le serveur renvoie une erreur `409 Conflict`.
4. **Prêt pour le marché marocain** :
   - Devise par défaut : **MAD** (Dirham marocain).
   - Fuseau horaire : `Africa/Casablanca`.
   - Villes marocaines (Casablanca, Rabat, Fès, Marrakech, Tanger, Agadir).

---

## 📦 Structure du Projet

```
BooklyPro/
├── docker-compose.yml          # Déploiement complet (PostgreSQL + Backend + Frontend Nginx)
├── .env.example                # Variables d'environnement pour EC2 / Production
├── IMPLEMENTATION_CHECKLIST.md # Suivi des fonctionnalités MVP
├── server/                     # Backend Spring Boot 3.3.5 (Java 17 LTS)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│       ├── main/resources/db/migration/
│       │   ├── V1__init_schema.sql      # Schéma Flyway
│       │   └── V2__seed_demo_data.sql   # Données démo "Salon Amina" (Fès)
│       └── test/java/com/booklypro/     # Tests unitaires & concurrence (5 tests)
└── client/                     # Frontend React 18 + Vite + Tailwind CSS
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── context/AuthContext.tsx      # Google Token Exchange & Dev Login
        ├── pages/Dashboard*.tsx         # Tableau de bord propriétaire
        ├── pages/PublicBookingPage.tsx  # Page publique de réservation (/book/:slug)
        └── pages/BookingConfirmedPage.tsx # Écran de confirmation de réservation
```

---

## 🚀 Démarrage Rapide

### Option 1 : Déploiement en 1 commande avec Docker Compose (Idéal pour EC2)

```bash
# 1. Cloner le dépôt sur votre instance EC2
git clone https://github.com/Hassan-Nfissi/BooklyPro.git
cd BooklyPro

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Lancer l'application
docker compose up -d --build
```
* **Frontend** : Accessible sur le port `80` (`http://localhost` ou l'IP de votre EC2).
* **Backend API** : Accessible sur le port `8080`.
* **PostgreSQL** : Accessible sur le port `5432`.

---

### Option 2 : Lancement Local (Développement)

#### 1. Backend (Spring Boot 3 + Java 17)
Le profil `dev` utilise une base de données en mémoire H2 avec compatibilité PostgreSQL et exécute automatiquement les migrations Flyway. Aucune base externe requise !

```bash
cd server
mvn spring-boot:run
```
*Le serveur démarre sur `http://localhost:8080`.*

#### 2. Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```
*L'interface démarre sur `http://localhost:5173`.*

---

## 🔑 Compte Démo Pré-Configuré

Une entreprise de test à Fès est pré-alimentée dans la base de données :
* **Établissement** : Salon Amina (Fès)
* **Lien public de réservation** : `http://localhost:5173/book/salon-amina`
* **Email propriétaire** : `owner@salonamina.ma`
* **Mot de passe** : `password123`
* **Ou via l'interface** : Cliquez simplement sur **"1-Clic Démo (Salon Amina, Fès)"** sur la page de connexion.

---

## 🧪 Tests & Vérification

### Backend (Spring Boot)
Exécuter la suite de tests automatisée (calcul des créneaux, exclusion des dimanches fermés, détection des conflits de réservation 409 Conflict, isolation des comptes propriétaires) :

```bash
cd server
mvn test
```
**Résultat :** `Tests run: 5, Failures: 0, Errors: 0, Skipped: 0` (BUILD SUCCESS).

### Frontend (Type-check & Build)
```bash
cd client
npm run build
```
**Résultat :** `✓ 1648 modules transformed. Built in dist/` (0 erreur).

---

## 📄 Licence
Ce projet est développé dans le cadre du SaaS BooklyPro. Tous droits réservés.
