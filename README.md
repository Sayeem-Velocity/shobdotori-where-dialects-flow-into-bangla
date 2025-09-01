# Shobdotori – Dialect to Bangla Speech Collection

Shobdotori is a web-based platform for collecting and storing audio recordings of Bangla dialects.
It has a **frontend** (user interface) and a **backend** (API + database) that work together.

---

## Project Structure

```
SHOBDOTORI/
│── api/               # Backend PHP API scripts (ping.php, upload.php, etc.)
│── audio/             # Saved audio recordings (STORAGE_DIR points here)
│── css/               # Stylesheets for frontend
│── images/            # Icons and logos used in UI
│── js/                # Frontend logic (app.js handles recording & upload)
│── index.html         # Main frontend (for Netlify or local hosting)
│── index.php          # Alternative frontend (if served with PHP backend)
│── .htaccess          # Apache configuration (CORS/routing)
│── config.php         # Backend config (DB + storage + ffmpeg paths)
```

---

## Frontend

* **File:** `index.html` (or `index.php` if using PHP backend)

* **Tech:** HTML, CSS, JavaScript

* **Features:**

  * User selects a dialect (`dropdown`)
  * Reads sentences shown on screen
  * Clicks **Start Recording** → speaks the sentence → clicks **Stop Recording**
  * Browser saves recording temporarily and uploads it via `app.js`

* **Location:**
  Can be hosted on **Netlify**, or served locally with `index.html`.

---

## Backend

* **Folder:** `api/`

* **Config:** `config.php`

* **Tech:** PHP (XAMPP/Apache)

* **Key API Endpoints:**

  * `/api/ping.php` → check if backend is running
  * `/api/next-index.php` → get next available index for a dialect
  * `/api/upload.php` → receive audio + metadata, save to disk + database

* **Database:** MySQL (`shobdotori` → `recordings` table)

* **DB fields:** `id`, `dialect`, `index_no`, `filename`, `rel_path`, `absolute_path`, `mime`, `bytes`, `created_at`

---

## Audio Storage

* **Directory:** `audio/`
* **Configured in:** `config.php`

```php
define('STORAGE_DIR', 'D:/BanglaSpeechUI/audio'); 
```

* **File format:** WAV/WebM converted to WAV using `ffmpeg`

* **Naming:**

  ```
  dialect/dialect_train (0).wav
  dialect/dialect_train (1).wav
  ...
  ```

* Example:

  ```
  audio/mymensingh/mymensingh_train (0).wav
  audio/dhaka/dhaka_train (1).wav
  ```

---

## Deployment Options

1. **Local Development (XAMPP + MySQL + Apache)**

   * Place `SHOBDOTORI/` inside `htdocs/`
   * Access via: `http://localhost/shobdotori/index.php`
   * Backend API: `http://localhost/shobdotori/api/ping.php`

2. **Frontend on Netlify + Backend via Ngrok/Shared Hosting**

   * Host only frontend (`index.html`, `css/`, `js/`, `images/`) on Netlify
   * Update `BACKEND_URL` in `app.js` to your backend endpoint
   * Audio + database remain on backend server

---

## Workflow

1. User opens site (`index.html` or Netlify link)
2. Selects dialect → reads sentences → records voice
3. Audio is uploaded to backend (`upload.php`)
4. Backend saves:

   * File → `audio/` directory
   * Metadata → MySQL `recordings` table

---

