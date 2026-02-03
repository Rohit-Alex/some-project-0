import { apiPatch, apiPost } from "../../services/axios";
import { withMockData, shouldUseMockData } from "../../utils/withMockData";
import { mockLogin, mockRegister, mockForgotPassword, mockLogout, mockUpdateUserInfo, mockUpdatePassword } from "./mocks";
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LogoutResponse,
    UpdateUserInfoRequest,
    UpdateUserInfoResponse,
    UpdatePasswordRequest,
    UpdatePasswordResponse,
} from "./types";

//<==============================|| AUTH API SERVICES ||==============================>//

const AUTH_ENDPOINTS = {
    LOGIN: "/user/auth/login",
    FORGOT_PASSWORD: "/user/auth/forgot-password",
    LOGOUT: "/user/auth/logout",
    UPDATE_INFO: "/user/update-info",
    UPDATE_PASSWORD: "user/auth/update-password",

    REGISTER: "/auth/register",
    CHECK_EMAIL: "/check-mail",
    RESET_PASSWORD: "/auth/reset-password",
    REFRESH_TOKEN: "/auth/refresh",
    ME: "/auth/me",
} as const;

/**
 * Login user
*/
export async function loginService(data: LoginRequest): Promise<LoginResponse> {
    return withMockData(
        () => apiPost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, data),
        () => mockLogin(data),
        shouldUseMockData
    )
};

/**
 * Register new user
*/
export async function registerService(data: RegisterRequest): Promise<RegisterResponse> {
    return withMockData(
        () => apiPost<RegisterResponse, RegisterRequest>(AUTH_ENDPOINTS.REGISTER, data),
        () => mockRegister(data),
        shouldUseMockData
    )
};

/**
 * Request password reset
*/
export async function forgotPasswordService(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return withMockData(
        () => apiPost<ForgotPasswordResponse, ForgotPasswordRequest>(AUTH_ENDPOINTS.FORGOT_PASSWORD, data),
        () => mockForgotPassword(data),
        shouldUseMockData
    )
};

/**
 * Logout user
*/
export async function logoutService(): Promise<LogoutResponse> {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return withMockData(
        () => apiPost<LogoutResponse, object>(AUTH_ENDPOINTS.LOGOUT, {}, { headers: { "access-token": accessToken, "refresh-token": refreshToken } }),
        () => mockLogout(),
        shouldUseMockData
    );
};

/**
 * Update user personal info
*/
export async function updateUserInfoService(data: UpdateUserInfoRequest): Promise<UpdateUserInfoResponse> {
    return withMockData(
        () => apiPatch<UpdateUserInfoResponse, UpdateUserInfoRequest>(AUTH_ENDPOINTS.UPDATE_INFO, data),
        () => mockUpdateUserInfo(data),
        shouldUseMockData
    );
};

/**
 * Update user password
*/
export async function updatePasswordService(data: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    return withMockData(
        () => apiPost<UpdatePasswordResponse, UpdatePasswordRequest>(AUTH_ENDPOINTS.UPDATE_PASSWORD, data),
        () => mockUpdatePassword(data),
        shouldUseMockData
    );
}