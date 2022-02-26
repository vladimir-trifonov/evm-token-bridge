import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'

import WalletSelect from './WalletSelect'
import TransferControls from './TransferControls'
import { IChainData } from '../lib/types'

const WalletsConnector = ({ chainData, supportedChains }: { chainData: IChainData, supportedChains: IChainData[]}): JSX.Element => {
  return (
    <Paper elevation={0} sx={{ p: 1.5, backgroundColor: 'rgba(18,18,18,0.9)' }}>
      <Stack spacing={2}>
        <WalletSelect chainData={chainData} supportedChains={supportedChains} />
        <TransferControls/>
        <WalletSelect chainData={chainData} supportedChains={supportedChains} />
      </Stack>
    </Paper>
  )
}

export default WalletsConnector