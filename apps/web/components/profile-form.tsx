'use client'

import { Globe, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { type ProfileData, saveProfile } from '@/app/actions/profile'
import { AuthorAvatar } from '@/components/author-avatar'
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/social-icons'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const MAX_AVATAR_BYTES = 4 * 1024 * 1024

export function ProfileForm({
  profile,
  name,
  email,
}: {
  profile: ProfileData
  name: string
  email: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(profile.avatarUrl)
  const [bio, setBio] = useState(profile.bio)
  const [websiteUrl, setWebsiteUrl] = useState(profile.websiteUrl ?? '')
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl ?? '')
  const [twitterUrl, setTwitterUrl] = useState(profile.twitterUrl ?? '')
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl ?? '')

  useEffect(() => {
    setPreview(profile.avatarUrl)
    setBio(profile.bio)
    setWebsiteUrl(profile.websiteUrl ?? '')
    setGithubUrl(profile.githubUrl ?? '')
    setTwitterUrl(profile.twitterUrl ?? '')
    setLinkedinUrl(profile.linkedinUrl ?? '')
  }, [profile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error('Avatar must be smaller than 4MB.')
      e.target.value = ''
      return
    }
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await saveProfile(formData)
      if (result.ok) {
        toast.success('Profile saved')
        router.refresh()
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <form
      className="flex w-full min-w-0 flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <Card className="w-full min-w-0 rounded-md border border-border shadow-[var(--shadow-card)] ring-0">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">Avatar</CardTitle>
          <CardDescription>A square image works best. Max 4MB.</CardDescription>
        </CardHeader>
        <CardContent className="min-w-0">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <AuthorAvatar
              className="size-20 text-3xl"
              name={name || email}
              src={preview}
            />
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                type="button"
                variant="outline"
              >
                <Upload aria-hidden="true" className="size-4" />
                Upload Image
              </Button>
              <FieldDescription>PNG, JPEG, WEBP, GIF</FieldDescription>
            </div>
            <input
              accept="image/png,image/jpeg,image/webp,image/gif"
              aria-label="Avatar image file"
              className="sr-only"
              name="avatar"
              onChange={handleFileChange}
              ref={fileInputRef}
              type="file"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full min-w-0 rounded-md border border-border shadow-[var(--shadow-card)] ring-0">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">About</CardTitle>
        </CardHeader>
        <CardContent className="min-w-0">
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              maxLength={500}
              name="bio"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people a little about yourself and the agents you build."
              rows={4}
              value={bio}
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="w-full min-w-0 rounded-md border border-border shadow-[var(--shadow-card)] ring-0">
        <CardHeader>
          <CardTitle className="font-semibold text-lg">Links</CardTitle>
          <CardDescription>
            Add your personal website and social profiles.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-0">
          <FieldGroup>
            <Field>
              <FieldLabel
                className="flex items-center gap-2"
                htmlFor="websiteUrl"
              >
                <Globe
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
                Personal Website
              </FieldLabel>
              <Input
                id="websiteUrl"
                inputMode="url"
                name="websiteUrl"
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="yoursite.com"
                type="text"
                value={websiteUrl}
              />
            </Field>
            <Field>
              <FieldLabel
                className="flex items-center gap-2"
                htmlFor="githubUrl"
              >
                <GitHubIcon className="size-4 text-muted-foreground" />
                GitHub
              </FieldLabel>
              <Input
                id="githubUrl"
                name="githubUrl"
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                value={githubUrl}
              />
            </Field>
            <Field>
              <FieldLabel
                className="flex items-center gap-2"
                htmlFor="twitterUrl"
              >
                <XIcon className="size-4 text-muted-foreground" />X (Twitter)
              </FieldLabel>
              <Input
                id="twitterUrl"
                name="twitterUrl"
                onChange={(e) => setTwitterUrl(e.target.value)}
                placeholder="https://x.com/username"
                value={twitterUrl}
              />
            </Field>
            <Field>
              <FieldLabel
                className="flex items-center gap-2"
                htmlFor="linkedinUrl"
              >
                <LinkedInIcon className="size-4 text-muted-foreground" />
                LinkedIn
              </FieldLabel>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          className="w-full sm:w-auto"
          onClick={() => router.push('/favorites')}
          type="button"
          variant="ghost"
        >
          Cancel
        </Button>
        <Button className="w-full sm:w-auto" disabled={isPending} type="submit">
          {isPending ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </form>
  )
}
