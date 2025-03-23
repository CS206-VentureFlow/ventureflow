"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import PageTitle from "@/components/PageTitle"
import { NewMessageDialog } from "./new-topic-message-dialog"

// Matching the structure of Messagedto
interface Messagedto {
  message: string
  sender: string
}

export default function TopicMessages() {
  const { topicId } = useParams()
  const [messages, setMessages] = useState<Messagedto[]>([])

  // Fetch existing messages for this topic
  useEffect(() => {
    if (!topicId) return
    fetch(`http://localhost:8080/api/v1/topic/${topicId}`)
      .then((res) => res.json())
      .then((data: Messagedto[]) => {
        setMessages(data)
        console.log("Fetched messages for topic:", data)
      })
      .catch((err) => console.error("Error fetching topic messages:", err))
  }, [topicId])

  // Submit a new message to this topic
  const handleNewMessage = (newMessage: { sender: string; content: string }) => {
    if (!topicId) return

    // Format to match Messagedto
    const payload: Messagedto = {
      sender: newMessage.sender,
      message: newMessage.content,
    }

    fetch(`http://localhost:8080/api/v1/topic/${topicId}/newMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(errorText || "Error adding message")
        }
        return res.text()
      })
      .then(() => {
        // Refresh messages after successfully posting
        return fetch(`http://localhost:8080/api/v1/topic/${topicId}`)
      })
      .then((res) => res.json())
      .then((updatedData: Messagedto[]) => {
        setMessages(updatedData)
      })
      .catch((err) => console.error("Error creating new topic message:", err))
  }

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <PageTitle title={`Topic ${topicId} Messages`} />
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <Card key={index} className="p-4">
            <div className="flex flex-col gap-2">
              <div className="font-bold">{msg.sender}</div>
              <div>{msg.message}</div>
            </div>
          </Card>
        ))}
      </div>
      <NewMessageDialog onSubmit={handleNewMessage} />
    </div>
  )
}