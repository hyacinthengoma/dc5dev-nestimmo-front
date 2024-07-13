'use client'

import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { useToast } from "@/components/ui/use-toast";
import { deletePost, fetchPostById } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import DrawerUpdate from "@/components/post/DrawerUpdate";

type PostDetailParams = {
    id: string;
}

const PostDetail = () => {
    const { id } = useParams<PostDetailParams>();
    const router = useRouter();
    const { toast } = useToast()

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchPostById(id)
    })

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast({
                title: 'Post deleted',
                description: 'Your post has been deleted',
            })
            router.push('/')
        }
    });

    const handleDelete = () => {
        mutation.mutate(id);
    }

    if(isPending) return <div className="h-full flex justify-center items-center">Loading...</div>
    console.log(data)
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <DrawerUpdate
                id={id}
                title={data.title}
                description={data.description}
                category={data.category.id}
            />
            <DialogConfirmDelete 
                handleDelete={handleDelete} 
                isPending={mutation.isPending}
            />

        </div>
     );
}
 
export default PostDetail;