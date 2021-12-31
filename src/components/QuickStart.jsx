import { useMoralis } from "react-moralis";
import {
  Button,
  Image,
  Card,
  Badge,
  Spin,
  Alert,
  Divider,
  Select,
  Input,
} from "antd";
import { useState } from "react";

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;

const styles = {
  nftColumnWrap: {
    display: "flex",
    justifyContent: "center",
  },
};

function HomePage() {
  const fallbackImg =
    "data:image/png;base64,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";

  const [token, setToken] = useState();
  const [visibility, setVisibility] = useState(false);
  const [NFTBalances, setNFTBalances] = useState();
  const [collection, setCollection] = useState();
  const [nft, setNft] = useState();
  const { Moralis } = useMoralis();

  const handleChangeCollection = async (col) => {
    const dbNFTs = Moralis.Object.extend(col);
    const query = new Moralis.Query(dbNFTs);
    query.ascending("rank");
    console.log('collection', col)
    const topNFTs = (col === 'WilderWorld') ? query.limit(6) : query.limit(18)
    const results = await topNFTs.find();
    setNFTBalances(results);
  };

  const handleSelectToken = async (num, col) => {
    if (num && col) {
      const dbNFTs = Moralis.Object.extend(col);
      const query = new Moralis.Query(dbNFTs);
      query.equalTo("tokenId", num);
      let selectedNFT = await query.first();
      console.log('selectedNFT', selectedNFT)
      selectedNFT = selectedNFT.attributes;
      setNft(selectedNFT);
      setVisibility(true);
    }
  };

  const collectionChanged = async (col) => {
    setCollection(col);
    handleSelectToken(token, col);
    handleChangeCollection(col);
  };

  const addToNFTs = async (col) => {
    const dbNFTs = Moralis.Object.extend(col);
    const query = new Moralis.Query(dbNFTs);
    query.ascending("rank");
    query.limit(6);
    const topNFTs = query.skip(NFTBalances.length);
    const results = await topNFTs.find();
    setNFTBalances(NFTBalances.concat(results));
  }

  return (
    <>
      <div>
        <div
          className="container mb-3"
          style={{
            display: "flex",
            justifyContent: "center",
            // margin: "0px auto 30px",
            // maxWidth: "1200px",
            gap: "10px",
          }}
        >
          <div>
            <label className="d-block"
              style={{
                color: "rgb(116, 116, 170)",
              }}>Select Collection</label>
            <Select
              showSearch
              style={{ width: "500px" }}
              placeholder="Select Collection"
              onChange={(e) => collectionChanged(e)}
            >
              {/* Your Option Here ---MAKE SURE VALUE CORRESPONDS TO MORALIS DB CLASS NAME */}
              {/* <Option value="Illuvium">Illuvium</Option> */}
              <Option value="BoredApeYachtClub">Bored Ape Yacht Club</Option>
              <Option value="WilderWorld">Wilder World - Wheels</Option>
            </Select>
          </div>
          {/* <Search
            style={{ width: "250px" }}
            placeholder="Search For Token"
            onChange={(e) => setToken(e.target.value)}
            onSearch={() => handleSelectToken(token, collection)}
            enterButton
          /> */}
        </div>
        <Divider />
        {visibility && (
          <div className="container mb-5">
            <div className="row"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div className="col-lg-8">
                <Badge.Ribbon
                  text={`Rank #${nft.rank}`}
                  style={{ fontSize: "18px" }}
                >
                  {(collection === 'WilderWorld') ? (
                    <>
                      <div className="ratio ratio-16x9">
                        <iframe src={nft.video} title="Video" allowFullScreen></iframe>
                      </div>
                    </>               
                  ) : (
                    <Image
                      preview={false}
                      src={nft.image}
                      loading="lazy"
                      placeholder={
                        <div
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            borderRadius: "18px",
                          }}
                        >
                          <Spin
                            size="large"
                            style={{
                              margin: "auto",
                              padding: "250px 0",
                              width: "640px",
                              height: "640px",
                            }}
                          />
                        </div>
                      }
                      fallback={fallbackImg}
                      alt={nft.tokenId}
                      style={{ height: "640px" }}
                    />
                  )}
                </Badge.Ribbon>
              </div>
              <div className="col-lg-4">
                <Card
                  title={`${collection} #${nft.tokenId}`}
                  bordered={false}
                  className="ant-card-nft-rarity-details"
                >
                  <div className="section-divider-animated"></div>
                  <div className="p-3">
                    <div
                      style={{
                        backgroundColor: "rgb(42, 30, 57)",
                        borderRadius: "8px",
                        marginBottom: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "white",
                        fontSize: "18px",
                        padding: "4px",
                        border: "1px solid white"
                      }}
                    >
                      Rarity Score
                      <div
                        className="text-green"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          margin: "auto",
                          textAlign: "center",
                          fontSize: "20px",
                          marginTop: "2px",
                          width: "100%"
                        }}
                      >
                        {nft.rarity.toFixed(1)}
                      </div>
                    </div>
                    {nft.attributes.map((e, index) => {
                      return (
                        <div className="attribute"
                          key={index}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>{e.trait_type}</span>
                            <span
                              style={{ color: "#5edb49", paddingRight: "4%" }}
                            >{`+${e.rarityScore.toFixed(1)}`}</span>
                          </div>
                          <Alert
                            style={{
                              padding: "2px 2px 2px 12px",
                              width: "98%",
                              margin: "0px auto 5px",
                              fontSize: "14px",
                            }}
                            message={e.value ? e.value : "<null>"}
                            type="info"
                            action={
                              <Button
                                size="small"
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                  width: "60px",
                                }}
                              >
                                {e.trait_type === "TraitCount" ? 
                                ((8* (10000 / e.rarityScore)).toFixed(0)) :  //Only use this if rarity generator adjusted to 8x traitcount
                                ((10000 / e.rarityScore).toFixed(0))         //Also must be adjusted for collections with +- 10000 NFTs
                                }  
                              </Button>
                            }
                          />
                        </div>
                      );
                    })}
                    <div className="text-center mt-3">
                      <a href="https://opensea.io/assets/0x4222b2a98daa443c6a0a761300d7d6bfd9161e52/1" target="_blank"
                        className="ant-btn ant-btn-primary">View On OpenSea</a>                  
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col">
              <h3
              style={{
                fontSize: "24px",
                color: "#fff",
              }}>Collection Ranked By Rarity</h3>
              <div
                style={{
                  color: "rgb(116, 116, 170)",
                }}
              >
                {collection}
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="container mb-3">
          <div className="row">
            {NFTBalances &&
              NFTBalances.map((nft, index) => {
                return (
                  <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-3" style={styles.nftColumnWrap}
                    key={index}>
                    <Card
                      onClick={() =>
                        handleSelectToken(nft.attributes.tokenId, collection)
                      }
                      hoverable
                      style={{ width: 190, border: "2px solid #e7eaf3" }}
                      cover={
                        <Image
                          preview={false}
                          src={nft.attributes.image}
                          fallback={fallbackImg}
                          alt={nft.attributes.rank}
                          style={{ height: "190px" }}
                        />
                      }
                    >
                      <Meta
                        title={`Rank #${nft.attributes.rank}`}
                        description={`#${nft.attributes.tokenId}`}
                      />
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
        {NFTBalances && (
          <div className="row">
            <div className="col text-center">
              <Button onClick={() => addToNFTs(collection)} type="primary">Load More</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
