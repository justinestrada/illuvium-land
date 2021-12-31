import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
// import Blockie from "./Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "./Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";

const styles = {
  text: {
    color: "#21BF96",
  },
};

function Account() {
  const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!isAuthenticated) {
    return (
      <button className="btn btn-outline-primary btn-outline-multicolored px-0"
        onClick={() => authenticate({ signingMessage: "Hello World!" })}
        style={{
          width: '128px',
        }}>
        Connect Wallet
      </button>
    );
  }

  return (
    <>
      <button className="btn btn-outline-primary btn-outline-multicolored" onClick={() => setIsModalVisible(true)}>
        {getEllipsisTxt(account, 6)}
      </button>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          backgroundColor: 'darkpurple',
          fontSize: "16px",
        }}
        style={{ fontSize: "16px" }}
        width="400px"
        className="account-modal"
      >
        Account
        <Card
          style={{
            marginTop: "15px",
            borderRadius: "0.25rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "16px",
            fontSize: "16px",
          }}
          onClick={() => {
            logout();
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
