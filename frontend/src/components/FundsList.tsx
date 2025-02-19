"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Fund {
  id: string
  name: string
  description: string
  status: string
  createdAt: string
}

interface FundsListProps {
  vcID: string
}

export default function FundsList({ vcID }: FundsListProps) {
  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFunds = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/lp/${vcID}/funds`)
      setFunds(response.data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch funds")
      console.error("Error fetching funds:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Accordion type="single" collapsible onValueChange={(value) => value && fetchFunds()}>
      <AccordionItem value="funds">
        <AccordionTrigger className="text-lg font-semibold">Funds</AccordionTrigger>
        <AccordionContent>
          <Card>
            <CardHeader>
              <CardTitle>List of Funds</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-4">
                    {funds.map((fund) => (
                      <div
                        key={fund.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                      >
                        <div>
                          <h3 className="font-medium">{fund.name}</h3>
                          <p className="text-sm text-muted-foreground">{fund.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{new Date(fund.createdAt).toLocaleDateString()}</span>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              fund.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {fund.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
