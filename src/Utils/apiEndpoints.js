export const generateUserApiEndpoint = (id) => `/api/v1/users/${id}`;
export const generateKidsApiEndpoint = (id) => `/api/v1/users/${id}/kids`;
export const generateDeleteUserApiEndpoint = (id) => `/api/v1/users/delete/${id}`;

// Admin
export const generateAdminUsersApiEndpoint = (id) => '/api/v1/admin/users';
export const generateAdminAvatarsApiEndpoint = (id) => '/api/v1/admin/avatars';
export const generateAdminDiplomasApiEndpoint = (id) => '/api/v1/admin/diplomas';
