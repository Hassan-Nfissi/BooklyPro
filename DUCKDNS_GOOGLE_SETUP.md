# Guide de Configuration DuckDNS (HTTPS gratuit) & Google Client ID pour BooklyPro

Ce guide vous accompagne pas à pas pour :
1. Obtenir un domaine gratuit avec **DuckDNS** pointant vers votre serveur AWS EC2 (`51.20.78.4`).
2. Activer le **HTTPS automatique et gratuit** (certificat SSL Let's Encrypt via Caddy).
3. Configurer votre **Google Client ID** pour permettre la connexion Google OAuth sans aucune erreur de redirection.

---

## 📋 Prérequis
- Votre serveur AWS EC2 : `51.20.78.4`
- Accès terminal SSH à votre serveur : `ubuntu@51.20.78.4`

---

## 🦆 Étape 1 : Créer votre domaine DuckDNS (Gratuit en 2 minutes)

1. Rendez-vous sur [https://www.duckdns.org](https://www.duckdns.org).
2. Connectez-vous avec votre compte Google ou GitHub.
3. Dans la section **domains** :
   - Choisissez un sous-domaine pour votre SaaS (exemple : `booklypro-ma` ou `mon-salon`).
   - Cliquez sur **add domain**.
4. Dans le champ **current ip** en face de votre domaine :
   - Saisissez l'adresse IP publique de votre EC2 : `51.20.78.4`.
   - Cliquez sur **update ip**.
5. Notez votre domaine complet : par exemple **`booklypro-ma.duckdns.org`**.
6. Notez également votre **token** DuckDNS affiché en haut de la page (utile pour l'auto-update).

> **Test rapide sur votre terminal :**
> ```bash
> ping booklypro-ma.duckdns.org
> # Vous devez voir des réponses provenant de 51.20.78.4
> ```

---

## 🔒 Étape 2 : Ouvrir les ports 80 et 443 sur AWS EC2

Pour que Let's Encrypt puisse générer le certificat SSL et que les utilisateurs accèdent en HTTPS :
1. Rendez-vous sur la console **AWS EC2** > **Instances**.
2. Cliquez sur votre instance > onglet **Sécurité (Security)**.
3. Cliquez sur le nom du **Groupe de sécurité (Security Group)**.
4. Cliquez sur **Modifier les règles de trafic entrant (Edit inbound rules)**.
5. Ajoutez les deux règles suivantes si elles ne sont pas déjà présentes :
   - **Type :** `HTTP` | **Port :** `80` | **Source :** `0.0.0.0/0` (Anywhere-IPv4)
   - **Type :** `HTTPS` | **Port :** `443` | **Source :** `0.0.0.0/0` (Anywhere-IPv4)
6. Cliquez sur **Enregistrer les règles (Save rules)**.

---

## 🌐 Étape 3 : Créer et Configurer le Google Client ID

Google exige une origine en **HTTPS** (il refuse les adresses IP pures comme `http://51.20.78.4`). Grâce à votre domaine DuckDNS, tout fonctionnera sans encombre.

### 1. Activer l'écran de consentement OAuth
1. Rendez-vous sur la [Google Cloud Console](https://console.cloud.google.com).
2. Créez un projet ou sélectionnez votre projet existant (ex: `BooklyPro`).
3. Allez dans **API et services** > **Écran de consentement OAuth** :
   - Type d'utilisateur : **Externe** (External) > cliquez sur **Créer**.
   - Nom de l'application : `BooklyPro`
   - Adresse e-mail d'assistance utilisateur : votre adresse e-mail.
   - Domaines autorisés (Authorized domains) : ajoutez `duckdns.org`.
   - Coordonnées du développeur : votre adresse e-mail.
   - Cliquez sur **Enregistrer et continuer** (laissez les champs facultatifs par défaut).

### 2. Créer l'identifiant OAuth
1. Allez dans **API et services** > **Identifiants** (Credentials).
2. Cliquez sur **+ CRÉER DES IDENTIFIANTS** > **ID client OAuth**.
3. Type d'application : **Application Web**.
4. Nom : `BooklyPro Web Client`.
5. **Origines JavaScript autorisées (Authorized JavaScript origins) :**
   - Cliquez sur **+ AJOUTER UN URI**.
   - Ajoutez l'URL complète en HTTPS :
     ```text
     https://booklypro-ma.duckdns.org
     ```
     *(Remplacez par votre vrai sous-domaine DuckDNS. Ne mettez PAS de slash `/` à la fin).*
   - *(Optionnel pour vos tests en local)* : ajoutez `http://localhost:5173`.
6. **URI de redirection autorisés (Authorized redirect URIs) :**
   - **LAISSEZ TOTALEMENT VIDE !**
   - *Rappel :* BooklyPro utilise l'échange de token direct par Popup JavaScript (`Token Exchange`). Aucun paramètre de redirection n'est nécessaire.
7. Cliquez sur **CRÉER**.
8. Une fenêtre s'ouvre avec votre **ID client** (ressemble à `1234567890-abcdefgh.apps.googleusercontent.com`). Copiez-le.

---

## 🚀 Étape 4 : Déployer sur votre serveur EC2

Connectez-vous à votre serveur EC2 :
```bash
ssh -i /chemin/vers/votre-cle.pem ubuntu@51.20.78.4
```

Allez dans le dossier BooklyPro :
```bash
cd ~/BooklyPro

# 1. Récupérer les nouveaux fichiers (Caddyfile, docker-compose HTTPS, scripts)
git pull origin main

# 2. Éditer votre fichier .env
nano .env
```

Dans votre `.env`, configurez votre domaine et votre Google Client ID :
```ini
# Domaine & SSL automatique
DOMAIN_NAME=booklypro-ma.duckdns.org
ACME_EMAIL=votre-email@gmail.com

# Google OAuth
GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com

# CORS
CORS_ALLOWED_ORIGINS=https://booklypro-ma.duckdns.org,http://localhost:5173

# Frontend
VITE_API_URL=/api/v1
VITE_GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
```
*(Appuyez sur `Ctrl+O` puis `Entrée` pour sauvegarder, puis `Ctrl+X` pour quitter).*

Lancez ensuite la mise à jour des conteneurs :
```bash
docker compose up -d --build
```

---

## ✅ Étape 5 : Vérification & Test

1. Ouvrez votre navigateur et saisissez :
   ```text
   https://booklypro-ma.duckdns.org
   ```
2. Vous devriez constater :
   - Le **cadenas de sécurité SSL vert/sécurisé 🔒** délivré gratuitement par Let's Encrypt.
   - Les requêtes HTTP vers le port 80 sont automatiquement redirigées vers HTTPS.
3. Cliquez sur **Connexion** :
   - Cliquez sur le bouton officiel Google **"Se connecter avec Google"**.
   - La popup s'ouvre et se ferme instantanément après validation de votre compte Google.
   - Vous êtes redirigé directement vers votre tableau de bord SaaS !
