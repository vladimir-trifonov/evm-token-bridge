import useWeb3Connect from './hooks/useWeb3Connect'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import NetworkInfo from "./components/NetworkInfo"
import Bridge from "./components/Bridge"

export const Home = (): JSX.Element => {
  const [{ connect, disconnect }, { chainData, web3Provider, address, supportedChains }] = useWeb3Connect()

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{ color: '#017abd' }} variant="h6" component="div" >
              xFW7&nbsp;
              </Typography>
              <Typography variant="h6" component="div">
              Bridge
              </Typography>
            </Box>
            <NetworkInfo chainData={chainData} address={address}/>
            {web3Provider ? (
                <Button color="inherit" onClick={disconnect}>Disconnect</Button>
              ) : (
                <Button color="inherit" onClick={connect}>Connect</Button>
              )}
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed sx={{ height: '80vh' }}>
        <Grid container sx={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={4}>
            <Bridge chainData={chainData} supportedChains={supportedChains} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home