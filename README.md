# Khabribaba.com Local Development Guide

## 1. Prerequisites
- XAMPP (PHP 8.1+, MySQL)
- Node.js 18+
- Windows 10/11

## 2. Database Setup
- Open phpMyAdmin: http://localhost/phpmyadmin
- Create database: `khabribaba`
- Import `khabribaba.sql` if provided.

## 3. Hosts File
- Edit `C:\Windows\System32\drivers\etc\hosts`:
  ```
  127.0.0.1 khabribaba.com
  ```

## 4. SSL Setup
- See `xampp_ssl_setup.md`

## 5. Strapi CMS
- `cd cms`
- Copy `.env.example` to `.env` and set DB credentials.
- `npm install`
- `npm run develop`
- Access: https://khabribaba.com/cms/admin
- Create initial admin user on first run.

## 6. Next.js Frontend
- `cd frontend`
- Copy `.env.local.example` to `.env.local`
- `npm install`
- `npm run dev:xampp`
- Access: https://khabribaba.com

## 7. Troubleshooting
- **Port Conflicts:** Make sure ports 3000 (Next.js), 1337 (Strapi), 443 (Apache) are free.
- **CORS:** Strapi `config/middlewares.js` should allow `https://khabribaba.com`
- **Filesystem Permissions:** Run editors/terminals as Administrator if needed.

## 8. Migration to Production
- Use environment variables for DB, API URLs.
- Deploy Strapi and Next.js to cloud (Vercel, DigitalOcean, etc).
- Update DNS and SSL certs for production. 