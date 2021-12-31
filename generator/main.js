const Moralis = require('moralis/node')

const serverUrl = 'https://vldamer3sdp7.usemoralis.com:2053/server'
const appId = 'rMH3X5ADrHz3cgBuLjD2torWV73wMKkfNdljH887'
Moralis.start({ serverUrl, appId })

const resolveLink = (url) => {
  if (!url || !url.includes("ipfs://")) return url;
  return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
};

// const collectionAddress = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'
// const collectionName = 'BoredApeYachtClub'
const collectionAddress = '0xc2e9678A71e50E5AEd036e00e9c5caeb1aC5987D'
const collectionName = 'WilderWorld'

async function generateRarity() {
  const NFTs = await Moralis.Web3API.token.getAllTokenIds({
    address: collectionAddress,
  });

  const totalNum = NFTs.total;
  const pageSize = NFTs.page_size;
  console.log(totalNum, pageSize);
  let allNFTs = NFTs.result;

  if (collectionName === 'WilderWorld') {
    for (i = 0; i < allNFTs.length; i++) {
      nft = allNFTs[i];
      if (nft.metadata == null) { 
        allNFTs.splice(i, 1);
        i--; // decrement
      }
    }
  }

  // const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  // for (let i = pageSize; i < totalNum; i = i + pageSize) {
  //   const NFTs = await Moralis.Web3API.token.getAllTokenIds({
  //     address: collectionAddress,
  //     offset: i,
  //   });
  //   allNFTs = allNFTs.concat(NFTs.result);
  //   await timer(6000);
  // }

  let metadata = allNFTs.map((e) => {
    const metadata = e.metadata ? JSON.parse(e.metadata) : null
    return metadata !== null ? metadata.attributes : []
  });


  let tally = { TraitCount: {} };

  for (let j = 0; j < metadata.length; j++) {
    let nftTraits = metadata[j].map((e) => e.trait_type);
    let nftValues = metadata[j].map((e) => e.value);

    let numOfTraits = nftTraits.length;

    if (tally.TraitCount[numOfTraits]) {
      tally.TraitCount[numOfTraits]++;
    } else {
      tally.TraitCount[numOfTraits] = 1;
    }

    for (let i = 0; i < nftTraits.length; i++) {
      let current = nftTraits[i];
      if (tally[current]) {
        tally[current].occurences++;
      } else {
        tally[current] = { occurences: 1 };
      }

      let currentValue = nftValues[i];
      if (tally[current][currentValue]) {
        tally[current][currentValue]++;
      } else {
        tally[current][currentValue] = 1;
      }
    }
  }

  const collectionAttributes = Object.keys(tally);
  let nftArr = [];
  for (let j = 0; j < metadata.length; j++) {
    let current = metadata[j];
    let totalRarity = 0;
    for (let i = 0; i < current.length; i++) {
      let rarityScore =
        1 / (tally[current[i].trait_type][current[i].value] / totalNum);
      current[i].rarityScore = rarityScore;
      totalRarity += rarityScore;
    }

    let rarityScoreNumTraits = 8 * (1 / (tally.TraitCount[Object.keys(current).length] / totalNum));
    current.push({
      trait_type: "TraitCount",
      value: Object.keys(current).length,
      rarityScore: rarityScoreNumTraits,
    });
    totalRarity += rarityScoreNumTraits;

    if (current.length < collectionAttributes.length) {
      let nftAttributes = current.map((e) => e.trait_type);
      let absent = collectionAttributes.filter(
        (e) => !nftAttributes.includes(e)
      );

      absent.forEach((type) => {
        let rarityScoreNull =
          1 / ((totalNum - tally[type].occurences) / totalNum);
        current.push({
          trait_type: type,
          value: null,
          rarityScore: rarityScoreNull,
        });
        totalRarity += rarityScoreNull;
      });
    }

    // if (allNFTs[j]?.metadata) {
    //   allNFTs[j].metadata = JSON.parse(allNFTs[j].metadata);
    //   allNFTs[j].image = resolveLink(allNFTs[j].metadata?.image);
    // } else if (allNFTs[j].token_uri) {
    //   try {
    //     await fetch(allNFTs[j].token_uri)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         allNFTs[j].image = resolveLink(data.image);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    if (allNFTs[j].metadata) {
      allNFTs[j].metadata = JSON.parse(allNFTs[j].metadata);
      allNFTs[j].image = resolveLink(allNFTs[j].metadata.image);

      if (collectionName === 'WilderWorld' && allNFTs[j].metadata) {
        allNFTs[j].video = (allNFTs[j].metadata.animation_url) ? resolveLink(allNFTs[j].metadata.animation_url) : null
      }
    } else if (allNFTs[j].token_uri) {
      try {
        await fetch(allNFTs[j].token_uri)
          .then((response) => response.json())
          .then((data) => {
            allNFTs[j].image = resolveLink(data.image);
          });
      } catch (error) {
        console.log(error);
      }
    }

    let newNFT = {
      Attributes: current,
      Rarity: totalRarity,
      token_id: allNFTs[j].token_id,
      image: allNFTs[j].image,
      video: allNFTs[j].video ? allNFTs[j].video : null
    }
    // console.log('newNFT', newNFT)
    nftArr.push(newNFT);
  }

  nftArr.sort((a, b) => b.Rarity - a.Rarity);

  for (let i = 0; i < nftArr.length; i++) {
    nftArr[i].Rank = i + 1;
    const newClass = Moralis.Object.extend(collectionName);
    const newObject = new newClass();

    newObject.set("attributes", nftArr[i].Attributes);
    newObject.set("rarity", nftArr[i].Rarity);
    newObject.set("tokenId", nftArr[i].token_id);
    newObject.set("rank", nftArr[i].Rank);
    newObject.set("image", nftArr[i].image);
    newObject.set("video", nftArr[i].video);

    await newObject.save();
    console.log(i);
  }
}

generateRarity();
