"use client"

import { AnswerSchema } from '@/lib/validation';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from '@/context/ThemeProvider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { createAnswer } from '@/lib/actions/user.action';

interface AnswerProps {
  questionId: string;
  mongoUserId: string;
}

const Answer = ({questionId, mongoUserId}: AnswerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter()
  const {mode} = useTheme()
  const editorRef = useRef<any>(null);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    }
  });

  async function handleCreateAnswer(data: z.infer<typeof AnswerSchema>) {
    try{
      setIsSubmitting(true);

      // content: string;
      // author: string; // User ID
      // question: string; // Question ID
      // path: string;
      await createAnswer({
        content: data.answer,
        author: JSON.parse(mongoUserId), // User ID
        path: pathname,
        question: questionId,
      });

      form.reset()

      if(editorRef.current){
        const editor = editorRef.current

        editor.setContent('')
      }
    }catch(e){
      console.log(e)
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-11">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
      
        <Button 
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.
         text-primary-500 shadow-none dark:text-primary-500"
          onClick={()=>{}}
         >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    initialValue=""
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "codesample",
                        "help",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "default",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem you&apos;re experiencing and what you
                  want to achieve
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Answer