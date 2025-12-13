import { getSocialMediaSettings } from "@/features/settings/services/settings.actions"
import { SocialMediaSettingsForm } from "../_components/SocialMediaSettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

export default async function SocialMediaSettingsPage() {
  const settings = await getSocialMediaSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media</h1>
        <p className="text-muted-foreground mt-2">
          Manage your company's social media links
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Enter the full URL for each social media platform. Leave blank if unused.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SocialMediaSettingsForm initialData={settings} />
        </CardContent>
      </Card>
    </div>
  )
}
