// 'use client'

// import { useState } from 'react'
// import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// const data = [
//   { name: 'Jan', downloads: 4000, plays: 2400 },
//   { name: 'Feb', downloads: 3000, plays: 1398 },
//   { name: 'Mar', downloads: 2000, plays: 9800 },
//   { name: 'Apr', downloads: 2780, plays: 3908 },
//   { name: 'May', downloads: 1890, plays: 4800 },
//   { name: 'Jun', downloads: 2390, plays: 3800 },
//   { name: 'Jul', downloads: 3490, plays: 4300 },
// ]

// export function AdvancedAnalytics() {
//   const [timeRange, setTimeRange] = useState('7d')

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-end">
//         <Select onValueChange={setTimeRange} defaultValue={timeRange}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select time range" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="7d">Last 7 days</SelectItem>
//             <SelectItem value="30d">Last 30 days</SelectItem>
//             <SelectItem value="90d">Last 90 days</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Downloads vs Plays</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="downloads" fill="#8884d8" />
//               <Bar dataKey="plays" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//       {/* Add more analytics cards here */}
//     </div>
//   )
// }

