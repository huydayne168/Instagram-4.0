export interface FacebookPictureData {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
}

export interface FacebookUserResponse {
    id: string;
    name: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    picture?: {
        data: FacebookPictureData;
    };
}
