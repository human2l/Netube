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
  console.log(response);
  return response?.data?.users?.length === 0;
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
