import { collection, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';
import app from './app';

const db = getFirestore(app);
const booksRef = collection(db, 'myLibrary');

async function SetUpData() {
	await setDoc(doc(booksRef, 'B1'), {
		id: 'B1',
		author: 'J.K Rowling',
		pages: 1200,
		read: true,
		title: 'Harry Porter Vol 1',
	});
	await setDoc(doc(booksRef, 'B2'), {
		id: 'B2',
		author: 'J. R. R. Tolkien',
		pages: 1300,
		read: false,
		title: 'Lord Of The Rings',
	});
	await setDoc(doc(booksRef, 'B3'), {
		id: 'B3',
		author: 'Khaled Hosseini',
		pages: 510,
		read: false,
		title: 'The Kite Runner',
	});
	await setDoc(doc(booksRef, 'B4'), {
		id: 'B4',
		author: 'Kurt Vonnegut',
		pages: 700,
		read: true,
		title: 'To Kill a Mockingbird',
	});
	await setDoc(doc(booksRef, 'B5'), {
		id: 'B5',
		author: 'J. R. R. Tolkien',
		pages: 750,
		read: false,
		title: 'Slaughterhouse-Five',
	});
}

export default SetUpData;
