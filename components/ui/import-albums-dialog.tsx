"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Album {
  image: string;
  title: string;
  artist: string;
}

interface ImportAlbumsDialogProps {
  onImport: (albums: Album[]) => void;
}

export function ImportAlbumsDialog({ onImport }: ImportAlbumsDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState<Album[]>([{ image: "", title: "", artist: "" }]);
  const [jsonData, setJsonData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 处理表单输入变化
  const handleFormChange = (index: number, field: keyof Album, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [field]: value };
    setFormData(newFormData);
  };

  // 添加新的专辑表单
  const addAlbumForm = () => {
    setFormData([...formData, { image: "", title: "", artist: "" }]);
  };

  // 移除专辑表单
  const removeAlbumForm = (index: number) => {
    if (formData.length > 1) {
      const newFormData = [...formData];
      newFormData.splice(index, 1);
      setFormData(newFormData);
    }
  };

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const content = event.target?.result as string;
        setJsonData(content);
      } catch (err) {
        return;
      }
    };
    reader.onerror = () => {
      return;
    };
    reader.readAsText(file);
  };

  // 处理JSON文本输入变化
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
  };

  // 验证并导入专辑
  const handleImport = () => {
    setIsLoading(true);

    try {
      let albumsToImport: Album[] = [];

      if (activeTab === "form") {
        // 验证表单数据
        const invalidIndex = formData.findIndex(album => !album.image || !album.title || !album.artist);
        if (invalidIndex !== -1) {
          setIsLoading(false);
          return;
        }
        albumsToImport = formData;
      } else {
        // 验证JSON数据
        if (!jsonData.trim()) {
          setIsLoading(false);
          return;
        }

        try {
          const parsedData = JSON.parse(jsonData);
          
          if (!Array.isArray(parsedData)) {
            setIsLoading(false);
            return;
          }

          // 验证每个专辑对象
          const invalidItem = parsedData.findIndex(
            (item: any) => !item.image || !item.title || !item.artist
          );

          if (invalidItem !== -1) {
            setIsLoading(false);
            return;
          }

          albumsToImport = parsedData;
        } catch (err) {
          setIsLoading(false);
          return;
        }
      }

      // 模拟导入延迟
      setTimeout(() => {
        onImport(albumsToImport);
        setIsLoading(false);
        setOpen(false);
        
        // 重置表单
        setFormData([{ image: "", title: "", artist: "" }]);
        setJsonData("");
      }, 1000);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <RainbowButton className="flex items-center gap-2 px-4 py-2">
          <PlusCircle size={18} />
          <span className="ml-2">批量添加专辑</span>
        </RainbowButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>批量导入专辑</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">表单导入</TabsTrigger>
            <TabsTrigger value="json">JSON导入</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-4 mt-4">
            {formData.map((album, index) => (
              <div key={index} className="p-4 border rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">专辑 #{index + 1}</h4>
                  {formData.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeAlbumForm(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      删除
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`image-${index}`}>专辑封面URL</Label>
                  <Input
                    id={`image-${index}`}
                    value={album.image}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(index, "image", e.target.value)}
                    placeholder="https://example.com/album-cover.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>专辑名称</Label>
                  <Input
                    id={`title-${index}`}
                    value={album.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(index, "title", e.target.value)}
                    placeholder="专辑名称"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`artist-${index}`}>艺术家</Label>
                  <Input
                    id={`artist-${index}`}
                    value={album.artist}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormChange(index, "artist", e.target.value)}
                    placeholder="艺术家名称"
                  />
                </div>
              </div>
            ))}
            
            <RainbowButton 
              onClick={addAlbumForm} 
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              添加更多专辑
            </RainbowButton>
          </TabsContent>

          <TabsContent value="json" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="json-input">JSON数据</Label>
              <Textarea
                id="json-input"
                value={jsonData}
                onChange={handleJsonChange}
                placeholder='[{"image": "https://example.com/album1.jpg", "title": "专辑名称", "artist": "艺术家名称"}, ...]'
                className="min-h-[200px] font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">或上传JSON文件</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={18} />
                  </label>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                JSON格式示例:
              </p>
              <pre className="text-xs mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
{`[
  {
    "image": "https://example.com/album1.jpg",
    "title": "专辑名称1",
    "artist": "艺术家名称1"
  },
  {
    "image": "https://example.com/album2.jpg",
    "title": "专辑名称2",
    "artist": "艺术家名称2"
  }
]`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <RainbowButton onClick={handleImport} disabled={isLoading}>
            {isLoading ? "导入中..." : "导入专辑"}
          </RainbowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 