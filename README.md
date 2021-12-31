# `Illuvium-Land`

Illuvium Land

# 🚀 Quick Start

📄 Clone or fork `illuvium-land`:
```sh
git clone https://github.com/justinestrada/illuvium-land.git
```

🔎 Navigate to the `generator` folder and initialize the rarity generator and install moralis
```sh
cd illuvium-land
cd generator
npm init
npm install moralis
```

🖼️ Provide your `appId` and `serverUrl` and desired `collectionAddress` and `collectionName` in the `main.js` file
```sh
const serverUrl = ""; //Moralis Server Url here
const appId = ""; //Moralis Server App ID here

const collectionAddress = ""; //Collection Address Here
const collectionName = ""; //CollectioonName Here
```

🏃 Run the Rarity Generator
```sh
node main.js
```

💿 Return to the Origin Repo and Install all dependencies:
```sh
cd -
yarn install 
```

✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🎁 In `/src/components/QuickStart.js` Add the NFT collection as an Option(s) to the Select Input (with value corresponding to the collectionName used when running the rarity generator)
```sh
<Option value="YOUR_COLLECTION_NAME"> Collcetion Name </Option> 
```

🚴‍♂️ Run your App:
```sh
yarn start
```

🛠️ Build your App:
```sh
yarn build
```
This creates a `build` folder.
