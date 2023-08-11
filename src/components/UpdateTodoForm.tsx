'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IFormInput {
    title: string;
    description: string;
}

interface Props {
    id: number;
    title: string;
    description: string;
}

const UpdateTodoForm = ({ id, title, description }: Props) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            title: title,
            description: description
        }
    });
    const onSubmit: SubmitHandler<IFormInput> = async (data) => submit(data, id);

    async function submit(data: IFormInput, id: number) {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error('更新に失敗しました。');
        }
        router.push("/todo");
        router.refresh();
    }

    return (
        <div className='w-full max-w-xl'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label htmlFor="title" className='block text-gray-700 text-sm font-bold mb-2'>タイトル:</label>
                    <input {...register("title", { required: true, maxLength: 128 })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    {errors?.title?.type === 'required' && <p className='text-red-600'>必須です。</p>}
                    {errors?.title?.type === 'maxLength' && <p className='text-red-600'>タイトルは128文字以内で入力してください。</p>}
                </div>
                <div className='mb-4'>
                    <label htmlFor="description" className='block text-gray-700 text-sm font-bold mb-2'>内容:</label>
                    <textarea {...register("description", { required: true, maxLength: 1024 })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                    {errors?.description?.type === 'required' && <p className='text-red-600'>必須です。</p>}
                    {errors?.description?.type === 'maxLength' && <p className='text-red-600'>内容は1024文字以内で入力してください。</p>}
                </div>
                <div className='flex items-center justify-between'>
                    <input type="submit" value="更新" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </div>
            </form>
        </div>
    );
}

export default UpdateTodoForm;