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

  // USE GENERIC FILE UPLOAD HOOK
  const fileUpload = useFileUpload({
    category: 'project',
    getEntityName: () => form.getValues('title') || 'untitled-project',
  })

  // CLEANUP ON CANCEL
  const handleCancel = async () => {
    // Only cleanup newly uploaded files (temp files that were uploaded in this session)
    const currentThumbnail = form.getValues("thumbnail")
    const currentGallery = form.getValues("gallery")

    const filesToCleanup: string[] = []

    // Check for NEW temp thumbnail (yang baru di-upload, bukan dari initialData)
    if (currentThumbnail?.key && currentThumbnail.name?.startsWith('temp-')) {
      const isNewUpload = !initialData?.thumbnail ||
        initialData.thumbnail.key !== currentThumbnail.key

      if (isNewUpload) {
        filesToCleanup.push(currentThumbnail.key)
      }
    }

    // Check for NEW temp gallery items
    if (currentGallery && currentGallery.length > 0) {
      const initialGalleryKeys = initialData?.gallery?.map(g => g.key) || []

      currentGallery.forEach(file => {
        // Only cleanup new uploads that are temp files
        if (file.name?.startsWith('temp-') && !initialGalleryKeys.includes(file.key)) {
          filesToCleanup.push(file.key)
        }
      })
    }

    // Cleanup only NEW temp files
    if (filesToCleanup.length > 0) {
      await fileUpload.cleanupOnCancel(
        { thumbnail: currentThumbnail, gallery: currentGallery },
        { thumbnail: null, gallery: [] }
      )
    }

    // Reset form to initial state (restore removed images)
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

  // SUBMIT HANDLER
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl space-y-8">

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground">Project details and metadata</p>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3-Story Commercial Building" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} value={field.value || ""} />
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
                    <Input placeholder="City, Region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="project_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ProjectType.RESIDENTIAL}>Residential</SelectItem>
                      <SelectItem value={ProjectType.COMMERCIAL}>Commercial</SelectItem>
                      <SelectItem value={ProjectType.RENOVATION}>Renovation</SelectItem>
                      <SelectItem value={ProjectType.INFRASTRUCTURE}>Infrastructure</SelectItem>
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
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ProjectStatus.PLANNING}>Planning</SelectItem>
                      <SelectItem value={ProjectStatus.ONGOING}>Ongoing</SelectItem>
                      <SelectItem value={ProjectStatus.COMPLETED}>Completed</SelectItem>
                      <SelectItem value={ProjectStatus.ON_HOLD}>On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ""} />
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
                    <Input type="date" {...field} value={field.value || ""} />
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
                  <Input placeholder="e.g., $500K - $1M" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">Tell the story of this project</p>
          </div>

          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief summary for preview cards..."
                    className="resize-none"
                    rows={3}
                    maxLength={300}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-right text-xs">
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
                    placeholder="Detailed project information, challenges, solutions, and outcomes..."
                    rows={8}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Images */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Images</h3>
            <p className="text-sm text-muted-foreground">Upload project visuals</p>
          </div>

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
                    onDelete={fileUpload.trackDeletedFile}
                    multiple={false}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Main cover image (recommended: 16:9 ratio, 1920x1080px)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    onDelete={fileUpload.trackDeletedFile}
                    multiple={true}
                    maxFiles={10}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Additional project photos (max 10 images)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Settings */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div>
                <FormLabel className="font-medium">Featured Project</FormLabel>
                <FormDescription className="text-xs">
                  Display on homepage
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-32"
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
