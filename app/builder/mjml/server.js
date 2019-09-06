export default async (email, { $http, ngjs }) => {
  try {
    const { mjmlCompileAdress, xApiKey = '' } = ngjs.config;
    const { data } = await $http({
      url: mjmlCompileAdress,
      method: 'POST',
      data: { mjml: JSON.stringify(email) },
      responseType: 'json',
      headers: {
        'x-api-key': xApiKey
      }
    });
    return data;
  } catch (error) {}
};
