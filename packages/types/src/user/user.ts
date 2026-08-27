import { Timestamps } from "../common/timestamps.js"
import { Challenge } from "./challenge.js";
import { Email } from "./email.js";

export interface User extends Timestamps {
    username: string;
    email: Email;
    publicKey: string; // argon2 key
    challanges: Challenge[];
}