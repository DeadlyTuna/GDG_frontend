const BASE_URL = 'https://api.github.com';

const getHeaders = (token) => {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (token) {
        headers['Authorization'] = `token ${token}`;
    }
    return headers;
};

export const fetchOrg = async (orgName, token = null) => {
    const response = await fetch(`${BASE_URL}/orgs/${orgName}`, {
        headers: getHeaders(token),
    });

    if (!response.ok) {
        if (response.status === 404) throw new Error('Organization not found');
        if (response.status === 403) throw new Error('API Rate limit exceeded or Forbidden');
        throw new Error('An error occurred while fetching organization');
    }

    return response.json();
};

export const fetchRepos = async (orgName, page = 1, perPage = 10, token = null) => {
    const response = await fetch(`${BASE_URL}/orgs/${orgName}/repos?per_page=${perPage}&page=${page}&sort=updated`, {
        headers: getHeaders(token),
    });

    if (!response.ok) {
        if (response.status === 404) throw new Error('Repositories not found');
        throw new Error('An error occurred while fetching repositories');
    }

    return response.json();
};
