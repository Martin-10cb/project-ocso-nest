import { applyDecorators, UseGuards } from "@nestjs/common"
import { AuthGuard } from "../guards/auth.guards"
import { RolesGuard } from "../guards/roles.guards"
import { ROLES } from "../constants/roles.constants"
import { Roles } from "./roles.decorator"


export const Auth = (...roles:ROLES[]) => {
    roles.push(ROLES.ADMIN)
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}