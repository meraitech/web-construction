import { getGeneralSettings } from "@/features/settings/services/settings.actions"
import { GeneralSettingsForm } from "./_components/GeneralSettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

export default async function GeneralSettingsPage() {
  const settings = await getGeneralSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Umum</h1>
        <p className="text-muted-foreground mt-2">
          Kelola informasi umum dan kontak perusahaan Anda
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Perusahaan</CardTitle>
          <CardDescription>
            Informasi ini akan ditampilkan di website Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneralSettingsForm initialData={settings} />
        </CardContent>
      </Card>
    </div>
  )
}
