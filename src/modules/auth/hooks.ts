import useAuthStore from "./store";
import { ROUTES } from "../../config/routes";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API_STATUS } from "../../constants/apiStatus";
import type {
    LoginRequest,
    RegisterRequest,
    ForgotPasswordRequest,
    UpdateUserInfoRequest,
    UpdatePasswordRequest,
} from "./types";

import {
    loginService,
    registerService,
    forgotPasswordService,
    logoutService,
    updateUserInfoService,
    updatePasswordService,
} from "./services";

//<==============================|| AUTH HOOKS ||==============================>//

/**
 * Login mutation hook
*/
export function useLogin() {
    const navigate = useNavigate()
    const setStoreData = useAuthStore((state) => state.setStoreData)

    return useMutation({
        mutationFn: (data: LoginRequest) => loginService(data),

        onMutate: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, login: API_STATUS.Loading },
            }))
        },

        onSuccess: (response) => {
            const accessToken = response._headers?.["access-token"];
            const refreshToken = response._headers?.["refresh-token"];

            if (!accessToken) return;

            localStorage.setItem("accessToken", accessToken);
            if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

            const { data } = response;

            const mappedUser = {
                id: data.id,
                email: data.email,
                username: data.username,
                firstName: data.first_name,
                lastName: data.last_name,
                loginType: data.login_type,
                domainUsername: data.domain_username,
                azureUpn: data.azure_upn,
            };

            setStoreData((state) => ({
                user: mappedUser,
                isAuthenticated: true,
                accessToken,
                loadingStates: {
                ...state.loadingStates,
                login: API_STATUS.Success,
                },
            }));

            navigate(ROUTES.DASHBOARD_DEVICE_CONTROL);
        },

        onError: (error) => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, login: API_STATUS.Error },
            }));
            console.error("Login failed:", error);
        },
    })
};


/**
 * Register mutation hook
*/
export function useRegister() {
    const navigate = useNavigate();
    const setStoreData = useAuthStore((state) => state.setStoreData);

    return useMutation({
        mutationFn: (data: RegisterRequest) => registerService(data),

        onMutate: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, register: API_STATUS.Loading },
            }));
        },

        onSuccess: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, register: API_STATUS.Success },
            }));

            navigate(ROUTES.LOGIN);
        },

        onError: (error) => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, register: API_STATUS.Error },
            }));
            console.error("Registration failed:", error);
        },
    })
};


/**
 * Forgot password mutation hook
*/
export function useForgotPassword() {
    const setStoreData = useAuthStore((state) => state.setStoreData);

    return useMutation({
        mutationFn: (data: ForgotPasswordRequest) => forgotPasswordService(data),

        onMutate: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, forgotPassword: API_STATUS.Loading },
            }));
        },

        onSuccess: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, forgotPassword: API_STATUS.Success },
            }));
        },

        onError: (error) => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, forgotPassword: API_STATUS.Error },
            }));
            console.error("Forgot password failed:", error);
        },
    })
};


/**
 * Logout helper
*/
export function useLogout() {
    const navigate = useNavigate();
    const reset = useAuthStore((state) => state.reset);

    const mutation = useMutation({
        mutationFn: logoutService,
        onSettled: () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            reset();
            navigate(ROUTES.LOGIN);
        }
    });

    return mutation.mutate;
};


/**
 * Auth state selectors
*/
export function useAuthUser() {
    return useAuthStore((state) => state.user);
};


export function useIsAuthenticated() {
    return useAuthStore((state) => state.isAuthenticated);
};


export function useAuthLoadingStates() {
    return useAuthStore((state) => state.loadingStates);
};


/**
 * Update User Info mutation hook
*/
export function useUpdateUserInfo() {
    const setStoreData = useAuthStore((state) => state.setStoreData);

    return useMutation({
        mutationFn: (data: UpdateUserInfoRequest) => updateUserInfoService(data),
        onSuccess: (response) => {
            const { first_name, last_name } = response.data;

            setStoreData((state) => {
                if (!state.user) return state;
                return {
                    user: {
                        ...state.user,
                        firstName: first_name,
                        lastName: last_name,
                    }
                };
            });
            
            const storedUser = localStorage.getItem("userInfo");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                localStorage.setItem("userInfo", JSON.stringify({
                    ...parsed,
                    first_name,
                    last_name
                }));
            }
        },
    });
};


/**
 * Update Password mutation hook
*/
export function useUpdatePassword() {
    const setStoreData = useAuthStore((state) => state.setStoreData);

    return useMutation({
        mutationFn: (data: UpdatePasswordRequest) => updatePasswordService(data),
        onMutate: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, updatePassword: API_STATUS.Loading },
            }));
        },
        onSuccess: () => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, updatePassword: API_STATUS.Success },
            }));
        },
        onError: (error) => {
            setStoreData((state) => ({
                loadingStates: { ...state.loadingStates, updatePassword: API_STATUS.Error },
            }));
            console.error("Password update failed:", error);
        },
    });
};
