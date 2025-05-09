# Local SSL Setup for khabribaba.com (XAMPP, Windows)

1. **Generate Self-Signed Certificate:**
   ```
   cd D:\xampp\apache
   mkdir conf\ssl.crt conf\ssl.key
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout conf\ssl.key\khabribaba.key -out conf\ssl.crt\khabribaba.crt
   ```
   - Common Name: `khabribaba.com`

2. **Trust Certificate in Windows:**
   - Double-click `khabribaba.crt` → Install Certificate → Local Machine → Trusted Root Certification Authorities.

3. **Update `xampp_vhosts.conf`** (see included sample).

4. **Restart Apache via XAMPP Control Panel.**

5. **Next.js HTTPS Dev Server:**
   - Use `dev:xampp` script in `frontend/package.json`.

6. **Strapi SSL Proxy:**
   - Strapi runs on HTTP, but is reverse-proxied via Apache SSL.

7. **Troubleshooting:**
   - If browser warns about SSL, ensure cert is trusted and hosts file is set. 