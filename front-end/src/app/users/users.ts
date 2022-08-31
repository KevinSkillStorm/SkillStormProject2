import { Device } from "../devices/devices";
import { PhoneNumber } from "../phone-numbers/phone-numbers";
import { UserPlan } from "../user-plans/user-plans";

export interface User{
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    phoneNumbers: PhoneNumber[],
    userPlans: UserPlan[],
    devices: Device[]
}
export interface UserDTO{
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
}
export interface UserDetailsDTO{
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
}