export async function getAuthenticatedAppForUser() {
    const idToken = headers().get("Authorization")?.split("Bearer ")[1];
    console.log('firebaseConfig', JSON.stringify(firebaseConfig));
    const firebaseServerApp = initializeServerApp(
        firebaseConfig,
        idToken
            ? {
                authIdToken: idToken,
            }
            : {}
    );

    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();

    return { firebaseServerApp, currentUser: auth.currentUser };
}