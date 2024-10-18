# Beüzemelelési leírás

Ezen dokumentum célja, hogy tartalmazza az alkalmazás beüzemeléséhez, illetve teszteléséhez szükséges
lépéseket, illetve keretrendszereket. 

***************************************

## Szükséges keretrendszer, alkalmazások



### Adatbázis:

- Microsoft SQL Server Management Studio szükséges (v. 18.4 vagy frisebb),
ha közvetlenül akarunk lekérdezéseket futtatni.

- A szerver, amihez kapcsolódik a program: 

(localdb)\MSSQLLocalDB

Nem szükséges adattáblákat szkript segítségével létrehozni, mivel 
mivel az adatbázis .mdf fájlként a projekthez van csatolva

### Backend rész


- Visual Studio 2022, vagy újabb verzió szükséges telepítve legyen
- .NET 8.0, vagy frissebb verzió legyen telepítve
- MSTest.TestFramework nevű NuGet csomag legyen telepítve


### Frontend rész

Szükséges keretrendszer, alkalmazások

- npm: 10.5.0 vagy magasabb verzió szükséges
- node js: 21.7.0 vagy magasabb verzió szükséges
- angular cli: 17.3.5, vagy magasabb verzió szükséges

- telepítésük: 
noje js + npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
angular cli: npm install -g @angular/cli

- testcafe telepítése:
npm -g testcafe

************************
************************

## Alkalmazás indítása

Legegyszerűbb command prompt segítségével elindítani


### Backend:

- Navigáljunk a gyökérmappába (ahol a Backend.sln fájl található)
- cd Szakdoga8
- dotnet run --urls "https://localhost:7121"

### Frontend:

- Navigáljunk a gyökérmappába (ahol a Backend.sln fájl található)
- cd FullStackUI
- npx ng serve
- a konzolon jelzett url (http//:localhost:4200/translations/add) 
megnyitása böngészőben (Chrome javasolt)

********************

## Tesztek futatási lehetőségei:

### Frontend:

karma (unit tesztek):
- Navigáljunk a gyökérmappába (ahol a Backend.sln fájl található)
- cd FullStackUI 
- ng test 

testcafe (integration tesztek):
- szükséges hozzá, hogy a frotend és backend alkalmazás is fussnak (lásd az előző pontokat)
- Navigáljunk a gyökérmappába (ahol a Backend.sln fájl található)
- cd FullStackUI\src\e2etests 
- testcafe chrome index.js 

Backend

- Backend.sln megnyitása
- Translator_Test projekt-> jobb click -> Run Tests