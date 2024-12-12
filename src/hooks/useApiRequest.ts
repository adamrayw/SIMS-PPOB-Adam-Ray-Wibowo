/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";

export const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

export const usePostQuery = <BodyData, ResponseData>(
    query: string,
    headers?: HeadersInit,
): {
    post: (data: BodyData) => Promise<void>;
    loading: boolean;
    responseData: ResponseData | null;
} => {
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()

    const post = useCallback(
        async (data: BodyData) => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}${query}`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers,
                });
                const json = await response.json();

                if (query === '/registration' && json.status === 0) {
                    navigate('/login')
                } else if (query === '/login' && json.status === 0) {
                    localStorage.setItem('token', json.data.token)
                    navigate('/')
                }

                if(json.status === 108) {
                    localStorage.removeItem("token")
                    navigate('/login')
                }

                setResponseData(json);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        },
        [headers, query]
    );

    return { responseData, loading, post };
};

export const usePutQuery = <BodyData extends BodyInit | null | undefined, ResponseUpdateData>(
    query: string,
    headers?: HeadersInit,
): {
    update: (data: BodyData) => Promise<void>;
    loading: boolean;
    responseUpdateData: ResponseUpdateData | null;
} => {
    const [responseUpdateData, setResponseUpdateData] = useState<ResponseUpdateData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()

    const update = useCallback(
        async (data: BodyData) => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}${query}`, {
                    method: "PUT",
                    body: data,
                    headers,
                });
                const json = await response.json();

                if(json.status === 108) {
                    localStorage.removeItem("token");
                    navigate('/login')
                }

                setResponseUpdateData(json);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        },
        [headers, query]
    );

    return { responseUpdateData, loading, update };
};

export const useGetQuery = <T,>(
    query: string,
    headers?: HeadersInit
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // set loading to true to indicate that the data is being fetched

                const response = await fetch(`${BASE_URL}${query}`, {
                    headers
                });
                const json = await response.json();

                if(json.status === 108) {
                    localStorage.removeItem("token")
                    navigate('/login')
                }

                setData(json);

                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);

    return { data, loading }
}