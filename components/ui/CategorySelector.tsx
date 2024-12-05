'use client'

import { Category } from "@/sanity.types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CategoryProps {
    categories: Category[]
}

export const CategorySelector = ({ categories }: CategoryProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const router = useRouter()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value
                        ? categories.find((category) => category._id === value)?.title
                        : "Filter by Category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandEmpty>No Category Found.</CommandEmpty>
                    <CommandInput placeholder="Search Category..." className="h-9"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const selected = categories.find(c => c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                                if (selected?.slug?.current) {
                                    setValue(selected._id)
                                    router.push(`/categories/${selected.slug.current}`)
                                    setOpen(false)
                                }
                            }
                        }} />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={() => {
                                        setValue(value === category._id ? "" : category._id)
                                        router.push(`/categories/${category.slug?.current}`)
                                        setOpen(false)
                                    }}
                                >
                                    {category.title}
                                    <Check className={cn("ml-auto h-4 w-4", value === category._id ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}