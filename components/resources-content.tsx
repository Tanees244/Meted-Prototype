"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileIcon, FileTextIcon, ImageIcon, LinkIcon, SearchIcon, UploadIcon, VideoIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data
const students = [
  {
    id: 1,
    name: "John Doe",
    grade: "10th Grade",
    subject: "Mathematics",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
  },
  {
    id: 2,
    name: "Sarah Smith",
    grade: "9th Grade",
    subject: "Science",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SS",
  },
  {
    id: 3,
    name: "Michael Johnson",
    grade: "11th Grade",
    subject: "English",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
  },
  {
    id: 4,
    name: "Emily Brown",
    grade: "8th Grade",
    subject: "History",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
  },
]

const resources = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    description: "A comprehensive guide to basic algebraic concepts",
    type: "document",
    format: "PDF",
    size: "2.4 MB",
    uploadDate: "May 10, 2025",
    sharedWith: [students[0]],
  },
  {
    id: 2,
    title: "Photosynthesis Diagram",
    description: "Visual representation of the photosynthesis process",
    type: "image",
    format: "PNG",
    size: "1.2 MB",
    uploadDate: "May 8, 2025",
    sharedWith: [students[1]],
  },
  {
    id: 3,
    title: "Shakespeare Analysis",
    description: "Analysis of key themes in Shakespeare's works",
    type: "document",
    format: "DOCX",
    size: "1.8 MB",
    uploadDate: "May 5, 2025",
    sharedWith: [students[2]],
  },
  {
    id: 4,
    title: "World War II Timeline",
    description: "Interactive timeline of major WWII events",
    type: "interactive",
    format: "HTML",
    size: "3.5 MB",
    uploadDate: "May 3, 2025",
    sharedWith: [students[3]],
  },
  {
    id: 5,
    title: "Geometry Formulas",
    description: "Quick reference sheet for geometry formulas",
    type: "document",
    format: "PDF",
    size: "0.8 MB",
    uploadDate: "April 28, 2025",
    sharedWith: [students[0]],
  },
  {
    id: 6,
    title: "Cell Division Video",
    description: "Educational video explaining mitosis and meiosis",
    type: "video",
    format: "MP4",
    size: "15.2 MB",
    uploadDate: "April 25, 2025",
    sharedWith: [students[1]],
  },
]

export function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<string>("all")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [resourceType, setResourceType] = useState("")
  const [studentToShare, setStudentToShare] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showUploadSuccess, setShowUploadSuccess] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [selectedResource, setSelectedResource] = useState<number | null>(null)

  const filteredResources = resources.filter((resource) => {
    // Filter by search query
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Filter by type
    if (selectedType !== "all" && resource.type !== selectedType) {
      return false
    }

    // Filter by student
    if (selectedStudent !== "all" && !resource.sharedWith.some((s) => s.id.toString() === selectedStudent)) {
      return false
    }

    return true
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload the file and create a resource
    setShowUploadSuccess(true)
    setTimeout(() => {
      setShowUploadSuccess(false)
    }, 3000)

    setTitle("")
    setDescription("")
    setResourceType("")
    setStudentToShare("")
    setUploadedFiles([])
  }

  const handleShareResource = (resourceId: number) => {
    setSelectedResource(resourceId)
    setShowShareDialog(true)
  }

  const confirmShareResource = () => {
    // In a real app, this would share the resource with additional students
    alert("Resource shared successfully!")
    setShowShareDialog(false)
    setSelectedResource(null)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileTextIcon className="h-6 w-6" />
      case "image":
        return <ImageIcon className="h-6 w-6" />
      case "video":
        return <VideoIcon className="h-6 w-6" />
      case "interactive":
        return <LinkIcon className="h-6 w-6" />
      default:
        return <FileIcon className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">Upload and manage learning materials for your students</p>
      </div>

      {showUploadSuccess && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
          <FileIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Resource Uploaded</AlertTitle>
          <AlertDescription>
            Your resource has been successfully uploaded and shared with the selected student.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="browse">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Resources</TabsTrigger>
          <TabsTrigger value="upload">Upload New Resource</TabsTrigger>
        </TabsList>
        <TabsContent value="browse" className="mt-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-64">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="interactive">Interactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                <FileIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" />
                <p className="mt-2 text-muted-foreground">No resources found</p>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-2 rounded-md ${
                            resource.type === "document"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                              : resource.type === "image"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : resource.type === "video"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                  : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                          }`}
                        >
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{resource.title}</CardTitle>
                          <CardDescription className="text-xs">
                            {resource.format} • {resource.size}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">Uploaded: {resource.uploadDate}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-medium">Shared with:</p>
                      <div className="flex mt-1">
                        {resource.sharedWith.map((student) => (
                          <Avatar key={student.id} className="h-6 w-6 -ml-1 first:ml-0 border-2 border-background">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.initials}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <FileIcon className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShareResource(resource.id)}>
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Resource</CardTitle>
              <CardDescription>Share learning materials with your students</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter resource title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter resource description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Resource Type</Label>
                  <Select value={resourceType} onValueChange={setResourceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="interactive">Interactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input id="file" type="file" onChange={handleFileUpload} required />
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="border rounded-md p-3">
                      <ul className="space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <FileIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="student">Share with Student</Label>
                  <Select value={studentToShare} onValueChange={setStudentToShare}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name} - {student.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Resource</DialogTitle>
            <DialogDescription>Select additional students to share this resource with.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="share-students">Students</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select students" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name} - {student.subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmShareResource}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
