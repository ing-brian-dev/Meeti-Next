"use client"

import { useState } from "react";
import { MeetiPermissions } from "../types/meeti.types";
import { toggleAttendance } from "../actions/attendance/attendance-action";
import toast from "react-hot-toast";

type AttendanceToggleButtonProps = {
    meetiId: string,
    permissions: MeetiPermissions
}

export default function AttendanceToggleButton({ meetiId, permissions }: AttendanceToggleButtonProps) {

    const [canConfirm, setCanConfirm] = useState(permissions.canCancel);

    const handleClick = async () => {
        const result = await toggleAttendance(meetiId);
        if (result?.success) {
            toast.success(result?.success);
            setCanConfirm(result?.newPermissions?.canConfirm);
        }

        if (result?.error) {
            toast.error(result?.error);
        }
    }

    return (
        <button
            className={`${canConfirm ? 'bg-orange-500' : 'bg-red-600'} font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer `}
            onClick={handleClick}
        >
            {canConfirm ? 'Confirmar Asistencia' : 'Cancelar Asistencia'}
        </button>
    )
}
