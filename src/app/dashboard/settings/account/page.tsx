import { redirect } from "next/navigation"
import { getAdminProfile } from "@/features/auth/services/account.actions"
import { ProfileForm } from "../_components/ProfileForm"
import { ChangePasswordForm } from "../_components/ChangePasswordForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"

export default async function AccountSettingsPage() {
  const profile = await getAdminProfile()

  if (!profile) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Account</h1>
        <p className="text-muted-foreground mt-2">
          Manage your admin profile and account security
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your name and username
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={profile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Ensure to use a strong password for your account security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
