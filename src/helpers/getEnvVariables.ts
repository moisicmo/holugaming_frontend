
export const getEnvVariables = () => {
    return {
        VITE_HOST_BACKEND: import.meta.env.VITE_HOST_BACKEND,
    }
}