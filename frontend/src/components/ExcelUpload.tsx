"use client"

import type React from "react"
import { useState, useRef } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileUp } from "lucide-react"

interface ExcelUploadProps {
  vcID: string
  fundID: string
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ vcID, fundID }) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
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
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <Input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          id="file-upload"
        />
        <Button onClick={handleChooseFile} variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          {file ? file.name : "Choose Excel File"}
        </Button>
        <Button onClick={handleUpload} disabled={uploading || !file}>
          <Upload className="mr-2 h-4 w-4" /> Upload Excel
        </Button>
      </div>
      {uploadStatus && (
        <p className={`text-sm ${uploadStatus.includes("Error") ? "text-red-500" : "text-green-500"}`}>
          {uploadStatus}
        </p>
      )}
    </div>
  )
}

export default ExcelUpload

