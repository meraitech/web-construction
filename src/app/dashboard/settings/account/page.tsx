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
        <h1 className="text-3xl font-bold tracking-tight">Akun Admin</h1>
        <p className="text-muted-foreground mt-2">
          Kelola profil dan keamanan akun admin Anda
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Profil</CardTitle>
          <CardDescription>
            Perbarui nama dan username akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={profile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubah Password</CardTitle>
          <CardDescription>
            Pastikan menggunakan password yang kuat untuk keamanan akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
