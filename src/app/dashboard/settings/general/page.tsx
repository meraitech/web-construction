import { getGeneralSettings } from "@/features/settings/services/settings.actions"
import { GeneralSettingsForm } from "../_components/GeneralSettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

export default async function GeneralSettingsPage() {
  const settings = await getGeneralSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your company's general and contact information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            This information will be displayed on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneralSettingsForm initialData={settings} />
        </CardContent>
      </Card>
    </div>
  )
}
