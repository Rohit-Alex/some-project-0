import type { ApiStatus } from '../../types';

//<==============================|| AUTH TYPES ||==============================>//

export interface User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    loginType: string;
    domainUsername?: string | null;
    azureUpn?: string | null;
};

export interface LoginRequest {
    username: string;
    password: string;
    login_type: string;
};

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        login_type: string;
        domain_username: string | null;
        azure_upn: string | null;
        wrong_password_attempts: number;
    };
    _headers?: {
        'access-token'?: string;
        'refresh-token'?: string;
    };
};

export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
};

export interface RegisterResponse {
    message: string
    user?: User
};

export interface ForgotPasswordRequest {
    email: string;
    captcha_res_token: string | null;
};

export interface ForgotPasswordResponse {
    message: string
};

export interface ResetPasswordRequest {
    token: string
    password: string
};

export interface ResetPasswordResponse {
    message: string
};

export interface LogoutResponse {
    success: boolean;
    message: string;
};

/*<============================== User Profile ==============================>*/
export interface UpdateUserInfoRequest {
    first_name: string;
    last_name: string;
};

export interface UpdateUserInfoResponse {
    success: boolean;
    message: string;
    data: {
        first_name: string;
        last_name: string;
    };
};

/*<============================== Update Password ==============================>*/
export interface UpdatePasswordRequest {
    old_password: string;
    new_password: string;
};

export interface UpdatePasswordResponse {
    success: boolean;
    message: string;
};

//<==============================|| STORE TYPES ||==============================>//

export interface AuthLoadingStates {
    login: ApiStatus
    register: ApiStatus
    forgotPassword: ApiStatus
    resetPassword: ApiStatus
    fetchUser: ApiStatus
    logout: ApiStatus;
    updatePassword: ApiStatus;
};

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    accessToken: string | null
    loadingStates: AuthLoadingStates
};

export interface AuthStore extends AuthState {
    setStoreData: (
        data: Partial<AuthState> | ((state: AuthState) => Partial<AuthState>)
    ) => void
    reset: () => void
};
