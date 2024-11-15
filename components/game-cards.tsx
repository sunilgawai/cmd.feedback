import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GamesList() {
  const games = [
    {
      title: "Fast Parity - FP-241115-1955",
      columns: ["User ID", "BidAmount", "Bid Color", "Bid Number"],
    },
    {
      title: "Andar Bahar - AB-241115-0977",
      columns: ["User ID", "BidAmount", "Win Card"],
    },
    {
      title: "Head Tail - HT-241115-1955",
      columns: ["User ID", "BidAmount", "Coin Value"],
    },
    {
      title: "Parity - PR-241115-0324",
      columns: ["User ID", "BidAmount", "Bid Color", "Bid Number"],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {games.map((game, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{game.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {game.columns.map((column, colIndex) => (
                    <TableHead key={colIndex}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={game.columns.length}
                    className="text-center h-32"
                  >
                    There are no records to display
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
