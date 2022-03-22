import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { toast } from "react-toastify"
import { useReducer, useEffect } from "react"
import { useErrorBoundary } from "use-error-boundary"

import useWeb3Connect from "./hooks/useWeb3Connect"
import useWeb3Contracts from "./hooks/useWeb3Contracts"
import NetworkInfo from "./components/NetworkInfo"
import Bridge from "./components/Bridge"
import reducer, { initialState } from "./reducer"

export const App = (): JSX.Element => {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [
    { connect, disconnect, onNetworkChange }, 
    { chainDataFrom, chainDataTo, web3ProviderFrom, fromAddress, toAddress, supportedChains }
  ] = useWeb3Connect(state, dispatch)
  const [{ onDeposit, onClaim, onReturn }, { from, to }] = useWeb3Contracts(state)

  useEffect(() => {
    if (didCatch && error) {
      toast.error(error.message)
    }
  }, [didCatch, error])

  return (
    <ErrorBoundary>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
              <Typography sx={{ color: "#017abd" }} variant="h6" component="div" >
              xFW7&nbsp;
              </Typography>
              <Typography variant="h6" component="div">
              Bridge
              </Typography>
            </Box>
            {!!chainDataFrom && <NetworkInfo chainData={chainDataFrom} address={fromAddress}/>}
            {!!web3ProviderFrom && !chainDataFrom && (
              <Typography sx={{ color: "red", mr: 1 }} variant="caption" component="div" >
                Not supported chain
              </Typography>
            )}
            {web3ProviderFrom ? (
                <Button color="inherit" onClick={disconnect}>Disconnect</Button>
            ) : (
              <Button color="inherit" onClick={connect}>Connect</Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {chainDataFrom && web3ProviderFrom && (
        <Container fixed sx={{ height: "80vh" }}>
          <Grid container sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Grid item>
              <Bridge 
                onNetworkChange={onNetworkChange}
                fromAddress={fromAddress} 
                toAddress={toAddress} 
                chainData={{ from: chainDataFrom, to: chainDataTo }} 
                contracts={{ from, to }}
                supportedChains={supportedChains}
                onDeposit={onDeposit}
                onClaim={onClaim}
                onReturn={onReturn}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </ErrorBoundary>
  )
}

export default App