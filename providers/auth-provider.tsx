"use client";

import { syncUserWithDb } from "@/app/server/auth";
import { notify } from "@/components/global/Notify";
import { app } from "@/firebase/firebase-config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    googleSignIn: (redirectPath?: string) => Promise<void>;
    signUpWithEmailPasswordAndOtherCredentials: (
        email: string,
        password: string,
        name: string,
        phoneNumber: string,
        redirectPath?: string,
    ) => Promise<void>;
    signInWithEmailPassword: (
        email: string,
        password: string,
        redirectPath?: string,
    ) => Promise<void>;
}

export const auth = getAuth(app);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const signUpWithEmailPasswordAndOtherCredentials = async (
        email: string,
        password: string,
        name: string,
        phoneNumber: string,
        redirectPath?: string,
    ) => {
        setLoading(true);
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            // console.log("user credential", userCredentials?.user);

            await syncUserWithDb(
                email,
                phoneNumber,
                name,
                userCredentials?.user?.uid || "",
            );

            if (redirectPath) {
                router.push(redirectPath);
            }
            notify.success("Account Created Successfully!");
        } catch (error) {
            console.error(
                "Error creating user with email and password:",
                error,
            );
            notify.error("Failed to Create Account! Try again later.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(
                auth,
                new GoogleAuthProvider(),
            );
            console.log("user credential", result?.user);

            await syncUserWithDb(
                result?.user?.email || "",
                "",
                result?.user?.displayName || "",
                result?.user?.uid || "",
            );

            notify.success("Signed in successfully");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            notify.error("Failed to sign in! Try again later.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signInWithEmailPassword = async (
        email: string,
        password: string,
        redirectPath?: string,
    ) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (redirectPath) {
                router.push(redirectPath);
            }
            notify.success("Signed in successfully!");
        } catch (error) {
            console.error("Error signing in with email/password:", error);
            notify.error("Failed to sign in! Check your credentials.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Current User: ", currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        signUpWithEmailPasswordAndOtherCredentials,
        signInWithEmailPassword,
        googleSignIn,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
