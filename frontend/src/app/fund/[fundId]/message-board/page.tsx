"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageTitle from "@/components/PageTitle"
import { NewMessageDialog } from "./new-message-dialog"

// Interface matching the API return structure
interface Topic {
  id: number
  message: string
  sender: string
}

export default function MessageBoard() {
  const { fundId } = useParams()
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTab, setSelectedTab] = useState<string>("General")
  const [selectedLP, setSelectedLP] = useState<string>("all")

  // Fetch the topics using the fundId parameter
  useEffect(() => {
    if (!fundId) return
    fetch(`http://localhost:8080/api/v1/fund/${fundId}/topics`)
      .then((res) => res.json())
      .then((data: Topic[]) => {
        setTopics(data)
        console.log("Fetched topics:", data)
      })
      .catch((err) => console.error("Error fetching topics:", err))
  }, [fundId])

  // For styling consistency, we keep the same structure, though the tab/LP filters are not applied to these topics
  const filteredTopics = topics

  // Handle new message creation, calling the backend endpoint
  const handleNewMessage = (newMessage: {
    type: "General" | "Update" | "Capital Call"
    content: string
  }) => {
    if (!fundId) return

    const newTopic: Topic = {
      id: 1, // Your backend will likely overwrite this ID
      message: newMessage.content,
      sender: "Test User"
    }

    fetch(`http://localhost:8080/api/v1/fund/${fundId}/newTopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTopic)
    })
      .then((res) => res.json())
      .then((data: Topic) => {
        setTopics((prev) => [...prev, data])
      })
      .catch((err) => console.error("Error creating new topic:", err))

    console.log("New message submitted:", newMessage)
  }

  return (
    <div className="flex flex-col gap-5 w-full p-6">
      <div className="flex items-center justify-between">
        <PageTitle title="Message Board" />
        <div className="flex items-center gap-4">
          <Select value={selectedLP} onValueChange={setSelectedLP}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter from: LP" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All LPs</SelectItem>
              <SelectItem value="Investor 1">Investor 1</SelectItem>
              <SelectItem value="Investor 2">Investor 2</SelectItem>
              <SelectItem value="Investor 3">Investor 3</SelectItem>
              <SelectItem value="Investor 4">Investor 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="General" className="w-full" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="General">General</TabsTrigger>
          <TabsTrigger value="Update">Update</TabsTrigger>
          <TabsTrigger value="Capital Call">Capital Call</TabsTrigger>
        </TabsList>

        {["General", "Update", "Capital Call"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="space-y-4">
              {filteredTopics.map((topic) => (
                <Link key={topic.id} href={`/fund/${fundId}/topic/${topic.id}`}>
                  <Card className="p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col items-start">
                        <span className="font-bold">{topic.message}</span>
                        <h3>{topic.sender}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <NewMessageDialog onSubmit={handleNewMessage} />
    </div>
  )
}