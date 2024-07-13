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
import FormPost from "./FormCategory";
import { useState } from "react";
import FormUpdateCategory from "@/components/category/FormUpdateCategory";

const DrawerUpdateCategory = ({id, name}) => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="default">
                    Update category
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Ajouter une category</DrawerTitle>
                    <DrawerDescription className="text-center">Renseignez l'ensemble des champs.</DrawerDescription>
                    <FormUpdateCategory setOpen={setOpen}  id={id} name={name}/>
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

export default DrawerUpdateCategory;