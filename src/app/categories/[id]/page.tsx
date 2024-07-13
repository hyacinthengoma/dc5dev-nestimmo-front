'use client'

import DialogConfirmDelete from "@/components/globals/DialogConfirmDelete";
import { useToast } from "@/components/ui/use-toast";
import { deletePost, fetchPostById } from "@/services/post.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import {deleteCategory, fetchCategoryById} from "@/services/category.service";
import DrawerUpdate from "@/components/post/DrawerUpdate";
import DrawerUpdateCategory from "@/components/category/DrawerUpdatecategory";

type CategoryDetailParams = {
    id: string;
}

const CategoryDetail = () => {
    const { id } = useParams<CategoryDetailParams>();
    const router = useRouter();
    const { toast } = useToast()

    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchCategoryById(id)
    })

    const mutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast({
                title: 'Category deleted',
                description: 'Your category has been deleted',
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
            <h1>{data.name}</h1>
            <DrawerUpdateCategory
                id={id}
                name={data.name}
            />
            <DialogConfirmDelete
                handleDelete={handleDelete}
                isPending={mutation.isPending}
            />
        </div>
    );
}

export default CategoryDetail;