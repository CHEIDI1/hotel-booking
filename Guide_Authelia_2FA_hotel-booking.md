# Guide pas-à-pas — Authelia (2FA) devant l'app hotel-booking

**Objectif (Grp2) :** mettre Authelia en portail d'authentification devant ton app `hotel-booking`, avec un deuxième facteur (TOTP / Google Authenticator).

**Environnement :** Windows + Docker Desktop, tout en local (pas de VPS, pas de nom de domaine acheté).

> ⚠️ Important : Authelia **exige du HTTPS**, même en local pour faire des tests — ce n'est pas optionnel. On va donc générer un certificat auto-signé. Ton navigateur va afficher un avertissement de sécurité (normal pour un certif auto-signé) — tu cliques sur "Avancé > Continuer". Tu peux même mettre une capture de cet avertissement dans ton rapport pour montrer que tu as compris pourquoi ça arrive.

## Architecture qu'on va monter

```
Navigateur
   │
   ├── https://hotel.local        → nginx → (vérifie via Authelia) → fichiers de hotel-booking
   └── https://auth.hotel.local   → nginx → portail Authelia (login + QR code 2FA)
66
Tout tourne dans 2 conteneurs Docker : nginx + authelia
```

---

## Étape 0 — Pré-requis

- [ ] **Installer Docker Desktop** : https://www.docker.com/products/docker-desktop/
  - Lance l'installeur, laisse l'option **WSL2** activée si elle est proposée.
  - Redémarre le PC si demandé.
  - Vérifie que ça marche en ouvrant un terminal (PowerShell ou Git Bash) et en tapant :
    ```
    docker --version
    docker compose version
    ```
  - 📸 **Screenshot conseillé** : la sortie de ces deux commandes.

- [ ] **Git Bash** : tu l'as déjà puisque ton projet est versionné avec git. On va l'utiliser pour les commandes (il inclut `openssl`). Si tu préfères PowerShell, ça marche aussi sauf pour la commande `openssl` (étape 4).

---

## Étape 1 — Créer la structure du projet

Dans un terminal (Git Bash), à l'endroit où tu veux ranger ça (par ex. `Documents`) :

```bash
mkdir -p authelia-demo/nginx authelia-demo/authelia authelia-demo/certs authelia-demo/app
cd authelia-demo
```

Tu devrais avoir :
```
authelia-demo/
├── nginx/
├── authelia/
├── certs/
└── app/
```
---

## Étape 2 — Builder hotel-booking en version statique

Authelia protège l'app "de l'extérieur" (en reverse proxy), donc on n'a rien à toucher dans le code de hotel-booking. On a juste besoin du build de production.

Dans le dossier de ton projet `hotel-booking` (pas `authelia-demo`) :

```bash
npm install
npm run build
```

Ça crée un dossier `dist/`. Copie son contenu dans `authelia-demo/app/dist` :

```bash
cp -r dist /chemin/vers/authelia-demo/app/
```

(Remplace `/chemin/vers/` par le vrai chemin de ton dossier `c`.)

- 📸 **Screenshot conseillé** : le terminal après `npm run build` (montre que le build a réussi) + l'explorateur de fichiers avec `app/dist/index.html` présent.

---

## Étape 3 — Modifier le fichier `hosts` de Windows

On simule deux noms de domaine en local : `hotel.local` (l'app) et `auth.hotel.local` (le portail Authelia).

1. Ouvre **Notepad en tant qu'administrateur** (clic droit sur Notepad → "Exécuter en tant qu'administrateur").
2. Ouvre le fichier : `C:\Windows\System32\drivers\etc\hosts`
3. Ajoute à la fin :
   ```
   127.0.0.1 hotel.local
   127.0.0.1 auth.hotel.local
   ```
4. Sauvegarde.

- 📸 **Screenshot conseillé** : le contenu du fichier hosts avec les deux lignes ajoutées.

---

## Étape 4 — Générer un certificat HTTPS auto-signé

Dans Git Bash, depuis le dossier `authelia-demo` :

```bash
MSYS_NO_PATHCONV=1 openssl req -x509 -nodes -newkey rsa:2048 \
  -keyout certs/key.pem -out certs/cert.pem -days 365 \
  -subj "/CN=hotel.local" \
  -addext "subjectAltName=DNS:hotel.local,DNS:auth.hotel.local"
```

> Le `MSYS_NO_PATHCONV=1` évite que Git Bash déforme le `/CN=...` en chemin Windows — c'est une bizarrerie connue de Git Bash, pas une erreur de ta part.

Tu dois maintenant avoir `certs/cert.pem` et `certs/key.pem`.

---

## Étape 5 — Le fichier `docker-compose.yml`

Crée `authelia-demo/docker-compose.yml` (avec VS Code par exemple) :

```yaml
services:
  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: unless-stopped
    ports:
      - "443:443"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
      - ./certs:/etc/nginx/certs:ro
      - ./app/dist:/usr/share/nginx/html:ro
    depends_on:
      - authelia

  authelia:
    image: authelia/authelia:latest
    container_name: authelia
    restart: unless-stopped
    volumes:
      - ./authelia:/config
    environment:
      - TZ=Africa/Dakar
```

---

## Étape 6 — La config nginx

Crée `authelia-demo/nginx/default.conf` :

```nginx
resolver 127.0.0.11 ipv6=off;

# ---------- Portail Authelia : https://auth.hotel.local ----------
server {
    listen 443 ssl;
    server_name auth.hotel.local;

    ssl_certificate     /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;

    set $upstream_authelia_portal http://authelia:9091;

    location / {
        proxy_pass $upstream_authelia_portal;
        proxy_set_header Host $host;
        proxy_set_header X-Original-URL $scheme://$host$request_uri;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-URI $request_uri;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}

# ---------- Application protégée : https://hotel.local ----------
server {
    listen 443 ssl;
    server_name hotel.local;

    ssl_certificate     /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;

    set $upstream_authelia http://authelia:9091/api/authz/auth-request;

    # Sous-requête interne qui demande à Authelia "cet utilisateur a le droit ou pas ?"
    location /internal/authelia/authz {
        internal;
        proxy_pass $upstream_authelia;
        proxy_set_header X-Original-Method $request_method;
        proxy_set_header X-Original-URL $scheme://$host$request_uri;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-URI $request_uri;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Content-Length "";
        proxy_set_header Connection "";
        proxy_pass_request_body off;
    }

    location / {
        auth_request /internal/authelia/authz;
        auth_request_set $redirection_url $upstream_http_location;
        error_page 401 =302 $redirection_url;

        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

C'est le mécanisme `auth_request` de nginx : chaque requête vers `hotel.local` déclenche une "sous-question" à Authelia avant d'être servie. Si Authelia dit non, nginx redirige vers le portail.

---

## Étape 7 — La config Authelia

Crée `authelia-demo/authelia/configuration.yml` :

```yaml
server:
  address: 'tcp://:9091'

log:
  level: 'debug'

totp:
  issuer: 'hotel.local'

identity_validation:
  reset_password:
    jwt_secret: 'remplace_moi_par_une_longue_chaine_aleatoire'

authentication_backend:
  file:
    path: '/config/users_database.yml'

access_control:
  default_policy: 'deny'
  rules:
    - domain: 'hotel.local'
      policy: 'two_factor'

session:
  secret: 'remplace_moi_aussi_par_autre_chose_de_long'
  cookies:
    - name: 'authelia_session'
      domain: 'hotel.local'
      authelia_url: 'https://auth.hotel.local'
      default_redirection_url: 'https://hotel.local'

regulation:
  max_retries: 3
  find_time: '2 minutes'
  ban_time: '5 minutes'

storage:
  encryption_key: 'remplace_moi_par_une_chaine_de_plus_de_20_caracteres'
  local:
    path: '/config/db.sqlite3'

notifier:
  filesystem:
    filename: '/config/notification.txt'
```

> Remplace les 3 valeurs `remplace_moi_...` par tes propres chaînes aléatoires (juste pour la démo, pas besoin d'être ultra rigoureux, mais évite de laisser le texte tel quel — c'est justement le genre de chose qu'on critique dans un audit "Authentification Forte" 😉).

`policy: 'two_factor'` est la ligne clé : c'est elle qui impose le 2FA pour accéder à `hotel.local`.

---

## Étape 8 — Créer un utilisateur + générer le mot de passe

D'abord, génère le hash du mot de passe (remplace `MonMotDePasse123` par le tien) :

```bash
docker run --rm authelia/authelia:latest authelia crypto hash generate argon2 --password 'MonMotDePasse123'
```

Ça t'affiche un hash qui commence par `$argon2id$...`. Copie-le.

Crée `authelia-demo/authelia/users_database.yml` :

```yaml
users:
  cheikh:
    displayname: 'Cheikh'
    password: '$argon2id$v=19$m=65536,t=3,p=4$e/ZGRtR4qyen9xq7tSu4Yw$n2DZgZhdjYoqPLxL4sLQHNjMJYpzCQBievjYyqf/XbU'  
    email: 'cheikh@hotel.local'
    groups:
      - 'admins'
```

- 📸 **Screenshot conseillé** : le terminal montrant la génération du hash.

---

## Étape 9 — Lancer le tout

Depuis `authelia-demo` :

```bash
docker compose up -d
docker compose ps
docker compose logs authelia
```

Vérifie dans les logs qu'Authelia démarre sans erreur (pas de ligne `level=fatal` ou `level=error`).

- 📸 **Screenshot conseillé** : `docker compose ps` montrant les 2 conteneurs `Up`, + Docker Desktop qui montre les 2 conteneurs actifs.

---

## Étape 10 — Premier accès

1. Ouvre ton navigateur sur **https://hotel.local**
2. Accepte l'avertissement de certificat (auto-signé → normal).
   - 📸 **Screenshot** : l'avertissement de sécurité du navigateur.
3. Tu es redirigé automatiquement vers `https://auth.hotel.local` → le portail de connexion Authelia.
   - 📸 **Screenshot** : la page de login Authelia.
4. Connecte-toi avec `cheikh` / ton mot de passe.

---


## Étape 11 — Enregistrer la 2FA (Google Authenticator)

Comme on n'a pas configuré d'envoi d'e-mail (pas de serveur SMTP), Authelia écrit le lien d'enregistrement dans un fichier :

```bash
cat authelia-demo/authelia/notification.txt
```

1. Copie le lien qui apparaît, colle-le dans ton navigateur (toujours dans la session où tu es connecté).
2. Authelia affiche un **QR code TOTP**.
   - 📸 **Screenshot** : le QR code affiché par Authelia.
3. Ouvre **Google Authenticator** sur ton téléphone → "+" → "Scanner un QR code" → scanne.
   - 📸 **Screenshot** : Google Authenticator avec le compte "hotel.local" ajouté et son code à 6 chiffres.
4. Entre le code à 6 chiffres affiché par l'appli pour confirmer l'enregistrement.
   - 📸 **Screenshot** : l'écran de confirmation Authelia.

---

## Étape 12 — Vérifier que ça marche vraiment

- [ ] Ferme complètement le navigateur (ou ouvre une fenêtre privée), retourne sur `https://hotel.local`.
- [ ] Tu dois retomber sur le login Authelia → entre user/mot de passe → puis Authelia te demande **le code TOTP**.
  - 📸 **Screenshot** : l'écran qui demande le code OTP (preuve que le 2FA est bien exigé, pas juste enregistré).
- [ ] Entre le code affiché sur Google Authenticator → tu arrives enfin sur ton app hotel-booking.
  - 📸 **Screenshot** : la page d'accueil de hotel-booking, avec l'URL `https://hotel.local` visible dans la barre d'adresse.

**Bonus pour le rapport** : essaie d'aller sur `https://hotel.local` dans un navigateur où tu n'es jamais connecté → montre que tu es bloqué/redirigé tant que tu n'as pas passé les 2 facteurs. C'est la meilleure preuve que l'accès est "sécurisé et centralisé" comme demandé dans l'objectif.

---

## Récap des captures à inclure dans le rapport

1. `docker --version` / `docker compose version`
2. `npm run build` réussi
3. Fichier `hosts` modifié
4. `docker compose ps` → 2 conteneurs up
5. Avertissement certificat auto-signé
6. Page de login Authelia (1er facteur)
7. QR code TOTP
8. Google Authenticator avec le compte ajouté
9. Demande du code OTP (2e facteur)
10. Accès réussi à hotel-booking après les 2 facteurs
11. (Bonus) Tentative d'accès bloquée sans authentification

---

## Pour aller plus loin / questions probables du jury

- **"Pourquoi Authelia et pas Keycloak ?"** → Authelia est plus léger (1 conteneur), pensé spécifiquement pour le "forward auth" devant un reverse proxy ; Keycloak est un IAM complet (SSO, OIDC, gestion d'utilisateurs avancée, fédération) mais plus lourd à opérer pour un seul site.
- **"Et en prod ?"** → remplacer le certificat auto-signé par un vrai certificat (Let's Encrypt), mettre les secrets (`jwt_secret`, `session.secret`, `storage.encryption_key`) dans des fichiers secrets plutôt qu'en clair dans `configuration.yml`, et configurer un vrai SMTP pour l'envoi des liens 2FA/reset password.
- **"Pourquoi `two_factor` et pas `one_factor` ?"** → c'est la règle `access_control` qui définit le niveau de sécurité par domaine ; on peut très bien avoir `bypass` pour une page publique et `two_factor` uniquement pour une zone sensible (ex. `/admin`).

Bon courage pour les screenshots 🙂
