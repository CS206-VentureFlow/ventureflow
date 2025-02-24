"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface NewMessageDialogProps {
  onSubmit: (message: {
    type: "General" | "Update" | "Capital Call"
    subject: string
    content: string
  }) => void
}

export function NewMessageDialog({ onSubmit }: NewMessageDialogProps) {
  const [open, setOpen] = useState(false)
  const [messageType, setMessageType] = useState<"General" | "Update" | "Capital Call">("General")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ type: messageType, subject, content })
    setOpen(false)
    // Reset form
    setMessageType("General")
    setSubject("")
    setContent("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full shadow-lg" size="lg">
          <Plus className="mr-2 h-4 w-4" /> New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Message Type:</label>
            <Select
              value={messageType}
              onValueChange={(value: "General" | "Update" | "Capital Call") => setMessageType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Update">Update</SelectItem>
                <SelectItem value="Capital Call">Capital Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">From:</label>
            <Input value="Current User" disabled />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject:</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message:</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

