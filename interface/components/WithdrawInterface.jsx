import CustomConnectButton from './CustomConnectButton';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../src/constants';

export default function WithdrawInterface() {
  const [amount, setAmount] = useState("0");

  const { address, isConnecting, isDisconnected } = useAccount();

  const read1 = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  const balance = read1.data;
  const balanceFloat = balance && parseInt(balance.toString()) / 1e6;

  const amountFloat = parseFloat(amount);
  
  const amountIsValid = amountFloat > 0 && amountFloat <= balanceFloat;

  const [lastValidAmount, setLastValidAmount] = useState(0);
  if (amountFloat !== lastValidAmount && amountIsValid) {
    setLastValidAmount(amountFloat);
  }

  const lastValidAmountInt = Math.floor(lastValidAmount * 1e6);
 
  const prep1 = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'withdraw',
    args: [lastValidAmountInt],
  })
  const write1 = useContractWrite(prep1.config)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center">
          <label>Connect:</label>
        </div>
        <div>
          <CustomConnectButton />
        </div>
        {
          isDisconnected ? null : (
            <>
              <div className="flex justify-center">
                <label>Enter Amount (Max. {balanceFloat}):</label>
              </div>
              <div>
                <Input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} />
              </div>
            </>
          )
        }
        {
          read1.data ? (
            <div className="md:col-span-2">
              <Button 
                disabled={!(write1.write && amountIsValid)}
                onClick={() => {
                  write1.write?.();
                }}
              >
                Withdraw
              </Button>
            </div>
          ) : (
            null
          )
        }
      </div>
    </div>
  );
}