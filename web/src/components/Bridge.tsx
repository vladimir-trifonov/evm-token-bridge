import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"

import WalletSelect from "./WalletSelect"
import TransferControls from "./TransferControls"
import { IChainData } from "../types"

const Bridge = ({ onClaim, onNetworkChange, onReturn, fromAddress, toAddress, chainData, contracts, supportedChains, onDeposit }: { 
  onNetworkChange: any, 
  onReturn: any, 
  onClaim: any, 
  onDeposit: any, 
  fromAddress: string, 
  toAddress: string, 
  chainData: { from: IChainData, to: IChainData }, 
  contracts: any, 
  supportedChains: IChainData[]
}): JSX.Element => {
  return (
    <Paper elevation={0} sx={{ p: 1.5, backgroundColor: "rgba(18,18,18,0.9)" }}>
      <Stack spacing={2}>
        <WalletSelect 
          canChangeNetwork 
          onNetworkChange={onNetworkChange} 
          onClaim={onClaim} 
          onReturn={onReturn} 
          address={fromAddress} 
          chainData={chainData.from} 
          supportedChains={supportedChains} 
          contracts={contracts.from} 
        />
        <TransferControls chainData={chainData.from} balance={contracts.from.balance} onDeposit={onDeposit}/>
        <WalletSelect 
          canChangeNetwork={false} 
          onNetworkChange={onNetworkChange} 
          address={toAddress} 
          chainData={chainData.to} 
          supportedChains={supportedChains} 
          contracts={contracts.to} 
        />
      </Stack>
    </Paper>
  )
}

export default Bridge