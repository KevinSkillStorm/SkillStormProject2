export declare var currentUserId: number;

export function setIdResponse(val: number) {
    currentUserId = val;
}

export function getIdReponse(): number {
    return currentUserId;
}