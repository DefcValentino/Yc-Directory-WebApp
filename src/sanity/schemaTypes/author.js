import {UserIcon} from '@sanity/icons'
import { defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'id', 
      type: 'number',
    }),

    defineField({
      name: 'name',
      type: 'string',
    }),


    defineField({
      name: 'username',
      type: 'string',
    }),


    defineField({
      name: 'image',
      title: 'Avatar URL',
      type: 'url', // not 'image'
    }),
    
    defineField({
      name: 'email',
      type: 'string',
      
    }),

    defineField({
      name: 'bio',
      type: "text",
      
    }),
  ],

  preview: {
    select: {
      title: 'name',
      imageUrl: 'image',
    },
    prepare({ title, imageUrl }) {
      return {
        title,
        media: imageUrl
          ? () => <img src={imageUrl} alt={title} style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }} />
          : UserIcon,
      };
    },
  }
})

export default authorType
