import { Challenge } from "@/lib/definitions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, X, Save, Eye } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import {
  FilterByCoinsOffered,
  FilterByColor,
  FilterByLockStatus,
  FilterByPlatform,
  FilterByTitleIcon,
} from "../user/filters";

export default function EditChallengeCard({
  selectedChallenge,
  updateChallenge,
  setIsOpen,
}: {
  selectedChallenge: Challenge;
  updateChallenge: (challenge: Challenge) => void;
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
}) {
  const [challenge, setChallenge] = useState<Challenge>({
    id: selectedChallenge.id,
    title: selectedChallenge.title,
    themeColor: selectedChallenge.themeColor,
    titleIcon: selectedChallenge.titleIcon,
    tags: selectedChallenge.tags,
    dueDate: new Date(selectedChallenge.dueDate ?? Date.now()),
    coinsOffered: selectedChallenge.coinsOffered,
    description: selectedChallenge.description,
    reference: {
      refereceDescription: selectedChallenge.reference.refereceDescription,
      referenceLink: selectedChallenge.reference.referenceLink,
    },
    displayImage: selectedChallenge.displayImage,
    imageAlt: selectedChallenge.imageAlt,
    platform: selectedChallenge.platform,
    lockStatus: selectedChallenge.lockStatus,
    hints: selectedChallenge.hints,
  });

  const [newTag, setNewTag] = useState("");
  const [newHint, setNewHint] = useState("");

  const addTag = () => {
    if (newTag && !challenge.tags?.includes(newTag)) {
      setChallenge((prev) => ({
        ...prev,
        tags: [...(prev.tags ?? []), newTag],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setChallenge((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }));
  };

  const addHint = () => {
    if (newHint) {
      setChallenge((prev) => ({
        ...prev,
        hints: [...(prev.hints ?? []), newHint],
      }));
      setNewHint("");
    }
  };

  const removeHint = (index: number) => {
    setChallenge((prev) => ({
      ...prev,
      hints: prev.hints?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    updateChallenge(challenge); // Pass the updated challenge, not selectedChallenge
  };

  return (
    <div className="min-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                {challenge.title === undefined
                  ? `Add Challenge`
                  : challenge.title}
              </CardTitle>
              <CardDescription>
                {challenge.id === undefined
                  ? null
                  : `Challenge ID: ${challenge.id}`}
              </CardDescription>
            </div>
            <Badge
              variant={
                challenge.lockStatus === "active" ? "default" : "secondary"
              }
            >
              {challenge.lockStatus === undefined ? null : challenge.lockStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="visual">Visual</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="hints">Hints</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input
                    id="title"
                    value={challenge.title === undefined ? `` : challenge.title}
                    onChange={(e) =>
                      setChallenge((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <FilterByPlatform
                    defaultPlatform={
                      challenge.platform === undefined ? `` : challenge.platform
                    }
                    setChallenge={setChallenge}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lockStatus">Status</Label>
                  <FilterByLockStatus
                    defaultLockStatus={challenge.lockStatus ?? `inactive`}
                    setChallenge={setChallenge}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(
                          challenge.dueDate === undefined
                            ? Date.now()
                            : challenge.dueDate,
                          "MMM dd, yyyy"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={challenge.dueDate}
                        onSelect={(date) =>
                          date &&
                          setChallenge((prev) => ({ ...prev, dueDate: date }))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coinsOffered">Coins Reward</Label>
                  <FilterByCoinsOffered
                    defaultCoinsOffered={
                      challenge.coinsOffered === undefined
                        ? `25`
                        : challenge.coinsOffered.toString()
                    }
                    setChallenge={setChallenge}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="description">Challenge Description</Label>
                <Textarea
                  id="description"
                  value={
                    challenge.description === undefined
                      ? ``
                      : challenge.description
                  }
                  onChange={(e) =>
                    setChallenge((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={6}
                  placeholder="Provide a detailed description of the challenge, requirements, and expectations..."
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {challenge.description?.length} characters
              </div>
              <div className="space-y-4 border-t pt-4">
                <Label>Reference Information</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Reference description"
                    value={
                      challenge.reference.refereceDescription === undefined
                        ? ``
                        : challenge.reference.refereceDescription
                    }
                    onChange={(e) =>
                      setChallenge((prev) => ({
                        ...prev,
                        reference: {
                          ...prev.reference,
                          refereceDescription: e.target.value,
                        },
                      }))
                    }
                  />
                  <Input
                    placeholder="Reference link"
                    value={
                      challenge.reference.referenceLink === undefined
                        ? ``
                        : challenge.reference.referenceLink
                    }
                    onChange={(e) =>
                      setChallenge((prev) => ({
                        ...prev,
                        reference: {
                          ...prev.reference,
                          referenceLink: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titleIcon">Title Icon</Label>
                    <FilterByTitleIcon
                      defaultTitleIcon={
                        challenge.titleIcon === undefined
                          ? `🧩`
                          : challenge.titleIcon
                      }
                      setChallenge={setChallenge}
                    />
                    {/* <Input
                      id="titleIcon"
                      value={challenge.titleIcon}
                      onChange={(e) =>
                        setChallenge((prev) => ({
                          ...prev,
                          titleIcon: e.target.value,
                        }))
                      }
                      placeholder="e.g., code, trophy, star, rocket"
                    /> */}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleHex">Theme Color</Label>
                    <div className="flex gap-2">
                      <FilterByColor
                        defaultTitleColor={
                          challenge.themeColor === undefined
                            ? `blue`
                            : challenge.themeColor
                        }
                        setChallenge={setChallenge}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Display Image</Label>
                    <Input
                      placeholder="Image URL"
                      value={
                        challenge.displayImage === undefined
                          ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCWECbwBwfC64V_04ZhwgAIjKl7CNqDyYWA&s`
                          : challenge.displayImage
                      }
                      onChange={(e) =>
                        setChallenge((prev) => ({
                          ...prev,
                          displayImage: e.target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Image alt text"
                      value={
                        challenge.imageAlt === undefined
                          ? `steamoji_kelowna`
                          : challenge.imageAlt
                      }
                      onChange={(e) =>
                        setChallenge((prev) => ({
                          ...prev,
                          imageAlt: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="w-full h-48 border rounded-lg overflow-hidden bg-muted">
                    <Image
                      width={30}
                      height={30}
                      src={
                        challenge.displayImage === undefined
                          ? `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCWECbwBwfC64V_04ZhwgAIjKl7CNqDyYWA&s`
                          : challenge.displayImage
                      }
                      alt={
                        challenge.imageAlt === undefined
                          ? `steamoji_kelowna`
                          : challenge.imageAlt
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tags" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label>Current Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {challenge.tags === undefined
                      ? []
                      : challenge.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={`bg-${challenge.themeColor}-100 text-${challenge.themeColor}-800 flex items-center gap-1 px-3 py-1`}
                          >
                            {tag}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 hover:bg-transparent"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Add New Tag</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter tag name"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hints" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label>Challenge Hints</Label>
                  <div className="space-y-2 mt-2">
                    {challenge.hints === undefined
                      ? []
                      : challenge.hints.map((hint, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="flex-1 p-3 bg-muted rounded-lg">
                              <div className="flex items-start justify-between">
                                <span className="text-sm">{hint}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeHint(index)}
                                  className="ml-2"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Add New Hint</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter helpful hint for participants"
                      value={newHint}
                      onChange={(e) => setNewHint(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addHint()}
                    />
                    <Button onClick={addHint}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-8 pt-4 border-t">
            <Button
              className="flex-1 hover:bg-blue-600 hover:text-white"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="destructive"
              className="border-2 border-red-800 bg-red-100 text-red-800 hover:bg-red-600 hover:text-white"
              onClick={() =>
                setIsOpen({ state: false, id: null, action: null })
              }
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
