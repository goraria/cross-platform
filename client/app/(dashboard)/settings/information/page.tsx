"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function InformationPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" defaultValue="Gorth Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="flex">
                  <Select defaultValue="us">
                    <SelectTrigger className="w-[120px] rounded-r-none border-r-0">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">US (+1)</SelectItem>
                      <SelectItem value="uk">UK (+44)</SelectItem>
                      <SelectItem value="ca">CA (+1)</SelectItem>
                      <SelectItem value="au">AU (+61)</SelectItem>
                      <SelectItem value="de">DE (+49)</SelectItem>
                      <SelectItem value="fr">FR (+33)</SelectItem>
                      <SelectItem value="jp">JP (+81)</SelectItem>
                      <SelectItem value="cn">CN (+86)</SelectItem>
                      <SelectItem value="in">IN (+91)</SelectItem>
                      <SelectItem value="br">BR (+55)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phoneNumber"
                    className="rounded-l-none"
                    placeholder="202 555 0111"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="California" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" placeholder="231465" maxLength={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="cn">China</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="br">Brazil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-12">(GMT-12:00) International Date Line West</SelectItem>
                    <SelectItem value="-8">(GMT-08:00) Pacific Time (US & Canada)</SelectItem>
                    <SelectItem value="-7">(GMT-07:00) Mountain Time (US & Canada)</SelectItem>
                    <SelectItem value="-6">(GMT-06:00) Central Time (US & Canada)</SelectItem>
                    <SelectItem value="-5">(GMT-05:00) Eastern Time (US & Canada)</SelectItem>
                    <SelectItem value="-4">(GMT-04:00) Atlantic Time (Canada)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">Euro</SelectItem>
                    <SelectItem value="gbp">Pound</SelectItem>
                    <SelectItem value="btc">Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                type="submit"
                className="cursor-pointer"
              >
                Save changes
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
          <form className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="accountActivation" />
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
              disabled
              className="w-full sm:w-auto not-disabled:cursor-pointer"
            >
              Deactivate Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
