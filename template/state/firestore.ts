function applyQueryFilters(q, { category, city, price, sort }) {
    if (category) {
        q = query(q, where("category", "==", category));
    }
    if (city) {
        q = query(q, where("city", "==", city));
    }
    if (price) {
        q = query(q, where("price", "==", price.length));
    }
    if (sort === "Rating" || !sort) {
        q = query(q, orderBy("avgRating", "desc"));
    } else if (sort === "Review") {
        q = query(q, orderBy("numRatings", "desc"));
    }
    return q;
}

export async function getRestaurants(db = db, filters = {}) {
    let q = query(collection(db, "restaurants"));

    q = applyQueryFilters(q, filters);
    const results = await getDocs(q);
    return results.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data(),
            // Only plain objects can be passed to Client Components from Server Components
            timestamp: doc.data().timestamp.toDate(),
        };
    });
}

export function getRestaurantsSnapshot(cb, filters = {}) {
    if (typeof cb !== "function") {
        console.log("Error: The callback parameter is not a function");
        return;
    }

    let q = query(collection(db, "restaurants"));
    q = applyQueryFilters(q, filters);

    const unsubscribe = onSnapshot(q, querySnapshot => {
        const results = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
                // Only plain objects can be passed to Client Components from Server Components
                timestamp: doc.data().timestamp.toDate(),
            };
        });

        cb(results);
    });

    return unsubscribe;
}