"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Select removed (phone code fixed to +84)
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useGetMeQuery, useUpdateProfileMutation } from "@/state/api";
interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  phone_number?: string | null;
  phone_code?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
}
import { toast } from "sonner";

export default function InformationPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: meResp } = useGetMeQuery();
  const me = meResp?.data as UserProfile | undefined;
  const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation();
  interface FormState {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    phone_number: string;
    phone_code: string; // broaden type for select control
    bio: string;
  }
  const [form, setForm] = useState<FormState>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone_number: '',
    phone_code: '+84',
    bio: ''
  });

  useEffect(() => {
    if (me) {
      setForm(f => ({
        ...f,
        first_name: me.first_name || '',
        last_name: me.last_name || '',
        email: me.email || '',
        username: me.username || '',
        phone_number: me.phone_number || '',
        phone_code: me.phone_code || '+84',
        bio: me.bio || ''
      }));
      if (me.avatar_url) setPreviewImage(me.avatar_url);
    }
  }, [me]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (800KB)
      if (file.size > 800 * 1024) {
        alert('File size should be less than 800KB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleReset = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  return (
    <>
      <Card className="mb-6">
        <CardContent className="px-6 py-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b">
            <Avatar className="block h-32 w-32 rounded-2xl">
              <AvatarImage
                src={previewImage || "/avatars/waddles.jpeg"}
                alt="user image"
                width={128}
                height={128}
                className="object-cover"
              />
              <AvatarFallback className="rounded-none text-2xl font-bold">SW</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="default" className="relative">
                  <Upload className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Upload new photo</span>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  disabled={!previewImage}
                >
                  <X className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </div>
        </CardContent>
        <CardContent className="pt-6">
          <form className="space-y-6" onSubmit={async e => {
            e.preventDefault();
            try {
              // Build diff payload: only send changed non-empty fields
              type DiffableKeys = keyof FormState | 'phone_code';
              const payload: Partial<Record<DiffableKeys, string>> = {};
              const original: Record<DiffableKeys, string> = {
                first_name: me?.first_name || '',
                last_name: me?.last_name || '',
                email: me?.email || '',
                username: me?.username || '',
                phone_number: me?.phone_number || '',
                phone_code: me?.phone_code || '+84',
                bio: me?.bio || ''
              };
              // Always enforce Vietnam code +84 and normalize user input digits only
              const cleanedPhone = form.phone_number.replace(/[^\d]/g,'');
              const normalizedPhone = cleanedPhone.startsWith('0') ? cleanedPhone : (cleanedPhone ? '0'+cleanedPhone : '');
              const working: Record<DiffableKeys,string> = {
                ...form,
                phone_number: normalizedPhone,
                phone_code: '+84'
              };
              for (const [k,v] of Object.entries(working) as [DiffableKeys,string][]) {
                if (v === '') continue; // skip empty
                if (v !== original[k]) payload[k] = v;
              }
              if (previewImage && previewImage.startsWith('blob:')) {
                // TODO: upload image to storage then set avatar_url
              }
              await updateProfile(payload).unwrap();
              toast.success('Cập nhật thành công');
            } catch (err: unknown) {
              let msg = 'Cập nhật thất bại';
              if (typeof err === 'object' && err) {
                const maybeData = (err as Record<string, unknown>).data as Record<string, unknown> | undefined;
                const errObj = maybeData && typeof maybeData === 'object' ? maybeData : undefined;
                const nestedError = errObj && typeof errObj.error === 'object' ? errObj.error as Record<string, unknown> : undefined;
                const nestedMsg = (nestedError?.message as string) || (errObj?.message as string);
                const topMsg = (err as { message?: string }).message;
                msg = nestedMsg || topMsg || msg;
              }
              toast.error(msg);
            }
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={form.first_name} onChange={e => setForm(f => ({...f, first_name: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={form.last_name} onChange={e => setForm(f => ({...f, last_name: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({...f, email: e.target.value.toLowerCase()}))}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number (+84)</Label>
                <div className="flex">
                  <div className="w-[120px] flex items-center justify-center border rounded-l-md bg-muted text-sm font-medium">+84</div>
                  <Input
                    id="phoneNumber"
                    className="rounded-l-none"
                    placeholder="Ví dụ: 0912345678"
                    value={form.phone_number}
                    onChange={e => setForm(f => ({...f, phone_number: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea id="bio" className="w-full border rounded-md p-2 text-sm min-h-24"
                  value={form.bio}
                  onChange={e => setForm(f => ({...f, bio: e.target.value}))}
                  placeholder="Giới thiệu ngắn..."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                type="submit"
                className="cursor-pointer"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save changes'}
              </Button>
              <Button 
                type="reset" 
                variant="outline"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Are you sure you want to delete your account?</AlertTitle>
            <AlertDescription>
              Once you delete your account, there is no going back. Please be certain.
            </AlertDescription>
          </Alert>
          <form className="space-y-6" onSubmit={e => {
            e.preventDefault();
            if (!confirmDeactivate) return; // guard
            // TODO: call delete / deactivate endpoint when implemented
            toast.info('Deactivation endpoint chưa được triển khai');
          }}>
            <div className="flex items-center space-x-2">
              <Checkbox id="accountActivation" checked={confirmDeactivate} onCheckedChange={(v) => setConfirmDeactivate(!!v)} />
              <Label
                htmlFor="accountActivation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm my account deactivation
              </Label>
            </div>
            <Button 
              type="submit" 
              variant="destructive" 
              disabled={!confirmDeactivate}
              className="w-full sm:w-auto not-disabled:cursor-pointer transition-opacity"
            >
              Deactivate Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
