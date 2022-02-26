import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const TransferControls = (): JSX.Element => {
  return (
    <Card sx={{ p: 1 }}>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <TextField
          sx={{ flexGrow: 1 }}
          required
        />
        <Button sx={{ ml: 1, mr: 1 }} color="primary" onClick={() => {}}>Max</Button>
        <Button color="secondary" onClick={() => {}}>Transfer</Button>
      </Box>
    </Card>
  )
}

export default TransferControls