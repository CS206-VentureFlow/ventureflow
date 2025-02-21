"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Upload, FileUp, FileInput } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExcelUploadProps {
  vcID: string
  fundID: string
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ vcID, fundID }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      setUploadStatus(null) // Reset status when new file is selected
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file")
      return
    }

    setUploading(true)
    setUploadStatus(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post(`http://localhost:8080/api/v1/vc/${vcID}/fund/${fundID}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setUploadStatus("File uploaded successfully")
      console.log("Upload response:", response.data)
      // Close the popover after successful upload after a brief delay
      setTimeout(() => {
        setIsOpen(false)
        setFile(null) // Reset file selection
      }, 1500)
    } catch (error) {
      setUploadStatus("Error uploading file")
      console.error("Upload error:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileInput className="h-4 w-4" />
          Upload Data
          {file && (
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              1 file selected
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Upload Excel File</h4>
          </div>
          <div className="space-y-4">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              id="file-upload"
            />
            <div className="grid gap-2">
              <Button
                onClick={handleChooseFile}
                variant="outline"
                className={cn("w-full justify-start", file && "border-primary text-primary")}
              >
                <FileUp className="mr-2 h-4 w-4" />
                {file ? file.name : "Choose Excel File"}
              </Button>
              <Button onClick={handleUpload} disabled={uploading || !file} className="w-full">
                {uploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </>
                )}
              </Button>
            </div>
            {uploadStatus && (
              <p className={cn("text-sm", uploadStatus.includes("Error") ? "text-destructive" : "text-green-600")}>
                {uploadStatus}
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ExcelUpload

