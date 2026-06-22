"use client"

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../ui/Logo';
import UserMenu from './UserMenu';
import MobileSidebar from './MobileSidebar';
import DashboardNavigation from './DashboardNavigation';
import NotificationsPanel from './NotificationPanel';
import { useSession } from '@/src/lib/auth-client';

export default function DashboardPanel() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { isPending , data} = useSession();
    if(isPending || !data) return 'Cargando...';
    
    return (
        <>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        <MobileSidebar />
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col dark:bg-gray-900">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-white/10 dark:bg-black/10">
                    <div className="flex justify-center pt-5 w-full">
                        <div className='w-32'>
                            <Logo />
                        </div>
                    </div>
                    <DashboardNavigation />
                </div>
            </div>

            {/* Top Bar */}
            <div className='flex justify-between w-full p-5' >
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900  dark:text-gray-400 dark:hover:text-white"
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>

                <div className="flex-1 text-lg font-semibold text-gray-900 dark:text-white lg:hidden ml-5">
                    Menú de Navegación
                </div>

                <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                    <NotificationsPanel />
                    <UserMenu 
                        userId={data.user.id}
                    />
                </div>
            </div>
        </>
    );
}