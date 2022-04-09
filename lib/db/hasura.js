export const isNewUser = async (token, issuer) => {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
        users(where: {issuer: {_eq: $issuer}}) {
        id
        email
        issuer
        publicAddress
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response?.data?.users?.length === 0;
};

export const findOneVideoStats = async (userId, videoId, token) => {
  const operationsDoc = `
  query findOneVideoStats ($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "findOneVideoStats",
    { userId, videoId },
    token
  );
  return response?.data?.stats;
};

export const createVideoStats = async (
  { userId, videoId, watched, favourited },
  token
) => {
  const operationsDoc = `
  mutation createVideoStats($userId: String!, $videoId: String!, $watched: Boolean!, $favourited: Int!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId, watched: $watched}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createVideoStats",
    { userId, videoId, watched, favourited },
    token
  );
  return response;
};

export const updateVideoStats = async (
  { userId, videoId, watched, favourited },
  token
) => {
  const operationsDoc = `
  mutation updateVideoStats($watched: Boolean!, $userId: String!, $videoId: String!, $favourited: Int!) {
    update_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, _set: {watched: $watched, favourited: $favourited}) {
      affected_rows
      returning {
        favourited
        id
        userId
        videoId
        watched
      }
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "updateVideoStats",
    { userId, videoId, watched, favourited },
    token
  );
  return response;
};

export const createNewUser = async (token, metadata) => {
  const { issuer, email, publicAddress } = metadata;
  const operationsDoc = `
      mutation createNewUser($issuer: String!, $email: String!, $publicAddress:String!) {
        insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
            affected_rows
            returning {
              email
              id
              issuer
              publicAddress
            }
          }
      }
    `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token
  );
  return response;
};

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
