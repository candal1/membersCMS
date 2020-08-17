export const parsingHelpers = {
   accountNormalizer,
};

function accountNormalizer(data) {
   return {
      id: data["user"]["id"],
      first_name: data["user"]["first_name"],
      last_name: data["user"]["last_name"],
      email: data["user"]["email"],
      token: data["token"]
   }
}