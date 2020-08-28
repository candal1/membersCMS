export const parsingHelpers = {
    accountNormalizer,
};

function accountNormalizer(data) {
    if (data["user"]) {
        return {
            id: data["user"]["id"],
            first_name: data["user"]["first_name"],
            last_name: data["user"]["last_name"],
            email: data["user"]["email"],
            role: data["user"]["role"],
            // member role or admin gets full access
            subscription: (data["user"]["role"] === "4" || data["user"]["role"] === "1")
        }
    }
    return undefined;
}