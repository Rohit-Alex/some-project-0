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
    UpdatePasswordResponse
} from "./types";

//<==============================|| MOCK DATA ||==============================>//

export function mockLogin(data: LoginRequest): LoginResponse {
    return {
        success: true,
        message: "Login successful",
        data: {
            id: 1,
            username: data.username,
            first_name: "John",
            last_name: "Doe",
            email: data.username,
            login_type: data.login_type,
            domain_username: null,
            azure_upn: null,
            wrong_password_attempts: 0,
        },
        _headers: {
            "access-token": "Bearer mock-jwt-" + Date.now(),
            "refresh-token": "Bearer mock-refresh-" + Date.now(),
        },
    };
};

export function mockRegister(data: RegisterRequest): RegisterResponse {
    return {
        message: "Registration successful! Please check your email to verify your account.",
        user: {
            id: 2,
            email: data.email,
            username: data.email.split("@")[0],
            firstName: data.firstName,
            lastName: data.lastName,
            loginType: "local",
            domainUsername: null,
            azureUpn: null,
        },
    };
};

export function mockForgotPassword(data: ForgotPasswordRequest): ForgotPasswordResponse {
    return {
        message: `Password reset email sent to ${data.email}`,
    };
};

export function mockLogout(): LogoutResponse {
    return {
        success: true,
        message: "Logged out successfully.",
    };
};

export function mockUpdateUserInfo(data: UpdateUserInfoRequest): UpdateUserInfoResponse {
    return {
        success: true,
        message: "Profile updated successfully.",
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
        },
    };
};

export function mockUpdatePassword(_data: UpdatePasswordRequest): UpdatePasswordResponse {
    return {
        success: true,
        message: "Password updated successfully.",
    };
};

