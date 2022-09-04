import { MsalGuardConfiguration, MsalInterceptorConfiguration, ProtectedResourceScopes } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";
import { Configuration } from "msal";

export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Triden/') > -1;

export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_phone-client'
    },
    authorities: {
        signUpSignIn: {
            authority: "https://phonecomtech.b2clogin.com/phonecomtech.onmicrosoft.com/B2C_1_phone-client"
        }
    }
}

export const apiConfig: { b2cScopes: string[], apiEndpoint: string } = {
    b2cScopes: ["https://phonecomtech.onmicrosoft.com/phone-client/api.read"],
    apiEndpoint: "https://phonecomtech.onmicrosoft.com/phone-client/api"
}

export const msalConfig: Configuration = {
    auth: {
        clientId: "25d9c810-c2a0-4f1e-8be8-e7cd7d02a31a",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        redirectUri: "https://phoneserviceclient.pct.co",
        postLogoutRedirectUri: "https://phoneserviceclient.pct.co",
        navigateToLoginRequestUrl: true,
        validateAuthority: true,


    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,

    },
}

export const loginRequest: { scopes: string[] } = {
    scopes: ["openid", "profile"]
}

export const tokenRequest: { scopes: string[] } = {
    scopes: apiConfig.b2cScopes
}

export const protectedResourcesMap: [string, string[]][] = [
    [apiConfig.apiEndpoint, apiConfig.b2cScopes]
];

export const msalAngularConfig: {} = {
    popUp: !isIE,
    consentScopes: [
        ...loginRequest.scopes,
        ...tokenRequest.scopes,
    ],
    unprotectedResources: [],
    protectedResourcesMap,
    extraQueryParameter: {}
}

export const guardConfig: MsalGuardConfiguration = {
    interactionType: InteractionType.Redirect,
}

export const interceptconfig: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ]),
}
