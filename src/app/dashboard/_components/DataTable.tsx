"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Button } from "@/shared/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react"

export interface DataTableColumn<T> {
  header: string
  accessor?: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
  headerClassName?: string
}

export interface DataTableAction<T> {
  icon: LucideIcon
  label: string
  onClick: (item: T) => void | Promise<void>
  variant?: "default" | "destructive"
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  actions?: DataTableAction<T>[]
  onRowClick?: (item: T) => void
  emptyState?: {
    icon: LucideIcon
    title: string
    description?: string
    action?: {
      label: string
      href: string
    }
  }
  keyExtractor: (item: T) => string
  pagination?: {
    pageSize?: number
    showPagination?: boolean
  }
}

export function DataTable<T>({
  data,
  columns,
  actions,
  onRowClick,
  emptyState,
  keyExtractor,
  pagination = { pageSize: 5, showPagination: true },
}: DataTableProps<T>) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = pagination.pageSize || 5
  const showPagination = pagination.showPagination !== false
  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = showPagination ? data.slice(startIndex, endIndex) : data

  const handleAction = async (
    e: React.MouseEvent,
    action: DataTableAction<T>,
    item: T
  ) => {
    e.stopPropagation()
    setIsProcessing(keyExtractor(item))

    try {
      await action.onClick(item)
    } finally {
      setIsProcessing(null)
    }
  }

  if (data.length === 0 && emptyState) {
    const Icon = emptyState.icon
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-2xl bg-muted/30">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-foreground mb-2 text-center font-medium">
          {emptyState.title}
        </p>
        {emptyState.description && (
          <p className="text-sm text-muted-foreground mb-6 text-center">
            {emptyState.description}
          </p>
        )}
        {emptyState.action && (
          <Button asChild className="shadow-sm">
            <Link href={emptyState.action.href}>
              {emptyState.action.label}
            </Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden px-2">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`font-semibold text-foreground ${column.headerClassName || ""}`}
                >
                  {column.header}
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="font-semibold text-foreground text-right w-[120px]">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`group border-b border-border hover:bg-muted/50 transition-colors ${onRowClick ? "cursor-pointer" : ""
                  }`}
              >
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    className={column.className || ""}
                  >
                    {column.cell
                      ? column.cell(item)
                      : column.accessor
                        ? String(item[column.accessor])
                        : null}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {actions.map((action, index) => {
                        const Icon = action.icon
                        const isDestructive = action.variant === "destructive"

                        return (
                          <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className={
                              action.className ||
                              `h-8 w-8 text-muted-foreground ${isDestructive
                                ? "hover:text-destructive hover:bg-destructive/10"
                                : "hover:text-primary hover:bg-primary/10"
                              } transition-colors`
                            }
                            onClick={(e) => handleAction(e, action, item)}
                            disabled={isProcessing === keyExtractor(item)}
                            title={action.label}
                          >
                            <Icon className="h-4 w-4" />
                          </Button>
                        )
                      })}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-8"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="h-8"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}