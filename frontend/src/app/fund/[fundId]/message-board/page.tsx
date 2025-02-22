"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import PageTitle from "@/components/PageTitle"

interface Message {
  id: number
  investor: string
  title: string
  content: string
  type: "General" | "Update" | "Capital Call"
}

const SAMPLE_MESSAGES: Message[] = [
  {
    id: 1,
    investor: "Investor 1",
    title: "Not Replying Instantly",
    content: "I am messaging you to raise a complaint that your staff does not reply within 10s of receiv...",
    type: "General",
  },
  {
    id: 2,
    investor: "Investor 2",
    title: "Hello",
    content: "Hello!",
    type: "General",
  },
  {
    id: 3,
    investor: "Investor 3",
    title: "Request for Data Update",
    content: "Hi, can you please upload the latest data",
    type: "Update",
  },
  {
    id: 4,
    investor: "Investor 4",
    title: "Request for Data Update",
    content: "Hello, please update your data thanks",
    type: "Update",
  },
]

export default function MessageBoard() {
  const [selectedTab, setSelectedTab] = useState<string>("General")
  const [selectedLP, setSelectedLP] = useState<string>("all")

  const filteredMessages = SAMPLE_MESSAGES.filter(
    (message) =>
      (selectedTab === "all" || message.type === selectedTab) &&
      (selectedLP === "all" || message.investor === selectedLP),
  )

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
              {filteredMessages.map((message) => (
                <Card key={message.id} className="p-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-start">
                            
                            <span className="font-bold">{message.title}</span>
                            <h3>{message.investor}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.content}</p>
                    </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Button className="fixed bottom-6 right-6 rounded-full shadow-lg" size="lg">
        <Plus className="mr-2 h-4 w-4" /> New
      </Button>
    </div>
  )
}

