import Heading from "@/src/shared/components/typography/Heading";
import { authService } from "../services/AuthService";

export default async function ActiveSessionsList() {

    const sessions = await authService.getSessions();

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
                        <div className="">
                            <p>{session.userAgent}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
