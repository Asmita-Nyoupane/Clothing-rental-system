

export const getAccessToken = () => {
    return sessionStorage.getItem('accesstoken');
}

export const getRefreshToken = () => {
    return sessionStorage.getItem('refreshtoken');
}

export const setAccessToken = (accesstoken) => {
    sessionStorage.setItem('accesstoken', `Bearer ${accesstoken}`);
}

export const setRefreshToken = (refreshtoken) => {
    sessionStorage.setItem('refreshtoken', `Bearer ${refreshtoken}`);
}
export const getType = (value, body) => {
    if (value.params) {
        return { params: body }
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id }
        } else {
            return { query: body }
        }
    }
    return {};
}
