import { AddChallenge, Challenge } from "@/lib/definitions";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaWandMagicSparkles } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
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

export default function AddChallengeCard({
  setAllChallenges,
  setIsOpen,
}: {
  setAllChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
  setIsOpen: (value: {
    state: boolean;
    id: string | null;
    action: string | null;
  }) => void;
}) {
  const titleIcons = [
    "🎮",
    "🌳",
    "🛸",
    "🚀",
    "🐉",
    "🐠",
    "🐿️",
    "🌈",
    "✨",
    "🖌️",
    "🎥",
    "🤖",
    "🦾",
    "⚙️",
    "🛠️",
    "🔩",
    "🏗️",
    "🛰️",
    "🚁",
    "🧱",
    "🏎️",
    "💻",
    "🖥️",
    "📱",
    "🧠",
    "⌨️",
    "📡",
    "🔐",
    "🧮",
    "🌐",
    "🧪",
    "🔬",
    "🧬",
    "🧫",
    "📊",
    "📐",
    "📏",
    "🧊",
    "⚡",
    "💡",
    "🧩",
    "🥇",
    "🎯",
    "🎲",
    "🪄",
    "🌟",
    "🏆",
    "🎉",
    "🎈",
    "📅",
    "⚠️",
  ];

  const titleColors = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];

  const [challenge, setChallenge] = useState<AddChallenge>({
    title: undefined,
    themeColor: `blue`,
    titleIcon: `🧩`,
    tags: undefined,
    dueDate: new Date(Date.now()),
    coinsOffered: 25,
    description: undefined,
    reference: {
      referenceDescription: undefined,
      referenceLink: undefined,
    },
    displayImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSCWECbwBwfC64V_04ZhwgAIjKl7CNqDyYWA&s`,
    imageAlt: `steamoji_kelowna`,
    platform: `Scratch`,
    lockStatus: `inactive`,
    hints: [],
  });

  const [newTag, setNewTag] = useState("");
  const [newHint, setNewHint] = useState("");

  async function generateChallenge() {
    await toast.promise(
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/generate-challenge`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to generate challenge");
        }
      }),
      {
        loading: "Generating challenge...",
        success: "Challenge generated successfully!",
        error: (err) => err.message || "Something went wrong",
      }
    );
  }

  async function addChallenge(challenge: AddChallenge) {
    await toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/add-challenge`, {
        method: "POST",
        body: JSON.stringify({ challenge }),
        headers: { "Content-Type": "application/json" },
      }).then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to add challenge");
        }
        const result = await res.json();
        setAllChallenges(result.updatedChallenges);
      }),
      {
        loading: "Adding challenge...",
        success: "Challenge added successfully!",
        error: (err) => err.message || "Something went wrong",
      }
    );
  }

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
    addChallenge(challenge); // Pass the updated challenge, not selectedChallenge
  };

  return (
    <div className="min-w-3xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Add Challenge</CardTitle>
          <Button
            disabled
            onClick={generateChallenge}
            className="border-1 border-stone-300 bg-white rounded-md font-semibold bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-800 text-transparent bg-clip-text"
          >
            <FaWandMagicSparkles size={10} className="text-blue-600" />
            Generate
          </Button>
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
                  <Select
                    value={challenge.platform}
                    onValueChange={(value) =>
                      setChallenge((prev: AddChallenge) => ({
                        ...prev,
                        platform: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Scratch">Scratch</SelectItem>
                        <SelectItem value="Blender 3D">Blender 3D</SelectItem>
                        <SelectItem value="OnShape">OnShape</SelectItem>
                        <SelectItem value="TinkerCAD 3D">
                          TinkerCAD 3D
                        </SelectItem>
                        <SelectItem value="Microsoft Micro::bit">
                          Microsoft Micro::bit
                        </SelectItem>
                        <SelectItem value="Circuit Playground">
                          Circuit Playground
                        </SelectItem>
                        <SelectItem value="Unity">Unity</SelectItem>
                        <SelectItem value="Inkscape">InkScape</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lockStatus">Status</Label>
                  <Select
                    value={challenge.lockStatus}
                    onValueChange={(value) =>
                      setChallenge((prev: AddChallenge) => ({
                        ...prev,
                        lockStatus: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
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
                        {format(Date.now(), "MMM dd, yyyy")}
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
                  <Select
                    value={challenge.coinsOffered?.toString()}
                    onValueChange={(value) =>
                      setChallenge((prev: AddChallenge) => ({
                        ...prev,
                        coinsOffered: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={`0`}>0</SelectItem>
                        <SelectItem value={`25`}>25</SelectItem>
                        <SelectItem value={`50`}>50</SelectItem>
                        <SelectItem value={`75`}>75</SelectItem>
                        <SelectItem value={`100`}>100</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                      challenge.reference.referenceDescription === undefined
                        ? ``
                        : challenge.reference.referenceDescription
                    }
                    onChange={(e) =>
                      setChallenge((prev) => ({
                        ...prev,
                        reference: {
                          ...prev.reference,
                          referenceDescription: e.target.value,
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
                    <Select
                      value={challenge.titleIcon}
                      onValueChange={(value) =>
                        setChallenge((prev: AddChallenge) => ({
                          ...prev,
                          titleIcon: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {titleIcons.map((titleIcon: string) => (
                            <SelectItem key={titleIcon} value={titleIcon}>
                              {titleIcon}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleHex">Theme Color</Label>
                    <div className="flex gap-2">
                      <Select
                        value={challenge.themeColor}
                        onValueChange={(value) =>
                          setChallenge((prev: AddChallenge) => ({
                            ...prev,
                            themeColor: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {titleColors.map(
                            (titleColor: string, index: number) => (
                              <SelectItem
                                key={index}
                                className="flex flex-row gap-2"
                                value={titleColor}
                              >
                                <div
                                  className={`min-w-4 min-h-4 rounded-md bg-${titleColor}-600`}
                                ></div>
                                <div>
                                  {titleColor
                                    .split("-")[0]
                                    .split("")[0]
                                    .toUpperCase()}
                                  {titleColor.split("-")[0].slice(1)}
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Display Image</Label>
                    <Input
                      placeholder="Image URL"
                      value={challenge.displayImage}
                      onChange={(e) =>
                        setChallenge((prev) => ({
                          ...prev,
                          displayImage: e.target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Image alt text"
                      value={challenge.imageAlt}
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
              onClick={() => {
                handleSave();
                setIsOpen({ state: false, id: null, action: null });
              }}
            >
              <Save className="h-4 w-4 mr-2" />
              Add Challenge
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
