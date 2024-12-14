'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Jan', downloads: 4000, plays: 2400 },
  { name: 'Feb', downloads: 3000, plays: 1398 },
  { name: 'Mar', downloads: 2000, plays: 9800 },
  { name: 'Apr', downloads: 2780, plays: 3908 },
  { name: 'May', downloads: 1890, plays: 4800 },
  { name: 'Jun', downloads: 2390, plays: 3800 },
  { name: 'Jul', downloads: 3490, plays: 4300 },
]

export function PodcastDetails({ id }: { id: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Downloads and Plays Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="downloads" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="plays" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Add more cards for other metrics */}
    </div>
  )
}

