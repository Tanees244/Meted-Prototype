"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Video, Download, Book, FileImage } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    type: "document",
    subject: "Mathematics",
    uploadedDate: "2023-05-20",
    size: "2.4 MB",
    description: "Comprehensive guide to algebra basics",
    icon: FileText,
  },
  {
    id: 2,
    title: "Cell Structure Video Lecture",
    type: "video",
    subject: "Biology",
    uploadedDate: "2023-05-18",
    size: "45 MB",
    description: "Video explaining cell structures and functions",
    icon: Video,
  },
  {
    id: 3,
    title: "Literary Analysis Techniques",
    type: "document",
    subject: "English",
    uploadedDate: "2023-05-15",
    size: "1.8 MB",
    description: "Guide to analyzing literary texts",
    icon: Book,
  },
  {
    id: 4,
    title: "Periodic Table Chart",
    type: "image",
    subject: "Chemistry",
    uploadedDate: "2023-05-10",
    size: "3.2 MB",
    description: "High-resolution periodic table with element details",
    icon: FileImage,
  },
]

export default function StudentResourcesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSubject, setActiveSubject] = useState("all")
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null)
  const [showResourceDialog, setShowResourceDialog] = useState(false)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = activeSubject === "all" || resource.subject.toLowerCase() === activeSubject.toLowerCase()
    return matchesSearch && matchesSubject
  })

  const subjects = ["all", ...new Set(resources.map((resource) => resource.subject.toLowerCase()))]

  const getIconForType = (type: string, Icon: React.ElementType) => {
    return <Icon className="h-5 w-5" />
  }

  const handleViewMore = (resource: typeof resources[0]) => {
    setSelectedResource(resource)
    setShowResourceDialog(true)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeSubject} onValueChange={setActiveSubject} className="w-full mb-6">
        <TabsList className="flex flex-wrap h-auto">
          {subjects.map((subject) => (
            <TabsTrigger key={subject} value={subject} className="capitalize">
              {subject}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No resources found matching your criteria</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getIconForType(resource.type, resource.icon)}
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.subject}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{resource.description}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploaded: {new Date(resource.uploadedDate).toLocaleDateString()}</span>
                  <span>{resource.size}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleViewMore(resource)}>
                  <FileText className="h-4 w-4 mr-2" />
                  View More
                </Button>
                <Button variant="outline" size="sm" onClick={() => { /* Add download logic */ }}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedResource && getIconForType(selectedResource.type, selectedResource.icon)}
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription>{selectedResource?.subject}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedResource?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Type</h4>
                <p className="text-sm text-muted-foreground capitalize">{selectedResource?.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Size</h4>
                <p className="text-sm text-muted-foreground">{selectedResource?.size}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Upload Date</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedResource && new Date(selectedResource.uploadedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowResourceDialog(false)}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
