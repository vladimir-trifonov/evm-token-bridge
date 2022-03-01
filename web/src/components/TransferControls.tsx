import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { isBaseChain } from '../helpers/utilities'
import { useRef, useState } from 'react'
import { IChainData } from '../types'

const TransferControls = ({ balance, chainData, onDeposit }: { balance: string, chainData: IChainData, onDeposit: any }): JSX.Element => {
  const [value, setValue] = useState('0') 
  const valueRef = useRef('')

  const canDeposit = () => balance === '0' || parseFloat(value) <= 0 || parseFloat(value) > parseFloat(balance) || isNaN(parseFloat(value))

  return (
    <Card sx={{ p: 1 }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <TextField
          sx={{ flexGrow: 1 }}
          required
          value={value}
          inputRef={valueRef}
          disabled={balance === '0'}
          onChange={() => { setValue((valueRef.current as any)?.value) }}
        />
        <Button disabled={balance === '0'} sx={{ ml: 1, mr: 1 }} color="primary" onClick={() => { setValue(balance) }}>Max</Button>
        <Button disabled={canDeposit()} color="secondary" onClick={() => onDeposit(value)}>{isBaseChain(chainData?.chain_id) ? 'Transfer' : 'Request'}</Button>
      </Box>
    </Card>
  )
}

export default TransferControls