export interface UserResponse {
    data: {
        accessToken: string,
        userId: number,
        email: string,
        username: string,
    };
    status: number;
    error: string;
    message?: string;
} 