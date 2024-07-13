'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/services/post.service"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {fetchAllCategory} from "@/services/category.service";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type FormPostProps = {
    setOpen: (open: boolean) => void;
}

const FormPost = ({ setOpen } : FormPostProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createPost,
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

        const createPostDTO = {
            title: e.target.title.value,
            description: e.target.description.value,
            category: e.target.categorie.value
        }

        mutation.mutate(createPostDTO);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Input
                    type="text"
                    placeholder="Post title"
                    name="title"
                />
            </div>
            <div className="mb-2">
                <Textarea
                    placeholder="Post description"
                    name="description"
                />
            </div>
            <div className="mb-2">
                <Select name="categorie" required={true}>
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

export default FormPost;