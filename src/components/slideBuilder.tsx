"use client";

import React, { useState } from 'react';
import ThemeSelector from '@/components/ThemeSelector';
import { getAudiencePrompt, Audience } from '@/slides/settings/audience';
import { getSlideDetailPrompt, SlideDetail } from '@/slides/settings/slideDetails';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import SlidePreview from '@/components/slidesPreview';

const SlideBuilder = () => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState<Audience>('general');
  const [slideDetail, setSlideDetail] = useState<SlideDetail>('medium');
  const [generatedSlides, setGeneratedSlides] = useState<{ id: string, content: string }[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('default');
  const [customPrompt, setCustomPrompt] = useState('');
  const [deckMarkdown, setDeckMarkdown] = useState<string>('');
  const [deckId, setDeckId] = useState<string>('');
  const [selectedTextIndex, setSelectedTextIndex] = useState<number | null>(0);

  const generateSlides = async () => {
    const prompt = customPrompt || `Create a slide deck on: ${topic}\n\n${getSlideDetailPrompt(slideDetail)}\n\n${getAudiencePrompt(audience)}`;

    const response = await fetch('/api/slide/first', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        audience,
        settings: slideDetail,
        theme: selectedTheme,
        themeExample: '',
        description: prompt
      })
    });

    const data = await response.json();
    if (data.success) {
      setDeckId(data.deckId);
      setGeneratedSlides(data.slides.map((s: any) => ({ id: s._id, content: s.contentMarkdown })));
      const markdown = data.slides.map((s: any) => s.contentMarkdown).join('\n---\n');
      setDeckMarkdown(markdown);
    }
  };

  const updateSlide = (index: number, newContent: string) => {
    const updated = [...generatedSlides];
    updated[index].content = newContent;
    setGeneratedSlides(updated);
    setDeckMarkdown(updated.map(s => s.content).join('\n---\n'));
  };

  const insertSlideBetween = async () => {
    const response = await fetch('/api/slide/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deckId,
        // previousSlide: generatedSlides[before]?.content || '',
        // nextSlide: generatedSlides[after]?.content || '',
        startIndex: generatedSlides.length,
        topic,
        theme: selectedTheme,
        settings: slideDetail,
        audience
      })
    });
    const after = generateSlides.length - 1;
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const updated = [...generatedSlides];
      updated.splice(after, 0, { id: 'new', content: data.slides[0].contentMarkdown });
      setGeneratedSlides(updated);
      setDeckMarkdown(updated.map(s => s.content).join('\n---\n'));
    }
  };

  const regenerateSlide = async (index: number) => {
    const response = await fetch('/api/slide/regenerate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        theme: selectedTheme,
        settings: slideDetail,
        audience,
        originalSlide: generatedSlides[index].content
      })
    });

    const data = await response.json();
    if (data.success) {
      updateSlide(index, data.result);
    }
  };

  const editSelectedContent = async () => {
    if (selectedTextIndex === null) return;
    const response = await fetch('/api/slide/selected', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        theme: selectedTheme,
        settings: slideDetail,
        audience,
        startIndex: selectedTextIndex,
        content: generatedSlides[selectedTextIndex].content
      })
    });

    const data = await response.json();
    if (data.success) {
      updateSlide(selectedTextIndex, data.result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">AI Slide Builder</h1>

      <div className="space-y-4">
        <Label>Topic / Title</Label>
        <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter your topic or title here..." />
      </div>

      <div className="space-y-4">
        <Label>Custom Prompt (Optional)</Label>
        <Textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} placeholder="Or enter a custom prompt..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label>Audience</Label>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {['general', 'academic', 'technical', 'professional', 'executive'].map(a => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Detail Level</Label>
          <Select value={slideDetail} onValueChange={setSlideDetail}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {['detailed', 'medium', 'minimal'].map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Theme</Label>
          <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        </div>
      </div>

      <div>
        <Button onClick={generateSlides}>Generate Slides</Button>
      </div>

      {deckMarkdown && (
        <div>
          <h2 className="text-xl font-semibold">Slide Preview</h2>
          <SlidePreview markdown={deckMarkdown} selectedTheme={selectedTheme} />
        </div>
      )}

      {generatedSlides.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Edit Slides</h2>
          {generatedSlides.map((slide, idx) => (
            <Card key={slide.id} className="border border-muted">
              <CardContent className="p-4 space-y-2">
                <Label className="text-sm">Slide {idx + 1}</Label>
                <Textarea
                  value={slide.content}
                  onChange={(e) => updateSlide(idx, e.target.value)}
                  className="mt-2"
                  onClick={() => setSelectedTextIndex(idx)}
                />
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => regenerateSlide(idx)}>Regenerate</Button>
                  {idx > 0 && idx < generatedSlides.length && (
                    <Button variant="outline" onClick={() => insertSlideBetween()}>Insert Slide Here</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {selectedTextIndex !== null && (
            <div className="flex justify-end">
              <Button variant="default" onClick={editSelectedContent}>
                Apply Edit to Selected Slide
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SlideBuilder;