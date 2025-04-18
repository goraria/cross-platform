import { useState, useEffect } from 'react';
import { db, auth } from '@/state/firebase';
import { useRouter } from 'next/router';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { errorUtil } from "zod/lib/helpers/errorUtil";
import ErrMessage = errorUtil.ErrMessage;

export default function Tasks() {
    const [tasks, setTasks] = useState<any>([]);
    const [task, setTask] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!auth.currentUser) {
            router.push('/signin');
            return;
        }

        const q = query(
            collection(db, 'tasks'),
            where('userId', '==', auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newTasks = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });
            setTasks(newTasks);
        });

        return () => unsubscribe();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (task.trim()) {
            try {
                await addDoc(collection(db, 'tasks'), {
                    userId: auth.currentUser.uid,
                    task,
                    completed: false,
                });
                setTask('');
            } catch (err: ErrMessage) {
                setError(err.message);
            }
        }
    };

    const handleDeleteTask = async (id: any) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
        } catch (err: ErrMessage) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Your Tasks</h2>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button type="submit">Add Task</button>
            </form>
            {error && <p>{error}</p>}
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>
                        {task.task}
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
