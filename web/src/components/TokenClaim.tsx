import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const TokenClaim = (
  { onClaim, onReturn, tokenSymbol, bridged }: { onReturn: (e: any) => void, onClaim: (e: any) => void, tokenSymbol: string, bridged: string }
): JSX.Element => {
  return (
    <Box sx={{ flexGrow: "1", display: "flex", flexDirection: "column", justifyContent: "end" }}>
      <Typography sx={{ textAlign: "right", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", mb: 0.5 }} variant="caption" >
        {bridged} {tokenSymbol} unclaimed
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>
        {!!onReturn && <Button size="small" sx={{ ml: 1, mr: 1 }} color="primary" onClick={onReturn}>Return</Button>}
        {!!onClaim && <Button size="small" color="secondary" onClick={onClaim}>Claim</Button>}
      </Box>
    </Box>
  )
}

export default TokenClaim