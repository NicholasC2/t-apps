import { TAppID, Request, TAppToken } from "@t-apps/types"

const API_URL = "https://t-apps.com"

export enum RedirectType {
    LOGIN = "login",
}

export enum Permission {
    GET_IRL_NAME = "get_irl_name",
}

export type Redirect =
    | LoginRedirect;

export interface LoginRedirect {
    type: RedirectType.LOGIN;
    permissions: Permission[];
    appID: TAppID;
}

export class Tapp {
    constructor(
        public readonly id: TAppID,
        public readonly token: TAppToken
    ) {}

    async send<T>(
        endpoint: string,
        request: Request,
        username: string
    ) {
        return fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-App-ID": this.id as string,
                "X-Username": username,
                "Authorization": this.token as string,
            },
            body: JSON.stringify(request.data),
        });
    }

    createRedirectURL(redirect: Redirect) {
        switch(redirect.type) {
            case RedirectType.LOGIN:
                const params = new URLSearchParams({
                    appID: redirect.appID,
                    permissions: redirect.permissions.join(","),
                });

                return `${API_URL}/auth/${redirect.type}/?${params}`
        }
    }
}