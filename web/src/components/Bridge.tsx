import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import WalletSelect from './WalletSelect'
import TransferControls from './TransferControls'
import { IChainData } from '../types'
import { useState } from 'react'

const WalletsConnector = ({ address, chainData, contracts, supportedChains }: { address: string, chainData: { from: IChainData, to: IChainData }, contracts: any, supportedChains: IChainData[]}): JSX.Element => {
  const [balanceFrom, setBalanceFrom] = useState('')
  
  return (
    <Paper elevation={0} sx={{ p: 1.5, backgroundColor: 'rgba(18,18,18,0.9)' }}>
      <Stack spacing={2}>
        <WalletSelect address={address} chainData={chainData.from} supportedChains={supportedChains} contracts={contracts.from} onBalanceUpdated={setBalanceFrom} />
        <TransferControls chainData={chainData.from} balance={balanceFrom}/>
        <WalletSelect address={address} chainData={chainData.to} supportedChains={supportedChains} contracts={contracts.to} />
      </Stack>
    </Paper>
  )
}

export default WalletsConnector