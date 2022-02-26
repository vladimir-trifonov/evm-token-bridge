import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { IChainData } from '../lib/types'
import TokenClaim from './TokenClaim'

const WalletSelect = ({ chainData, supportedChains }: { chainData: IChainData, supportedChains: IChainData[] }): JSX.Element => {
  return (
    <Card sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', p: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Select
          value={10}
          label="Network"
        >
          <MenuItem value={10}>Network</MenuItem>
        </Select>
      </Box>
      <Box sx={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, mb: 1 }}>
          <Typography variant="h5" component="div" >
            0&nbsp;
          </Typography>
          <Typography sx={{ color: '#017abd' }} variant="h5" component="div">
            xFW7
          </Typography>
        </Box>
        <TokenClaim />
      </Box>
    </Card>
  )
}

export default WalletSelect