"use client"

import { useState, FormEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface NewMessageDialogProps {
  onSubmit: (message: {
    sender: string
    content: string
  }) => void
}

export function NewMessageDialog({ onSubmit }: NewMessageDialogProps) {
  const [open, setOpen] = useState(false)
  const [sender, setSender] = useState("Current User")
  const [content, setContent] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ sender, content })
    setOpen(false)
    // Reset
    setSender("Current User")
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
          <DialogTitle>Add New Message</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">From:</label>
            <Input
              value={sender}
              onChange={(e) => setSender(e.target.value)}
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
            <Button type="submit">Send</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}