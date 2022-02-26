import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const TokenClaim = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ textAlign: 'right', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', mb: 0.5 }} variant="caption" >
        0 xFW7 unclaimed
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>

        <Button size="small" sx={{ ml: 1, mr: 1 }} color="primary" onClick={() => { }}>Return</Button>
        <Button size="small" color="secondary" onClick={() => { }}>Claim</Button>
      </Box>
    </Box>
  )
}

export default TokenClaim