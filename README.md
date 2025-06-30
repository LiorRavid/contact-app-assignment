# 📘 README.md – Contact App (Angular + Node.js + SQLite)

This is a fullstack, mobile-first Contact Management App with offline support and automatic sync. 

Technologies used:
- Angular 19 with standalone components & typed reactive forms
- Node.js + SQLite backend
- IndexedDB (via `idb`) for offline support
- Sync-on-reconnect capability

---

## 🚀 Client Setup (Angular)

### Prerequisites
- Node.js ≥ 18
- Angular CLI ≥ 17 (`npm install -g @angular/cli`)

### Run the client
```bash
npm install
ng serve
```

Then visit: [http://localhost:4200](http://localhost:4200)

---

## 🔧 Server Setup (Node.js + SQLite)

### Prerequisites
- Node.js ≥ 18

### Run the backend
```bash
npm install
node server.js
```

Server will run at: [http://localhost:3000](http://localhost:3000)

### API Endpoints
| Method | Path              | Description              |
|--------|-------------------|--------------------------|
| GET    | `/contacts`       | Get all contacts         |
| POST   | `/contacts`       | Create/update a contact  |
| DELETE | `/contacts/:id`   | Delete contact by ID     |

> 📂 Data is stored in `contacts.db` via SQLite

---

## 📴 Offline Mode & Sync
- All contacts are stored in browser IndexedDB (via `idb`)
- Users can create, edit, or delete contacts completely offline
- On returning online, all unsynced contacts are auto-synced to the backend
- Unsynced records are marked with `[Unsynced]` in the contact list

---

## 🛠 Built With
- Angular 19
- RxJS
- Node.js
- SQLite
- randomuser.me API

---

## 📄 License
MIT – free to use and modify

---

## 📸 (Optional) Screenshots
_Add screenshots of your app here to show mobile-first layout, offline sync, etc._
