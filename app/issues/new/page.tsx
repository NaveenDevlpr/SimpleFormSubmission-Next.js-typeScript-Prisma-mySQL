"use client";

import React, { useState } from 'react'
import { TextField ,Text,TextArea,Button,Callout,CalloutIcon,CalloutRoot,CalloutText} from '@radix-ui/themes'
import {useForm,Controller} from 'react-hook-form'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/Validations';
import { z } from 'zod';
import ErrorMessage from '@/app/components/errorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm=z.infer<typeof createIssueSchema>
const NewIssePage = () => {

    const [error,setError]=useState('');
    const [IsSubmitting,setSubmitting]=useState(false)
   
    const router=useRouter();
    const {register,control,handleSubmit,formState:{errors}}=useForm<IssueForm>({
        resolver:zodResolver(createIssueSchema)
    })

  return (
    <div>
         {
            error && (<Callout.Root color='red'>
                <Callout.Text>
                    {error}
                </Callout.Text>
                </Callout.Root>)
            
        }

<form className='max-w-xl space-y-4' onSubmit={handleSubmit(async(data)=>
   {
   
    try {
        setSubmitting(true)
      //  await axios.post('/api/issues',data)
      await fetch('/api/issues',{
        method:'POST',headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
        router.push('/issues')
    } 
    catch (error) {
        setSubmitting(false)
      setError('error occured')
    }
    }
    )}>
       
        <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
       <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
        name="description"
        control={control}
        render={({field})=><SimpleMDE placeholder='description' {...field}/>}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={IsSubmitting} type='submit'>Submit New Issue {IsSubmitting && <Spinner/>}</Button>
    </form>
    </div>
    
  )
}

export default NewIssePage