/** @jsx jsx */
import { jsx } from "theme-ui"
import { Grid } from "@theme-ui/components"

const SongGrid = ({ children, ...props }) => {
  const emptyDivsToFill =
    children.length >= 4 ? 0 : Math.abs(children.length - 4)

  return (
    <Grid
      gap={[`3`, 48]}
      sx={{
        gridTemplateColumns: `repeat(auto-fit, minmax(160px, 1fr))`,
      }}
      {...props}
    >
      {children}
      {new Array(emptyDivsToFill).fill(null).map(d => (
        <div />
      ))}
    </Grid>
  )
}

export default SongGrid
