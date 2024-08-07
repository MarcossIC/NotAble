import { useSession } from 'next-auth/react';

const useDeleteNote = () => {
	const { data } = useSession();

	const handleDeleteNote = (id: string) => {
		const user = data?.user;
		fetch('/api/notes', { method: 'POST', body: JSON.stringify({ userID: user?.id || '', ID: id }) }).then((res) => res);
	};
	return { handleDeleteNote } as const;
};

export default useDeleteNote;
