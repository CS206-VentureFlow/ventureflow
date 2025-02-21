"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface Fund {
  id: number
  fundName: string
  lps: Record<string, number>
  vc: Record<string, number>
}

interface FundsListProps {
  vcID: string
}

export default function FundsList({ vcID }: FundsListProps) {
  const [funds, setFunds] = useState<Fund[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFundId, setSelectedFundId] = useState<number | null>(null)

  const fetchFunds = async () => {
    // if (!isOpen) return // Only fetch when opening the popover

    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/lp/${vcID}/funds`)
      console.log("Fetched funds:", response.data)
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
    <Popover
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) fetchFunds()
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Select Fund
          <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            {funds.length}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Available Funds</h4>
          </div>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {funds.map((fund) => (
                  <div key={fund.id} className="rounded-lg border bg-card">
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start p-4 h-auto", selectedFundId === fund.id && "bg-primary/10")}
                      onClick={() => {
                        setSelectedFundId(fund.id)
                        // Additional selection handling
                        console.log("Selected fund:", fund)
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium">{fund.fundName}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {/* <div>LPs: {Object.keys(fund.lps).join(", ")}</div>
                          <div>VCs: {Object.keys(fund.vc).join(", ")}</div> */}
                        </div>
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

