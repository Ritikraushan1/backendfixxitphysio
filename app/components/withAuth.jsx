// components/withAuth.js
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (!user) {
                    router.replace('/login');
                } else {
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        }, [router]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
