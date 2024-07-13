'use client';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button";
import FormUpdate from "./FormUpdate";
import { useState } from "react";

const DrawerPost = ({id, category, description, title}) => {
    const [open, setOpen] = useState(false);

    return (
    <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="default">
                    Modifier le post
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Modifier un post</DrawerTitle>
                    <DrawerDescription className="text-center">Renseignez l'ensemble des champs.</DrawerDescription>
                    <FormUpdate setOpen={setOpen}  category={category} description={description} id={id} title={title}/>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerPost;