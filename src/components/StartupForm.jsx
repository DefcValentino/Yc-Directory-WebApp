"use client"

import React, { useActionState } from 'react' 
import {toast} from 'sonner'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Link } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { startupSchema } from '@/lib/validation'



const StartupForm = () => {
    const [errors, setErrors] = useState({});
    const [pitch, setPitch] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.category.value,
            Link: e.target.Link.value,
            pitch,
        };

        try {
            await startupSchema.validate(formData, { abortEarly: false });
            setErrors({});
            setIsPending(true);

            // TODO: Handle actual form submission logic here
            toast.success("Submitted successfully!");
        } catch (err) {
            if (err.inner) {
                const formErrors = {};
                err.inner.forEach((error) => {
                    formErrors[error.path] = error.message;
                });
                setErrors(formErrors);
            }

            toast({
                variant: "destructive",
                title: "Error",
                description: "Please fill in all required fields.",
            })
            
        } finally {
            setIsPending(false);
        }


        const [state, formAction, isPending] = useActionState(handleFormSubmit, {
            initialState: {
                error: "",
                status: "INITIAL",
            },
        });
    

    };


    

  return (
    <div>
        <form onSubmit={handleFormSubmit} className='startup-form'>
            <div>
                <label htmlFor="title" className='statup-form_label text-black'>
                    Title
                    <Input
                        id="title"
                        name="title"
                        className="startup-form_input"
                        placeholder="Enter your startup title"  
                    />

                    {errors.title && <p className='startup-form_error text-red-500 text-md'>{errors.title}</p>}
                </label>
            </div>


            {/* Description Input */}
            <div>
                <label htmlFor="description" className='statup-form_label text-black'>
                    Description
                    <Textarea
                        id="description"
                        name="description"
                        className="startup-form_textarea"
                        placeholder="Startup Description"  
                    />

                    {errors.description && <p className='startup-form_error text-red-500 text-md'>{errors.description}</p>}
                </label>
            </div>

            {/* Category Input */}
            <div>
                <label htmlFor="category" className='statup-form_label  text-black'>
                    Category
                    <Input
                        id="category"
                        name="category"
                        className="startup-form_input"
                        placeholder="Startup category (Tech, Health, Education...)"  
                    />
 
                    {errors.category && <p className='startup-form_error text-red-500 text-md'>{errors.category}</p>}
                </label>
            </div>

            {/* Link Input */}
            <div>
                <label htmlFor="Link" className='statup-form_label text-black'>
                      Image URL
                    <Input
                        id="Link"
                        name="Link"
                        className="startup-form_input"
                        placeholder="Startup image URL"
                    />

                    {errors.Link && <p className='startup-form_error text-red-500 text-md'>{errors.Link}</p>}
                </label>
            </div>


            {/* Pitch Input */}
            <div data-color-mode="light">
                <label htmlFor="category" className='statup-form_label text-black'>
                    Pitch
                    <MDEditor
                        value={pitch}
                        onChange={(value) => setPitch(value)}
                        id="pitch"
                        preview='edit'
                        height={300}
                        style = {{borderRadius: 20, overflow: 'hidden'}}
                        textareaProps={{
                            placeholder: 'Briefly describe your idea and the problem it solves',
                        }}

                        previewOptions={{
                            disallowedElements: ["style"],
                        }}
                        
                    />
 
                    {errors.pitch && <p className='startup-form_error text-red-500 text-md'>{errors.pitch}</p>}
                </label>
            </div>

            <Button type="submit" className="startup-form_btn cursor-pointer bg-[#EE2B69]">
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2"/>
            </Button>
        </form>
    </div>
  )
}

export default StartupForm