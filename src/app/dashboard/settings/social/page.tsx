import { getSocialMediaSettings } from "@/features/settings/services/settings.actions"
import { SocialMediaSettingsForm } from "../_components/SocialMediaSettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

export default async function SocialMediaSettingsPage() {
  const settings = await getSocialMediaSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Media Sosial</h1>
        <p className="text-muted-foreground mt-2">
          Kelola tautan media sosial perusahaan Anda
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tautan Media Sosial</CardTitle>
          <CardDescription>
            Masukkan URL lengkap untuk setiap platform media sosial. Kosongkan jika tidak digunakan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialMediaSettingsForm initialData={settings} />
        </CardContent>
      </Card>
    </div>
  )
}
