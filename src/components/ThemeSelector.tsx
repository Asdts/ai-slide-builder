"use client";
// /src/components/ThemeSelector.tsx
// created by ASDTS
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getThemeOptions, getThemeConfig } from '@/slides/libs/themeConfigs';

const ThemeSelector = (prop:{selectedTheme:any,setSelectedTheme:any}) => {
    const { selectedTheme, setSelectedTheme } = prop;
  const themes = getThemeOptions();
//   const [selectedTheme, setSelectedTheme] = useState<string>('default');

  const themeConfig = getThemeConfig(selectedTheme);

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6">
      <div>
        <Label className="text-lg">Select Slide Theme</Label>
        <Select value={selectedTheme} onValueChange={setSelectedTheme}>
          <SelectTrigger>
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                {theme.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">View Theme Details</Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <Card>
            <CardContent className="p-4 space-y-2">
                {/* {console.log(themeConfig)} */}
              <div>
                <strong>Description:</strong>
                <p>{themeConfig.ThemeDescription}</p>
              </div>
              <div>
                <strong>Header:</strong> {themeConfig.HeaderLocation}
              </div>
              <div>
                <strong>Footer:</strong> {themeConfig.FooterLocation}
              </div>
              <div>
                <strong>Features:</strong>
                <ul className="list-disc list-inside">
                  <li>Lead Class: {themeConfig.UseLeadClass ? 'Yes' : 'No'}</li>
                  <li>Invert Class: {themeConfig.HasInvertClass ? 'Yes' : 'No'}</li>
                  <li>Tiny Text: {themeConfig.HasTinyTextClass ? 'Yes' : 'No'}</li>
                  <li>Title Class: {themeConfig.HasTitleClass ? 'Yes' : 'No'}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeSelector;
