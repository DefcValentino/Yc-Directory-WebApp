import * as yup from 'yup';



export const startupSchema = yup.object().shape({
    title: yup.string().required('Title is required'),      
    description: yup.string().required('Description is required'),
    category: yup.string().required('category is required'),
    pitch: yup.string().required('Pitch is required'),
    Link: yup.string().url('Must be a valid URL').required('image is required'),
    
})