import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Menu, Layout } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Account from "components/Account";
import HomePage from "components/QuickStart";
import DashboardPage from "components/DashboardPage";
import Text from "antd/lib/typography/Text";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "rgb(17, 15, 36)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerInnerCol: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "16px",
  },
};

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const current_date = new Date()

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <div className="container">
            <div className="row">
              <div className="col" style={styles.headerInnerCol}>
                <div style={{width:"250px"}}>
                  <Logo />
                </div>
                <Menu
                  theme="light"
                  mode="horizontal"
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                  defaultSelectedKeys={["homepage"]}
                >
                  <Menu.Item key="homepage">
                    <NavLink to="/homepage">Home</NavLink>
                  </Menu.Item>
                  <Menu.Item key="dashboard">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </Menu.Item>
                </Menu>
                <div style={styles.headerRight}>
                  <Account />
                </div>
              </div>
            </div>
          </div>
        </Header>
        <section id="announcement-bar">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <a href="https://illuvium.io" className="text-rainbow text-rainbow-animated m-0" target="_blank">
                  We are not affiliated with Illuvium. This is a fan sponsored website! View illuvium website here!
                </a>
              </div>
            </div>
          </div>
        </section>
        <main id="main-content" className="py-5" style={styles.content}>
          <Switch>
            <Route exact path="/homepage">
              <HomePage isServerInfo={isServerInfo} />
            </Route>
            <Route path="/">
              <Redirect to="/homepage" />
            </Route>
            {/* <Route path="/ethereum-boilerplate">
              <Redirect to="/homepage" />
            </Route> */}
            <Route path="/dashboard">
              <DashboardPage />
            </Route>
          </Switch>
        </main>
      </Router>
      <Footer id="main-footer" className="pt-0">
        <hr className="section-divider mb-3"/>
        <div className="container py-3">
          <div className="row mb-3">
            <div className="col">
              <div id="coinmarketcap-widget-coin-price-block" coins="1027,8719" currency="USD" theme="dark" transparent="true" show-symbol-logo="false"></div>
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ textAlign: "center" }}>
              <div style={{ width: "192px", margin: "0 auto" }}>
                <Logo />
              </div>
              <Text style={{ display: "block" }}>
                Land &copy; {current_date.getFullYear()}
              </Text>
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    {/* height="200px"  */}
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="1240px" viewBox="0 0 2480 399" preserveAspectRatio="xMidYMid meet">
      <g fill="#ffffff">
        <path d="M132.2 385.5 c4.9 -4.6 59.9 -45.5 61.3 -45.5 1.4 0 57.2 41.4 61.4 45.6 0.2 0.2 -3.6 -1.4 -8.5 -3.5 -11.3 -4.9 -26.7 -9.8 -36.2 -11.7 -8.7 -1.6 -23.1 -1.8 -32.1 -0.3 -8.1 1.3 -25.8 7 -37.4 12 -4.9 2 -8.7 3.6 -8.5 3.4z"/>
        <path d="M110.4 382.4 c7.1 -17.6 11.7 -34 14.1 -50 2.1 -14.3 3.3 -118.7 1.6 -136.1 -1.8 -17.6 -5.7 -29 -13.2 -38.5 l-2.2 -2.6 5.6 -8.4 c17.7 -26.7 27.3 -58.6 34.7 -114.3 l1.8 -14 0.2 40 c0 22 0.5 88.2 1 147 1 120.6 0.4 112.3 9 124 2.7 3.7 5 7.4 5 8.1 0 0.7 -6.4 6.2 -14.2 12.1 -7.9 5.9 -21 16.1 -29.2 22.7 -8.2 6.6 -14.6 11.1 -14.2 10z"/>
        <path d="M265.5 374.8 c-6 -4.9 -19 -15 -28.7 -22.4 -9.8 -7.4 -17.8 -14.2 -17.8 -15 0 -0.9 1.6 -3.5 3.5 -5.8 1.9 -2.3 4.7 -6.9 6.2 -10.2 l2.8 -5.9 0.6 -42.5 c0.4 -23.4 0.7 -66.1 0.8 -95 0.1 -28.9 0.4 -76.6 0.8 -106 l0.6 -53.5 2.4 18.4 c6.1 48.7 17.7 86.1 34.2 110.6 2.3 3.3 4.1 6.7 4.1 7.5 0 0.8 -1.6 3.7 -3.5 6.4 -4 5.7 -7 13.2 -9.2 23.1 -2 9 -2.9 94.1 -1.4 127.5 0.9 19.8 1.4 23.9 4.1 34.5 3.4 13.3 8.5 29.5 10.7 33.8 0.8 1.6 1.3 3 1.1 3.2 -0.2 0.1 -5.2 -3.8 -11.3 -8.7z"/>
        <path d="M1704.5 374.8 c-6 -4.9 -19 -15 -28.7 -22.4 -9.8 -7.4 -17.8 -14.2 -17.8 -15 0 -0.9 1.6 -3.5 3.5 -5.8 1.9 -2.3 4.7 -6.9 6.2 -10.2 l2.8 -5.9 0.6 -42.5 c0.4 -23.4 0.7 -66.1 0.8 -95 0.1 -28.9 0.4 -76.6 0.8 -106 l0.6 -53.5 2.4 18.4 c6.1 48.7 17.7 86.1 34.2 110.6 2.3 3.3 4.1 6.7 4.1 7.5 0 0.8 -1.6 3.7 -3.5 6.4 -4 5.7 -7 13.2 -9.2 23.1 -2 9 -2.9 94.1 -1.4 127.5 0.9 19.8 1.4 23.9 4.1 34.5 3.4 13.3 8.5 29.5 10.7 33.8 0.8 1.6 1.3 3 1.1 3.2 -0.2 0.1 -5.2 -3.8 -11.3 -8.7z"/>
        <path d="M2394.5 381.4 c3 -6.9 8.1 -22.9 11.1 -34.4 3.2 -12.4 3.6 -15.4 4.5 -36 1.5 -33.4 0.6 -118.5 -1.4 -127.5 -2.2 -9.9 -5.2 -17.4 -9.2 -23.1 -1.9 -2.7 -3.5 -5.6 -3.5 -6.4 0 -0.8 1.8 -4.2 4.1 -7.5 16.5 -24.5 28.1 -61.9 34.2 -110.6 l2.4 -18.4 0.6 53.5 c0.4 29.4 0.7 77.1 0.8 106 0.1 28.9 0.4 71.6 0.8 95 l0.6 42.5 2.8 5.9 c1.5 3.3 4.3 7.9 6.2 10.2 1.9 2.3 3.5 4.9 3.5 5.8 0 0.8 -6.4 6.4 -14.2 12.3 -7.9 5.9 -21 16.1 -29.2 22.7 -8.2 6.6 -14.6 11.1 -14.1 10z"/>
        <path d="M1554.7 354.4 c-8.9 -2.8 -16.7 -13.4 -16.7 -22.8 0 -15.8 15.6 -28.4 30.1 -24.6 9.7 2.5 16.9 10.1 18.9 19.6 2.5 11.8 -5.1 24.3 -16.9 27.8 -6.6 1.9 -9.1 1.9 -15.4 0z"/>
        <path d="M1203.3 347.1 c-14.4 -4.2 -21.6 -7.4 -25.9 -11.7 -5.3 -5.3 -6.1 -8.3 -7.4 -26.5 -1.9 -27.4 -0.9 -51.7 2.5 -65.4 6.9 -27.1 33.4 -51.4 60.9 -55.7 10.2 -1.6 23 0 45.1 5.5 l17 4.2 20 0 20 0 17 -4.2 c22.1 -5.5 34.9 -7.1 45.1 -5.5 15.2 2.4 27 8.8 39.9 21.7 12.4 12.5 18.8 23.8 22.2 39.8 3.3 15.6 1.6 74.2 -2.3 81.9 -3 5.8 -12.9 11.1 -28.4 15.3 -5.2 1.4 -10 2.5 -10.7 2.5 -0.7 0 0.2 -3.1 2.4 -7.7 4.7 -10.3 8.1 -24.2 9.3 -37.7 1.3 -14.4 1.3 -42.9 0 -49.7 -3.4 -17.9 -19.4 -34 -37.8 -37.8 -23 -4.8 -47.3 6.3 -54.2 24.7 -1.2 3.1 -6.8 23.6 -12.3 45.5 -6.6 25.9 -10.4 39.2 -10.9 38 -0.4 -1 -5 -18.9 -10.3 -39.8 -10.6 -41.9 -13.3 -49.4 -21 -57 -7.8 -7.8 -20.4 -12.5 -33.4 -12.5 -24 0.1 -43.6 15 -49.2 37.5 -1.8 7.2 -1.5 42 0.5 57.2 1.6 12.2 5.4 25 10.2 34.6 l2.4 4.7 -2.2 -0.1 c-1.3 0 -5.1 -0.8 -8.5 -1.8z"/>
        <path d="M2304.5 344.5 c-15.2 -3.3 -29.8 -11.7 -41.1 -23.7 -8.8 -9.3 -14.3 -18.4 -18.6 -30.8 -3 -8.9 -3.2 -10.3 -3.3 -23.5 0 -11.6 0.4 -15.3 2.3 -21.8 8.8 -30.4 33.4 -52.9 63.7 -58.2 11.4 -2 88.4 -2.2 90.3 -0.3 0.7 0.7 1.2 3.3 1.2 5.8 0 6.5 -3.5 12.6 -9.4 16.7 -8.8 6 -11.6 6.5 -48.6 7.2 -38 0.8 -39.3 1 -51 9.6 -6.9 5.1 -10.9 10.3 -15.4 19.5 -3 6.3 -3.1 6.9 -3.1 20.5 l0 14 3.7 7.8 c6.5 13.5 18.4 23.6 32.2 27.3 3.8 1 14.3 1.4 42.6 1.5 40.4 0 44.2 0.5 44.8 4.8 0.3 1.6 0 2.1 -0.9 1.6 -0.9 -0.6 -1 -0.2 -0.6 1.6 0.4 1.5 -0.6 5.8 -3 12.1 l-3.6 9.8 -38.1 -0.1 c-27.5 0 -39.8 -0.4 -44.1 -1.4z"/>
        <path d="M14.2 342.8 c-0.9 -0.9 -1.2 -17.2 -1.2 -67.3 0 -73.4 -0.1 -72.6 6.5 -80.2 4.7 -5.6 12.9 -9.5 18.6 -9.1 l4.4 0.3 0 69.5 0 69.5 -2.7 4.7 c-1.6 2.5 -4.5 6 -6.5 7.7 -6.1 5 -16.3 7.7 -19.1 4.9z"/>
        <path d="M412 343.4 c-35.7 -6.9 -61.6 -32.2 -67.5 -65.9 -2 -11.4 -2.2 -88.4 -0.3 -90.3 0.7 -0.7 3.3 -1.2 5.8 -1.2 6.5 0 12.6 3.5 16.7 9.4 6 8.8 6.5 11.6 7.2 48.6 0.8 38 1 39.3 9.6 51 5.1 6.9 10.3 10.9 19.5 15.4 6.3 3 6.9 3.1 20.5 3.1 l14 0 7.8 -3.7 c13.8 -6.6 24.6 -19.7 27.5 -33.3 0.6 -2.7 1.3 -19.2 1.6 -36.6 0.6 -35.9 1.1 -38.6 8.7 -47.3 4.5 -5.1 9 -6.9 15.9 -6.4 l4.5 0.3 0.3 42.5 c0.2 27.6 -0.1 44.8 -0.8 48.9 -2.7 15.7 -11.6 31.8 -24.2 43.7 -9.4 8.9 -18.5 14.4 -30.8 18.5 -8.2 2.8 -11.1 3.2 -21.5 3.5 -6.6 0.1 -13.1 0 -14.5 -0.2z"/>
        <path d="M992.6 342.4 c-14.5 -3.2 -26.7 -9.8 -37.9 -20.3 -11.4 -10.8 -18.6 -22.2 -22.9 -36.3 -2.1 -6.9 -2.2 -9.4 -2.6 -51.2 -0.2 -24.1 -0.1 -44.9 0.2 -46.2 0.5 -2 1.3 -2.4 4.8 -2.4 10.2 0 17.9 5.5 22 15.8 2.1 5.4 2.2 7.7 2.9 39.7 0.4 22.6 1 35.3 1.9 38 7.2 23.5 31.8 38.4 56.6 34.5 20.5 -3.2 37.7 -19.6 41.3 -39.4 0.6 -3.4 1.1 -18.4 1.1 -34.6 0 -31.5 0.5 -35.4 6.1 -44 4.2 -6.6 8.8 -9.3 16.5 -9.8 6 -0.4 6.3 -0.3 6.9 2 0.4 1.4 0.5 22.2 0.3 46.4 -0.4 42.7 -0.4 44.1 -2.7 50.9 -8.9 27.1 -29.1 47.2 -55.6 55.5 -9.4 2.9 -29 3.6 -38.9 1.4z"/>
        <path d="M655.3 340.8 c-1.1 -1.3 -16.5 -29.9 -34.2 -63.6 -25.5 -48.5 -32.2 -62 -32.3 -65.1 -0.1 -6.8 6.4 -18.2 17.4 -30.5 l4.4 -4.9 1.8 7.9 c3.5 15.5 7 24.2 19.6 48.9 22.7 44.6 26 50.5 28 50.5 1.4 0 4.8 -5.6 13.3 -21.7 25.5 -48.3 28.8 -55.8 32.8 -75.2 1 -5.2 2.1 -9.6 2.3 -9.8 1.1 -1.1 16.8 19.1 20.5 26.4 4.3 8.6 5.1 6.8 -30 73.6 -17.7 33.7 -33 62.2 -34.2 63.5 -1.1 1.2 -3.2 2.2 -4.7 2.2 -1.5 0 -3.5 -1 -4.7 -2.2z"/>
        <path d="M816.9 341.4 c-1.2 -1.4 -1.4 -13 -1.4 -68.8 0 -76.5 -0.4 -72.7 8.4 -80.9 6.4 -6 17 -9.4 19.9 -6.5 0.9 0.9 1.2 17.4 1.2 68.3 0 73.7 0.1 72.3 -6 79.7 -5.3 6.5 -19.3 11.6 -22.1 8.2z"/>
        <path d="M1803.8 336.8 c-6.7 -7.6 -11.8 -14.9 -14.7 -20.5 -4.3 -8.6 -5.1 -6.8 30 -73.6 17.7 -33.7 33 -62.2 34.2 -63.4 1.1 -1.3 3.2 -2.3 4.7 -2.3 1.5 0 3.5 1 4.7 2.3 1.1 1.2 16.5 29.8 34.2 63.5 25.5 48.5 32.2 62 32.3 65.1 0.1 6.8 -6.4 18.2 -17.4 30.5 l-4.4 4.9 -1.8 -7.9 c-3.5 -15.5 -7 -24.2 -19.6 -48.9 -22.7 -44.6 -26 -50.5 -28 -50.5 -1.4 0 -4.8 5.6 -13.3 21.8 -25.5 48.2 -28.8 55.7 -32.8 75.1 -1 5.2 -2.1 9.6 -2.3 9.8 -0.2 0.2 -2.8 -2.5 -5.8 -5.9z"/>
        <path d="M2008.7 342.3 c-1.2 -1.1 -0.8 -85.4 0.4 -91.9 2.8 -15.4 11.7 -31.3 24.1 -43 9.3 -8.8 18.4 -14.3 30.8 -18.6 8.9 -3 10.3 -3.2 23.5 -3.3 11.6 0 15.3 0.4 21.8 2.3 30.4 8.8 52.9 33.4 58.2 63.7 2 11.4 2.2 88.4 0.3 90.3 -0.7 0.7 -3.3 1.2 -5.8 1.2 -6.5 0 -12.6 -3.5 -16.7 -9.4 -6 -8.8 -6.5 -11.6 -7.2 -48.6 -0.8 -38 -1 -39.3 -9.6 -51 -5.1 -6.9 -10.3 -10.9 -19.5 -15.4 -6.3 -3 -6.9 -3.1 -20.5 -3.1 l-14 0 -7.8 3.7 c-13.8 6.6 -24.6 19.7 -27.5 33.3 -0.6 2.8 -1.3 19.2 -1.6 36.6 -0.5 28.6 -0.7 32.1 -2.6 37.1 -2.4 6.6 -8.2 13.6 -12.7 15.4 -3.3 1.4 -12.5 1.9 -13.6 0.7z"/>
        <path d="M1842.5 295.5 c10.9 -20.2 15.3 -28 16 -28 0.7 0 5.1 7.8 16 28 l5.9 11 -5.5 -4.8 c-6.2 -5.5 -12.3 -8.7 -16.4 -8.7 -4.1 0 -10.2 3.2 -16.4 8.7 l-5.5 4.8 5.9 -11z"/>
        <path d="M192.5 240.5 c-1.2 -13.1 -1.2 -157 0 -170 l0.9 -10 0.9 6.5 c1.2 8.5 1.2 168.5 0 177 l-0.9 6.5 -0.9 -10z"/>
      </g>
    </svg>    
  </div>
);

export default App;
