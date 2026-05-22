export type LoginResult = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export async function loginWithDummyJwt(username: string, password: string) {
  const response = await fetch("https://dummyjson.com/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Use the API sample credentials from the brief.");
  }

  return (await response.json()) as LoginResult;
}
