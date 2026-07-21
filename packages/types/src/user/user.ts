import { Timestamps } from "../common/timestamps.js"
import { Email } from "./email.js";

export interface User extends Timestamps {
    username: string;
    email: Email;
}