import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { IChainData } from '../types'
import { getTokenSymbol } from '../helpers/utilities'
// import TokenClaim from './TokenClaim'
import { useEffect, useState } from 'react'

const WalletSelect = ({ address, chainData, contracts, onBalanceUpdated, supportedChains }: { supportedChains: IChainData[], address: string, chainData: IChainData, contracts: any, onBalanceUpdated?: any }): JSX.Element => {
  const [balance, setBalance] = useState('0')
  const [tokenSymbol, setTokenSymbol] = useState('')


  useEffect(() => {
    if (chainData?.chain_id) {
      setTokenSymbol(getTokenSymbol(chainData.chain_id))
    } else {
      setTokenSymbol('')
    }
  }, [chainData])

  useEffect(() => {
    const getBalance = async () => {
      const balance = await contracts?.token.balanceOf(address)
      setBalance(balance.toString())
      onBalanceUpdated && onBalanceUpdated(balance.toString())
    }

    if (address && contracts?.token) {
      getBalance()
    } else {
      setBalance('0')
      onBalanceUpdated && onBalanceUpdated('0')
    }
  }, [address, contracts, onBalanceUpdated])

  return (
    <Card sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', p: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Select
          value={chainData?.chain_id}
          label="Network"
        >
          {supportedChains?.map((chain) => <MenuItem key={chain.chain_id} value={chain.chain_id}>{chain.name}</MenuItem>)}
        </Select>
      </Box>
      <Box sx={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, mb: 1 }}>
          <Typography variant="h5" component="div" >
            {balance}&nbsp;
          </Typography>
          <Typography sx={{ color: '#017abd' }} variant="h5" component="div">
            {tokenSymbol}
          </Typography>
        </Box>
        {/* <TokenClaim /> */}
      </Box>
    </Card>
  )
}

export default WalletSelect