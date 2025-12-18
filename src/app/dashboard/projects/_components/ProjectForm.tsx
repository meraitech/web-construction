"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Separator } from "@/shared/components/ui/separator"
import { useState } from "react"
import { Project, ProjectStatus, ProjectType } from "@/features/project/types/project.types"
import { ProjectFormData, projectSchema } from "@/features/project/utils/validation"
import { createProject, updateProject } from "@/features/project/services/project.actions"
import { ImageUpload } from "@/shared/components/upload/ImageUpload"
import { useFileUpload } from "@/shared/hooks/use-file-upload"

interface ProjectFormProps {
  initialData?: Project
  mode: "create" | "edit"
}

export function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
        title: initialData.title,
        client_name: initialData.client_name || undefined,
        location: initialData.location,
        project_type: initialData.project_type as ProjectType,
        status: initialData.status as ProjectStatus,
        start_date: initialData.start_date
          ? new Date(initialData.start_date).toISOString().split("T")[0]
          : undefined,
        end_date: initialData.end_date
          ? new Date(initialData.end_date).toISOString().split("T")[0]
          : undefined,
        budget: initialData.budget || undefined,
        short_description: initialData.short_description,
        description: initialData.description,
        thumbnail: initialData.thumbnail || null,
        gallery: initialData.gallery || undefined,
        featured: initialData.featured,
      }
      : {
        title: "",
        client_name: undefined,
        location: "",
        project_type: ProjectType.RESIDENTIAL,
        status: ProjectStatus.PLANNING,
        start_date: undefined,
        end_date: undefined,
        budget: undefined,
        short_description: "",
        description: "",
        thumbnail: null,
        gallery: undefined,
        featured: false,
      },
  })

  const fileUpload = useFileUpload({
    category: 'project',
    getEntityName: () => form.getValues('title') || 'untitled-project',
  })

  const handleCancel = async () => {
    const currentThumbnail = form.getValues("thumbnail")
    const currentGallery = form.getValues("gallery")

    await fileUpload.cleanupOnCancel(
      { thumbnail: currentThumbnail, gallery: currentGallery },
      {
        thumbnail: initialData?.thumbnail || null,
        gallery: initialData?.gallery || []
      }
    )

    if (mode === "edit" && initialData) {
      form.reset({
        title: initialData.title,
        client_name: initialData.client_name || undefined,
        location: initialData.location,
        project_type: initialData.project_type as ProjectType,
        status: initialData.status as ProjectStatus,
        start_date: initialData.start_date
          ? new Date(initialData.start_date).toISOString().split("T")[0]
          : undefined,
        end_date: initialData.end_date
          ? new Date(initialData.end_date).toISOString().split("T")[0]
          : undefined,
        budget: initialData.budget || undefined,
        short_description: initialData.short_description,
        description: initialData.description,
        thumbnail: initialData.thumbnail || null,
        gallery: initialData.gallery || undefined,
        featured: initialData.featured,
      })
    }

    router.back()
  }

  async function onSubmit(data: ProjectFormData) {
    setIsSubmitting(true)
    try {
      const renameResult = await fileUpload.processOnSubmit(
        {
          thumbnail: data.thumbnail,
          gallery: data.gallery,
        },
        {
          thumbnail: initialData?.thumbnail || undefined,
          gallery: initialData?.gallery || undefined,
        }
      )

      let result
      if (mode === "edit" && initialData) {
        result = await updateProject(initialData.id, data)
      } else {
        result = await createProject(data)
      }

      if (result.success) {
        router.push("/dashboard/projects")
        router.refresh()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("Failed to save project. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Basic Information</h3>
                <p className="text-sm text-muted-foreground">
                  Project details and metadata
                </p>
              </div>
              <Separator />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Modern Villa Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="client_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. PT. Konstruksi Indonesia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jakarta Selatan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="project_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on_hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 500000000"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">
                  Tell the story of this project
                </p>
              </div>
              <Separator />

              <FormField
                control={form.control}
                name="short_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief summary for project cards..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length || 0}/300
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detailed description..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Project</FormLabel>
                      <FormDescription>Display on homepage</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Images */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Images</h3>
                <p className="text-sm text-muted-foreground">
                  Upload project visuals
                </p>
              </div>
              <Separator />

              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail *</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        onDelete={(key) => fileUpload.trackDeletedFile(key)}
                        multiple={false}
                      />
                    </FormControl>
                    <FormDescription>
                      Main cover image (recommended: 16:9 ratio, 1920x1080px)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gallery - Multiple Upload */}
              <FormField
                control={form.control}
                name="gallery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gallery</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        onDelete={(key) => fileUpload.trackDeletedFile(key)}
                        multiple={true}
                        maxFiles={100}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload multiple photos at once (up to 100 total)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-start gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : mode === "edit" ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}