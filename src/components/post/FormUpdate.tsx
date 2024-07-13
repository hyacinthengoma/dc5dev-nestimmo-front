'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {createPost, updatePost} from "@/services/post.service"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {fetchAllCategory} from "@/services/category.service";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type FormUpdateProps = {
    setOpen: (open: boolean) => void;
    id: string;
    title: string;
    description: string;
    category: string;
}

const FormUpdate = ({ setOpen, id, title, description, category }: FormUpdateProps ) => {
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllPosts']
            })
            setOpen(false);
        },
    });



    const { isPending, error, data } = useQuery({
        queryKey: ['getAllCategory'],
        queryFn: fetchAllCategory
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatePostDTO = {
            id: id,
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.categorie.value
        }

        mutation.mutate(updatePostDTO);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Input
                    type="text"
                    placeholder="Post title"
                    name="title"
                    defaultValue={title}
                />
            </div>
            <div className="mb-2">
                <Textarea
                    placeholder="Post description"
                    name="description"
                    defaultValue={description}
                />
            </div>
            <div className="mb-2">
                <Select name="categorie" defaultValue={category} required={true}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category"/>
                    </SelectTrigger>
                    <SelectContent>
                        {data && data.map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Create post
                </Button>
            </div>
        </form>
    );
}

export default FormUpdate;