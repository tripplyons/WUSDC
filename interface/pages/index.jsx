import Head from 'next/head';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import DepositInterface from '../components/DepositInterface';
import WithdrawInterface from '../components/WithdrawInterface';
import Toolbar from '../components/Toolbar';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Wrapped USDC</title>
        <meta
          name="description"
          content="WUSD - Wrapper Token for USDC (USD Coin)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="pt-4">
        <Toolbar />
      </header>

      <main className="container mx-auto p-4 pb-8 max-w-3xl">
        <CardHeader>What is WUSDC?</CardHeader>
        <Card>
          <p>WUSDC (short for Wrapped USD Coin) is an ERC20 that is backed by USDC (which is backed by US dollars by Circle). It was created in order to bundle the risk of Ethereum addresses being blacklisted by Circle.</p>
          <p>Because it has deposits that are known to not be illegal, Circle will be less willing to blacklist it.</p>
        </Card>
        <CardHeader>Deposit USDC (Mint WUSDC)</CardHeader>
        <Card>
          <DepositInterface />
        </Card>
        <CardHeader>Withdraw USDC (Redeem WUSDC)</CardHeader>
        <Card>
          <WithdrawInterface />
        </Card>
      </main>
    </div>
  );
};

export default Home;
