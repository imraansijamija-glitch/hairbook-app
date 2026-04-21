# HairBook App

HairBook je full-stack web aplikacija za rezervaciju termina kod frizera.  
Aplikacija omogućava korisnicima registraciju i prijavu putem Firebase autentifikacije, pregled dostupnih usluga, rezervaciju termina, pregled svojih rezervacija, izmjenu i brisanje termina.

## Funkcionalnosti

- Registracija korisnika
- Prijava korisnika
- Firebase autentifikacija
- Pregled frizerskih usluga
- Rezervacija termina
- Prikaz vlastitih termina
- Izmjena termina
- Brisanje termina

## Korištene tehnologije

- HTML
- CSS
- JavaScript
- PHP
- MySQL
- Firebase Authentication
- XAMPP

## Struktura baze podataka

Aplikacija koristi 3 glavne tabele:

- `users`
- `services`
- `appointments`

## Pokretanje projekta

1. Preuzeti projekat sa GitHub-a
2. Folder `hairbook` smjestiti u `htdocs`
3. Pokrenuti Apache i MySQL u XAMPP-u
4. Kreirati bazu podataka `hairbook`
5. Importovati ili ručno kreirati tabele:
   - `users`
   - `services`
   - `appointments`
6. U Firebase-u omogućiti **Email/Password** autentifikaciju
7. Pokrenuti projekat preko:
   - `http://localhost/hairbook/index.html`

## Glavni fajlovi

- `index.html` – početna stranica
- `login.html` – prijava korisnika
- `register.html` – registracija korisnika
- `dashboard.html` – pregled usluga i termina
- `firebase.js` – Firebase autentifikacija
- `app.js` – logika aplikacije
- `php/` – backend fajlovi
- `screenshots/` – screenshotovi aplikacije
- `dokumentacija.docx` – dokumentacija projekta

## Autor

Imraan Sijamija


