import Heading from "@/src/shared/components/typography/Heading";
import { authService } from "../services/AuthService";
import { formatUserAgent } from "@/src/shared/utils/agent";

export default async function ActiveSessionsList() {

    const [sessions, currentSession] = await Promise.all([
        authService.getSessions(),
        authService.getSession()
    ]);

    const isCurrentDevice = (currentSessionId: string) => currentSessionId === currentSession?.session.id;

    return (
        <>

            <Heading
                level={2}
                className="mt-10"
            >
                Sessiones activas
            </Heading>
            <div
                className="mt-10 p-5 border border-gray-200"
            >
                {sessions.map(session => (
                    <div
                        key={session.id}
                        className="p-5 shadow-xs flex items-center"
                    >
                        <div
                            className="flex gap-2 items-center flex-1"
                        >
                            <p>{formatUserAgent(session.userAgent!)}</p>
                            {isCurrentDevice(session.id) && <p
                                className="text-green-600 font-bold bg-green-200 border border-green-200 rounded-sm inline-block px-3 py-1 uppercase text-xs"
                            >
                                Dispositivo actual
                            </p>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
