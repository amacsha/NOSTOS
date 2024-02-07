export interface UserResponse {
    data: {
        accessToken: string,
        userId: number,
        email: string,
        username: string,
        filter_preference: string,
        placeId: string,
        title: string,
        content: string,
    };
    status: number;
    error: string;
    message?: string;
} 