import Card from "@mui/material/Card"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { IChainData } from "../types"
import { getTokenSymbol, ellipseAddress } from "../helpers/utilities"
import TokenClaim from "./TokenClaim"
import { useEffect, useState } from "react"

const WalletSelect = ({ type, chainData, contracts, supportedChains, onClaim, onReturn }: { onReturn: any, type: string, onClaim: any, supportedChains: IChainData[], address: string, chainData: IChainData, contracts: any }): JSX.Element => {
  const [tokenSymbol, setTokenSymbol] = useState("")

  useEffect(() => {
    if (chainData?.chain_id) {
      setTokenSymbol(getTokenSymbol(chainData.chain_id))
    } else {
      setTokenSymbol("")
    }
  }, [chainData])

  return (
    <Card sx={{ flexGrow: 1, display: "flex", alignItems: "center", p: 1 }}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", flexFlow: "wrap" }}>
        <Select
          value={chainData?.chain_id}
          label="Network"
          disabled
        >
          {supportedChains?.map((chain) => <MenuItem key={chain.chain_id} value={chain.chain_id}>{chain.name}</MenuItem>)}
        </Select>
        <Typography sx={{ textAlign: "right", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", mb: 0.5 }} variant="caption" >
          Wallet: {ellipseAddress(contracts.address)}
        </Typography>
      </Box>
      <Box sx={{ alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "row", mt: 1, mb: 1 }}>
          <Typography variant="h5" component="div" >
            {contracts.balance}&nbsp;
          </Typography>
          <Typography sx={{ color: "#017abd" }} variant="h5" component="div">
            {tokenSymbol}
          </Typography>
        </Box>
        {!!contracts.bridged && contracts.bridged !== "0" && <TokenClaim type={type} onClaim={onClaim} onReturn={onReturn} tokenSymbol={tokenSymbol} bridged={contracts.bridged} />}
      </Box>
    </Card>
  )
}

export default WalletSelect