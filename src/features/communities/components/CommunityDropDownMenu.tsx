"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { SelectCommunity } from "../types/community.types"
import Link from "next/link"

type CommunityDropdownMenuProps = {
    community: SelectCommunity
}

export default function CommunityDropdownMenu({ community }: CommunityDropdownMenuProps) {

    return (
        <Menu as="div" className="relative flex-none">
            <MenuButton className="relative block text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-black cursor-pointer">
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Abrir Menú</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            >
                <MenuItem>
                    <Link
                        href={``}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                    >
                        Ver Miembros <span className="sr-only">, {community.name}</span>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link
                        href={`/dashboard/communities/${community.id}/edit`}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden dark:text-white dark:data-focus:bg-white/5"
                    >
                        Editar <span className="sr-only">, {community.name}</span>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button
                        type="button"
                        onClick={() => { }}
                        className="block text-left w-full px-3 py-1 text-sm/6 text-red-600 data-focus:bg-gray-50 data-focus:outline-hidden cursor-pointer"
                    >
                        Eliminar<span className="sr-only">, {community.name}</span>
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    )
}