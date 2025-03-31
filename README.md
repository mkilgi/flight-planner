# Beans Airlines - Demo App

## Ülevaade

See on monorepo, mis sisaldab kahte projekti:

-   **Backend**: Spring Boot
-   **Frontend**: Next.js

### Versioonid

-   **Java:** JDK 21.0.2
-   **Gradle:** 8.13
-   **Node.js:** 20.12.0
-   **NPM:** 10.8.2

---

## Käivitamine

### Docker

Käivita järgmine käsk, et tõsta üles nii frontend kui ka backend:

```sh
docker-compose up --build
```

Rakendused jooksevad:

-   **Backend:** http://localhost:8080
-   **Frontend:** http://localhost:3000

Rakenduse sulgemiseks vajuta `CTRL + C` või käivita:

```sh
docker-compose down
```

---

### Ilma Dockerita

### Backend (Spring Boot)

**Eeltingimused:**

-   Java 21
-   Gradle 8.13

**Käivitamine:**

```sh
cd backend
./gradlew bootRun
```

Backend peaks jooksma **http://localhost:8080**.

---

### Frontend (Next.js)

**Eeltingimused:**

-   Node.js 20.12.0+
-   NPM v8+

**Keskkonnamuutujad:**
Enne käivitamist loo **`.env.local`** fail frontend kaustas:

```ini
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**Käivitamine:**

```sh
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Avage **http://localhost:3000**.

---

## Probleemid ja Lahendused

**Viga:** Frontend ei saa ühendust backendiga (`ECONNREFUSED`).
**Lahendus:** Veendu, et frontend kasutab **NEXT_PUBLIC_API_URL=http://backend:8080** Dockeris, mitte `localhost`.

### Kust leidsin abi

---

### Ajakulu

-   Kokku umbes 12h
