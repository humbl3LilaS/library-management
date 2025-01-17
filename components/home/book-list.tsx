import { IBook } from "@/types/index.types";

type BookListProps = {
    title: string;
    books: IBook[];
};

const BookList = ({ title, books }: BookListProps) => {
    return <div>book list</div>;
};

export default BookList;
