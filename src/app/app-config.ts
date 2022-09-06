import { MsalGuardConfiguration, MsalInterceptorConfiguration, ProtectedResourceScopes } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";
import { Configuration, LogLevel } from "msal";

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

export const msalConfig : Configuration = {
    auth: {
        clientId: "25d9c810-c2a0-4f1e-8be8-e7cd7d02a31a",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        // redirectUri: "https://victorious-sea-08c9bd610.1.azurestaticapps.net/",
        // postLogoutRedirectUri: "https://victorious-sea-08c9bd610.1.azurestaticapps.net/",
        redirectUri: "http://localhost:4200/",
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: true,
        validateAuthority: true,


    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,

    },
    // system: {
    //     loggerOptions: {
    //         loggerCallback: (level: LogLevel, message: string, containsPii: boolean): void => {
    //             if (containsPii) {
    //                 return;
    //             }
    //             switch (level) {
    //                 case LogLevel.Error:
    //                     console.error(message);
    //                     return;
    //                 case LogLevel.Info:
    //                     console.info(message);
    //                     return;
    //                 case LogLevel.Verbose:
    //                     console.debug(message);
    //                     return;
    //                 case LogLevel.Warning:
    //                     console.warn(message);
    //                     return;
    //             }
    //         },
    //         piiLoggingEnabled: false
    //     },
    //     windowHashTimeout: 60000,
    //     iframeHashTimeout: 6000,
    //     loadFrameTimeout: 0,
    //     asyncPopups: false
    // },
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

// Using access token to call Microsoft Graph
export const interceptconfig: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ]),
}
