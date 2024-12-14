import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
  
  const topEpisodes = [
    { title: 'Episode 1: Introduction', downloads: 1234, plays: 1000 },
    { title: 'Episode 2: Getting Started', downloads: 987, plays: 900 },
    { title: 'Episode 3: Advanced Topics', downloads: 876, plays: 800 },
    { title: 'Episode 4: Expert Interview', downloads: 765, plays: 700 },
    { title: 'Episode 5: Q&A Session', downloads: 654, plays: 600 },
  ]
  
  export function TopEpisodes({ className }: { className?: string }) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Top Episodes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Plays</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topEpisodes.map((episode) => (
                <TableRow key={episode.title}>
                  <TableCell className="font-medium">{episode.title}</TableCell>
                  <TableCell>{episode.downloads}</TableCell>
                  <TableCell>{episode.plays}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  