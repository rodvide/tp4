# Travail pratique 4 : Les aventuriers s'équipent

#### Pondération: 4%

#### Date de remise: Lundi le 20 novembre à 23h55

#### Modalités de remise: par tag via Github, n'oubliez pas d'inviter le prof à votre repository privé

## Mise en situation

Les marchands médiévaux se modernisent. Ils souhaitent créer une plateforme en ligne pour vendre leurs équipements aux aventuriers. C’est votre équipe de développement qui a été choisie pour bâtir le backend de l’application.

## Besoins

Le backend va gérer les informations des aventuriers, leurs inventaires d'équipements, leurs argent en pièces d'or ainsi que permettre l'achat d'équipement en ligne. Les aventuriers pouront s'inscrire et s'authentifier pour acheter des équipements. Certaines routes seront donc sécurisées tandis que d'autres seront publiques.

## Travail à réaliser

Vous aurez besoin d'un serveur express, d'un domaine ainsi que d'une couche d'accès aux données. Voici la structure de ces fichiers;

```
/database
  - adventurerDB.js
  - itemDB.js
/domain
  - adventurers.js
  - items.js
package.json
server.js
```

Vous aurez besoin d'une base de données que vous nommerez "`tp4`" dans mongoDB. Vous pouvez la créer à l'aide de Robo 3t ou Compass.

## Routes (server.js)

- GET `/items` (non sécurisé)
  - Renvoie la liste des items
- POST `/startAdventure` (non sécurisé)
  - Sert à s'inscrire en envoyant dans le body de la requête `name` et `password`
- POST `/login` (non sécurisé)
  - Authentification et obtention d'un token JWT
  - Prend dans son body `name` et `password`
  - Peut renvoyer un 403
- GET `/inventory` (sécurisé)
  - Renvoie l'inventaire de l'aventurier authentifié
  - Peut renvoyer un 401 ou un 403
- POST `/buy/:itemId` (sécurisé)
  - Sert à acheter un item selon l'id passé en params pour l'aventurer authentifié
  - Peut renvoyer un 400 BAD REQUEST si l'aventurier n'a pas assez d'argent
  - Peut renvoyer un 404 NOT FOUND si l'item n'existe pas

Non-mentionné dans les routes, vous aurez bien sur besoin d'un middleware d'_authorization_ pour `/inventory` et `/buy/:itemId`

## Domaine

### `adventurers.js`

- createAdventurer(name, password)
  - Sert à `/startAdventure`
  - Ajoute un aventurier à la BD avec le format suivant:

```javascript
const newAdventurer = {
  name,
  password,
  inventory: {
    gold: 1000, //argent de départ
    items: [],
  },
};
```

- getAdventurerByNameAndPassword(name, password)
  - Sert à `/login`
  - Retourne l'aventurier demandé
  - Peut lancer une exception "Wrong name or password"
- getAdventurerInventoryById(id)
  - Sert à `/inventory`
  - Retourne l'inventaire de l'aventurier avec le id demandé
  - Peut lancer une exception si on ne trouve pas l'aventurier
- `items.js`
  - getAllItems()
    - Sert à `/items`
  - buyItem(itemId, adventurerId)
    - Sert à `/buy/:itemId`
    - Soustrait le prix de l'item à l'argent de l'aventurier
    - Ajoute le nom de l'item à la liste des items dans l'inventaire de l'aventurier
    - Peut lancer une exception "Not enough gold" si l'aventurier n'a pas assez d'argent pour se payer la pièce d'équipement
    - Peut lancer une exception si on ne trouve pas l'item

### Couche d'accès aux données

- `adventurerDB.js`
  - findAll()
  - findById(id)
  - findByName(name)
  - add(adventurer)
  - updateById(id, adventurer)
- `itemDB.js`
  - findAll()
  - findById(id)

### Population des équipements

Un fichier `populateItems.js` vous est donné. Une fois que votre mongo roule et que vous y avez créé une base de données "`tp4`", vous pouvez rouler `node populateItems.js` pour lancer la création d'une liste sommaire d'items dans la base de données.

### Clarifications

- La liste d'équipements est statique pour nous. Il n'est pas nécéssaire de la modifier ou d'en enlever lors d'un achat. Autrement dit, on pourrait acheter un même item plusieurs fois.
- Il ne vous est pas demandé de faire des tests.
