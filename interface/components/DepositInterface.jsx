import CustomConnectButton from '../components/CustomConnectButton';
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS, MAX_UINT256, USDC_ABI, USDC_ADDRESS } from '../src/constants';

export default function DepositInterface() {
  const [amount, setAmount] = useState("0");

  const { address, isConnecting, isDisconnected } = useAccount();

  const read1 = useContractRead({
    addressOrName: USDC_ADDRESS,
    contractInterface: USDC_ABI,
    functionName: 'allowance',
    args: [address, CONTRACT_ADDRESS],
    watch: true,
  })

  const allowance = read1.data;
  const allowanceFloat = allowance && parseInt(allowance.toString()) / 1e6;

  const read2 = useContractRead({
    addressOrName: USDC_ADDRESS,
    contractInterface: USDC_ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  const balance = read2.data;
  const balanceFloat = balance && parseInt(balance.toString()) / 1e6;
 
  const prep1 = usePrepareContractWrite({
    addressOrName: USDC_ADDRESS,
    contractInterface: USDC_ABI,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, MAX_UINT256],
  })
  const write1 = useContractWrite(prep1.config)

  const amountFloat = parseFloat(amount);

  const maxValidAmount = Math.max(allowanceFloat, balanceFloat);
  
  const amountIsValid = amountFloat > 0 && amountFloat <= maxValidAmount;

  const [lastValidAmount, setLastValidAmount] = useState(0);
  if (amountFloat !== lastValidAmount && amountIsValid) {
    setLastValidAmount(amountFloat);
  }

  const lastValidAmountInt = Math.floor(lastValidAmount * 1e6);

  const prep2 = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    functionName: 'deposit',
    args: [lastValidAmountInt],
  });

  const write2 = useContractWrite(prep2.config);

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
              {
                lastValidAmount <= allowanceFloat ? (
                  <Button 
                    disabled={!(write2.write && amountIsValid)}
                    onClick={() => {
                      write2.write?.();
                    }}
                  >
                    Deposit
                  </Button>
                ) : (
                <Button
                  disabled={!write1.write}
                  onClick={() => {
                    write1.write?.();
                  }}
                >
                  Approve
                </Button>
                )
              }
            </div>
          ) : (
            null
          )
        }
      </div>
    </div>
  );
}