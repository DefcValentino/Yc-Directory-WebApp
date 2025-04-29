import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'


export const startup = defineType({
  name: 'startup',
  title: 'startup',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
        name: 'title',
        type: 'string',
    }),


    defineField({
      name: 'slug', 
      type: 'slug',

        options: {
            source: 'title'
        }
    }),

    defineField({
        name: 'image',
        type: 'image',
        options: { hotspot: true },
    }),

    defineField({
      name: 'author',
      type: 'reference',
       to: { type: 'author' },
    }),


    defineField({
      name: 'views',
      type: 'number',
      initialValue: 0,
      
    }),
 

    defineField({
      name: 'pitch',
      type: 'markdown',
      
    }),
  ],
})







