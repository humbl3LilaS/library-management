"use server";

import { IUser, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { AuthErrorCause, IAuthError } from "@/error/AuthError";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
