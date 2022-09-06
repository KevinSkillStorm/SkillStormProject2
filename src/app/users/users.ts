import { Device } from "../devices/devices";
import { UserPlan } from "../user-plans/user-plans";

export interface User{
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
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