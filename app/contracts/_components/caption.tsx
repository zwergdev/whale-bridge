import { TableCaption } from '@/components/ui'

export const Caption = (props: { chainsLength: number }) => {
  return (
    <TableCaption>
      A list of our contracts officially verified on{' '}
      <a
        href="https://layerzeroscan.com/protocol/whale"
        referrerPolicy="no-referrer"
        className="text-foreground hover:underline"
      >
        LayerZero Scan
      </a>
      . <br />
      Total <span className="text-foreground">102</span> among{' '}
      <span className="text-foreground">{props.chainsLength}</span> chains.
    </TableCaption>
  )
}
