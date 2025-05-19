import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type Profile = {
    group: string;
    id : string;
    fav : Array<string>;
    username : string;
    avatar_url : string;
};

type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: Profile | null;
    isAdmin: boolean;
    isOwner: boolean;
    id: string | undefined;
    fav: Array<string>; // Use 'number' instead of 'Int32'
    username : string|undefined;
    profilePicture : string|undefined;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false,
    isOwner: false,
    id: undefined,
    fav: [],
    username:undefined,
    profilePicture:undefined
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                await fetchProfile(session.user.id); // Ensure it awaits the profile fetch
            }
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
                console.log('profile');
            }
        });

        return () => {
            subscription?.unsubscribe(); // Clean up the subscription
        };
    }, []);

    const fetchProfile = async (userId: string) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error("Error fetching profile:", error.message);
        } else {
            setProfile(data || null);
            console.log()
        }
    };

    return (
        <AuthContext.Provider
            value={{
                session,
                loading,
                profile,
                isAdmin: profile?.group === 'ADMIN',
                isOwner: profile?.group === 'OWNER',
                id: profile?.id,
                fav: profile?.fav || [],
                username : profile?.username,
                profilePicture : profile?.avatar_url
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
