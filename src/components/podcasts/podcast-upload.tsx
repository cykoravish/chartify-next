'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast' 
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must not exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must not exceed 1000 characters"),
  tags: z.string().refine(value => value.split(',').every(tag => tag.trim().length > 0), {
    message: "Each tag must not be empty",
  }),
})

export function PodcastUpload() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
    },
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB max size
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please upload a podcast file.',
        variant: 'destructive',
      })
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('tags', values.tags)

    try {
      const response = await fetch('/api/podcasts', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload podcast')
      }

      const data = await response.json()
      toast({
        title: 'Success',
        description: 'Your podcast has been uploaded.',
      })
      router.push('/podcasts')
    } catch (error) {
      console.error('Error uploading podcast:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload podcast. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* @ts-ignore */}
            <motion.div
              {...getRootProps()}
              className="border-2 border-dashed rounded-md p-10 text-center cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the audio file here ...</p>
              ) : (
                <p>Drag &apos;n&apos; drop an audio file here, or click to select a file</p>
              )}
              {file && <p className="mt-2">Selected file: {file.name}</p>}
            </motion.div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter podcast title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of your podcast episode.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter podcast description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your podcast episode.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tags (comma-separated)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add relevant tags to help categorize your podcast.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Upload Podcast</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
