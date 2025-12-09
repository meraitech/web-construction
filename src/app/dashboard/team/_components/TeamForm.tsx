"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
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
    category: 'team',
    getEntityName: () => form.getValues('name') || 'untitled-member',
  })

  const handleCancel = async () => {
    const currentProfile = form.getValues("profile")

    await fileUpload.cleanupOnCancel(
      { thumbnail: currentProfile, gallery: [] },
      { thumbnail: initialData?.profile || null, gallery: [] }
    )

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
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Informasi Team Member</h2>

          <FormField
            control={form.control}
            name="profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    multiple={false}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama *</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap" {...field} />
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
                <FormLabel>Posisi/Jabatan *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Project Manager, Civil Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : mode === "edit" ? "Update" : "Simpan"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Batal
          </Button>
        </div>
      </form>
    </Form>
  )
}
