import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { Divider, Card } from "antd";
import { getEllipsisTxt } from "../helpers/formatters";
import useNativeTransactions from "hooks/useNativeTransactions";
import 'antd/dist/antd.css';
import { Skeleton, Table } from 'antd'
import { getOpenSea } from "hooks/useOpenSea";

const { Meta } = Card;

function DashboardPage() {
  const { nativeTransactions, chainId } = useNativeTransactions();
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [collectionData, setCollectionData] = useState({
    stats: {
      average_price: 0,
    },
  });
  const { Moralis } = useMoralis();
  useEffect(() => {
    console.log(nativeTransactions)
  }, [nativeTransactions])
  useState(() => {
    getOpenSea().then( (res) => {
      console.log(res)
      setCollectionData(res)
      setCollectionLoading(false)
    })
  },[])  
  const columns = [
    {
      title: 'From',
      dataIndex: 'from_address',
      key: 'from_address',
      render: from => (
        getEllipsisTxt(from, 5)
      )
    },
    {
      title: 'To',
      dataIndex: 'to_address',
      key: 'to_address',
      render: to => (
        getEllipsisTxt(to, 5)
      )
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: value => (
          // missing second argument in FromWei, decimals
        parseFloat(Moralis.Units.FromWei(value).toFixed(6))
      )
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: hash => (
        <a 
          href={
            chainId === "0x1" ? `https://etherscan.io/tx/${hash}` :
            chainId === "0x38" ? `https://bscscan.com/tx/${hash}` :
            chainId === "0x89" ? `https://polygonscan.com/tx/${hash}` :
            `https://explorer.avax.network/search?query=${hash}`
          }
          target="_blank"
          rel="noreferrer"
        >
          View Transaction
        </a>
      )
    }
  ]

  const onClickTest = () => {
    console.log('onClickTest')
  };

  let key = 0;
  return (
    <div class="w-100">
      <section className="container mb-5">
        <h2 className="text-white mb-3">Collection Activity</h2>
        <Divider />
        <Skeleton loading={collectionLoading}>
          <div className="row">
            <div className="col-lg-4 mb-3">
              <Card
                onClick={() =>
                  onClickTest()
                }
                hoverable
                style={{ width: 190, border: "2px solid #e7eaf3" }}
              >
                <Meta
                  title={`Total Sales`}
                  description={`${collectionData?.stats.total_sales}`}
                />
              </Card>
            </div>
            <div className="col-lg-4 mb-3">
              <Card
                onClick={() =>
                  onClickTest()
                }
                hoverable
                style={{ width: 190, border: "2px solid #e7eaf3" }}
              >
                <Meta
                  title={`Average Price`}
                  description={`${collectionData?.stats.average_price.toFixed(2)}`}
                />
              </Card>
            </div>
            <div className="col-lg-4 mb-3">
              <Card
                onClick={() =>
                  onClickTest()
                }
                hoverable
                style={{ width: 190, border: "2px solid #e7eaf3" }}
              >
                <Meta
                  title={`Holders`}
                  description={`${collectionData?.stats.num_owners}`}
                />
              </Card>
            </div>
          </div>
        </Skeleton>
      </section>
      <section className="container">
        <h2 className="text-white">My Transactions</h2>
        <Divider />
        <Skeleton loading={!nativeTransactions || nativeTransactions.length === 0}>
          <Table
            dataSource={nativeTransactions}
            columns={columns}
            rowKey={(record) => {
              key++;
              return `${record.transaction_hash}-${key}`;
            }}
          />
        </Skeleton>
      </section>
    </div>
  );
}

export default DashboardPage;
