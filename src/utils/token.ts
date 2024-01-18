let getAccessTokenSilently: any = null;

export const token = {
    getAccessTokenSilently: () => getAccessTokenSilently,
    setAccessTokenSilently: (func: any) => (getAccessTokenSilently = func)
};