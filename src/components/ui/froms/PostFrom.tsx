import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import { Textarea } from "../textarea"
import FileUploader from "../shared/FileUploader"
import { Input } from "../input"
import { PostValidation } from "@/lib/validation"
import { useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../use-toast"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutation"

type PostFromProps = {
    post?:Models.Document;
    action:'Create' | 'Update';
}
 
const PostFrom = ({post,action}:PostFromProps) => {

    const { user} = useUserContext();
    const { toast} = useToast();
    const navigate = useNavigate();

    const  { mutateAsync: createPost,isLoading:isLoadingCreate} = useCreatePost();
    const  { mutateAsync: updatePost,isLoading:isLoadingUpdate} = useUpdatePost();


    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption:post ? post?.caption:"",
          file:[],
          location:post? post?.location:"",
          tags:post?post?.tags.join(','):''
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof PostValidation>) {

        if(post && action === 'Update'){
          const updatedPost = await updatePost({
              ...values,
              postId:post.$id,
              imageId:post?.imageId,
              imageUrl:post?.imageUrl,
          })

          if(!updatedPost){
            toast({title: 'Error updating post'})
          }

          return navigate(`/posts/${post.$id}`)
            
        }
        const newPost = await createPost({
            ...values,
            userId:user.id,
        })

        if(!newPost){
            toast({
                title:'Please try again'
            })
        }

        navigate('/');
      }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader filechange={field.onChange} mediaUrl={post?.imageUrl}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input"{...field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

    <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add tags (separated by comma " ,  ")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="JS, React, NextJS" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        
        <Button type="button" className="shad-button_dark_4">Cancel</Button>
        <Button type="submit" className="shad-button_primary whitespace-nowrap"
        disabled={isLoadingCreate || isLoadingUpdate} >{isLoadingCreate || isLoadingUpdate && 'Loading...'}
        {action} Post</Button>
      </form>
    </Form>
  )
}

export default PostFrom