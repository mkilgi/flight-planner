# Beans Airlines - Demo App

Lennu planeerimise ja istekohtade soovitamise veebirakendus.

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

-   **Java** JDK 21.0.2
-   **Gradle** 8.13

**Käivitamine:**

```sh
cd backend
./gradlew bootRun
```

Backend peaks jooksma **http://localhost:8080**.

---

### Frontend (Next.js)

**Eeltingimused:**

-   **Node.js** 20.12.0
-   **NPM** 10.8.2

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

### Lahenduskäik

1. Alustasin andmete struktuuri loomisega
    - Pidasin oluliseks, et lennukeid ja istekohti oleks võimalik taaskasutada ja et hinnad ei oleks istme küljes.
    - Samuti tahtsin kohe kaugusi lisada, et hiljem saaksin millegi alusel hindasid genereerida.
2. Seejärel backendis API, et lendusid küsida filtrite ja lehekülgedega
    - Läks väga sujuvalt, ainuke uuem asi minu jaoks oli filtrite loomiseks Specification, aga see oli väga lihtne ja arusaadav
3. Frontend pealeht, lendude leidmiseks
    - Mulle meeldib alati alustada backendist ja siis kohe päris andmetega frontendi arendada.
4. Edasi kordasin, kui frontend sai valmis, siis alustasin uue asjaga backendist.

**Frontend lehed**
Kasutasin kahte erinevat lahendust sarnaste olukordade jaoks.

1. /flights - leht, mis võib otsida väga suurelt andmemahult ja erinevad filtrid on väga olulised
    - kasutasin backend filtreerimist ja lehekülgi
2. /flights/{id} - leht, kus on alati täpselt sama palju infot (kaasaarvatud istmed). Kasutajale mugav ja kiire client-side filtreerimine istmete leidmiseks. Uuesti päritakse andmeid alles, siis kui broneeritakse iste.

### Probleemid

Minu oma valik oli suurim probleem. Pole Next.js 15 versiooniga eriti midagi teinud veel ja otsustasin siis nüüd proovida.
Alguses oli palju jama parameetride ja async funktsioonidega, mis oli varasemalt veidi teisit, aga lõpuks sain pihta.
Veel oli probleem docker-compose seadistamisega, aga see sai ka kiiresti internetist vastuse.

### Kust leidsin abi

-   Next.js docs https://nextjs.org/docs
-   Stackoverflow https://stackoverflow.com/questions
-   Shadcn/ui library https://ui.shadcn.com/docs
-   Spring küsimused https://www.baeldung.com/
-   ChatGPT

---

### Ajakulu

-   Kokku umbes 12h
