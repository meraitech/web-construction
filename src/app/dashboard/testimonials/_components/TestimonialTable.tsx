"use client"

import { Pencil, Trash2, MessageSquare, User, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { Testimonial } from "@/features/testimonial/types/testimonial.types"
import { deleteTestimonial } from "@/features/testimonial/services/testimonial.actions"
import { DataTable, DataTableAction, DataTableColumn } from "../../_components/DataTable"

interface TestimonialTableProps {
  data: Testimonial[]
}

export function TestimonialTable({ data }: TestimonialTableProps) {
  const router = useRouter()

  const columns: DataTableColumn<Testimonial>[] = [
    {
      header: "Client",
      headerClassName: "w-[280px]",
      className: "py-4",
      cell: (testimonial) => (
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-medium text-slate-900 group-hover:text-slate-950 transition-colors">
              {testimonial.client_name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Position",
      cell: (testimonial) => (
        <div className="flex items-center gap-2 text-slate-600">
          <Briefcase className="w-4 h-4 text-slate-400" />
          <span className="text-sm">{testimonial.position}</span>
        </div>
      ),
    },
    {
      header: "Message",
      cell: (testimonial) => (
        <p className="text-sm text-slate-600 truncate max-w-[300px]">
          {testimonial.message}
        </p>
      ),
    },
  ]

  const actions: DataTableAction<Testimonial>[] = [
    {
      icon: Pencil,
      label: "Edit Testimonial",
      onClick: (testimonial) => {
        router.push(`/dashboard/testimonials/${testimonial.id}/edit`)
      },
    },
    {
      icon: Trash2,
      label: "Delete Testimonial",
      variant: "destructive",
      onClick: async (testimonial) => {
        if (!confirm(`Are you sure you want to delete testimonial from "${testimonial.client_name}"?`))
          return
        const result = await deleteTestimonial(testimonial.id)
        if (result.success) {
          router.refresh()
        } else {
          alert(result.message)
        }
      },
    },
  ]

  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      onRowClick={(testimonial) => router.push(`/dashboard/testimonials/${testimonial.id}`)}
      emptyState={{
        icon: MessageSquare,
        title: "No testimonials yet",
        action: {
          label: "Add First Testimonial",
          href: "/dashboard/testimonials/new",
        },
      }}
      keyExtractor={(testimonial) => testimonial.id}
    />
  )
}
