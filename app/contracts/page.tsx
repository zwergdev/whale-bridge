import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import Image from 'next/image'
import { Caption } from './_components/caption'
import { ContractCell } from './_components/contract-cell'
import { ALL_CONTRACTS } from '@/lib/constants'

export default function ContractsPage() {
  return (
    <section className="pt-40 overflow-visible w-full md:w-auto">
      <Table>
        <Caption chainsLength={ALL_CONTRACTS.length} />
        <TableHeader>
          <TableRow>
            <TableHead>Chain</TableHead>
            <TableHead>Mint & Bridge</TableHead>
            <TableHead>Refuel</TableHead>
            <TableHead>Token</TableHead>
            <TableHead className="text-right">Messenger</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALL_CONTRACTS.map((chain) => (
            <TableRow key={chain.chain}>
              <TableCell className="font-medium flex items-center whitespace-nowrap">
                <Image
                  src={`/chain-logo/${chain.image}`}
                  width={20}
                  height={20}
                  alt="chain-image"
                  className="rounded-full mr-2"
                />
                {chain.chain}
              </TableCell>
              <ContractCell explorer={chain.explorer} address={chain.mint} />
              <ContractCell explorer={chain.explorer} address={chain.refuel} />
              <ContractCell explorer={chain.explorer} address={chain.token} />
              <ContractCell
                explorer={chain.explorer}
                address={chain.messenger}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
