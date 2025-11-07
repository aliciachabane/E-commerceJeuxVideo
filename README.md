Alicia Chabane


# 🎮 Game Zone

Game Zone est une application e-commerce permettant d'acheter des jeux vidéo en ligne.  
L’utilisateur peut parcourir le catalogue, consulter les détails des jeux, et les ajouter à son panier pour les acheter.

---

## 🛠️ Technologies utilisées

- **Laravel** (Backend)
- **React** + **Inertia.js** (Frontend)
- **SQLite** (Base de données)
- **Vite** (Bundler)

---

## ✨ Fonctionnalités

- Affichage d'un catalogue de jeux
- Détails d’un jeu (description, image, prix, etc.)
- Gestion du panier
- Interface utilisateur dynamique avec React + Inertia

---

## 🚀 Installation et lancement

Assurez-vous d'avoir **PHP**, **Composer**, **Node.js** et **SQLite** installés.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
npm run dev
