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
import { Separator } from "@/shared/components/ui/separator"
import { useState } from "react"
import { Team } from "@/features/team/types/team.types"
import { TeamFormData, teamSchema } from "@/features/team/utils/validation"
import { createTeam, updateTeam } from "@/features/team/services/team.actions"
import { ImageUpload } from "@/shared/components/upload/ImageUpload"
import { useFileUpload } from "@/shared/hooks/use-file-upload"

interface TeamFormProps {
  initialData?: Team
  mode: "create" | "edit"
}

export function TeamForm({ initialData, mode }: TeamFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: initialData
      ? {
        name: initialData.name,
        position: initialData.position,
        profile: initialData.profile || null,
      }
      : {
        name: "",
        position: "",
        profile: null,
      },
  })

  const fileUpload = useFileUpload({
    category: "team",
    getEntityName: () => form.getValues("name") || "untitled-member",
  })

  const handleCancel = async () => {
    const currentProfile = form.getValues("profile")

    await fileUpload.cleanupOnCancel(
      { thumbnail: currentProfile, gallery: [] },
      {
        thumbnail: initialData?.profile || null,
        gallery: []
      }
    )

    if (mode === "edit" && initialData) {
      form.reset({
        name: initialData.name,
        position: initialData.position,
        profile: initialData.profile || null,
      })
    }

    router.back()
  }

  async function onSubmit(data: TeamFormData) {
    setIsSubmitting(true)
    try {
      await fileUpload.processOnSubmit(
        {
          thumbnail: data.profile,
          gallery: [],
        },
        {
          thumbnail: initialData?.profile || undefined,
          gallery: undefined,
        }
      )

      let result
      if (mode === "edit" && initialData) {
        result = await updateTeam(initialData.id, data)
      } else {
        result = await createTeam(data)
      }

      if (result.success) {
        router.push("/dashboard/team")
        router.refresh()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("Failed to save team member. Please try again.")
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
                  Team member details and metadata
                </p>
              </div>
              <Separator />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position/Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Project Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Profile Picture */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <p className="text-sm text-muted-foreground">
                  Upload team member photo
                </p>
              </div>
              <Separator />

              {/* Profile Picture - Compact Preview */}
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo *</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        onDelete={(key) => fileUpload.trackDeletedFile(key)}
                        // Use custom class to force square aspect ratio and smaller size matching the previous design
                        className="[&>div]:!aspect-square [&>div]:!w-32 [&>div]:!h-32 [&>label]:!aspect-square [&>label]:!w-32 [&>label]:!h-32"
                      />
                    </FormControl>
                    <FormDescription>
                      Profile photo (recommended: square ratio, 500x500px)
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : mode === "edit"
                ? "Update"
                : "Create"}
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
